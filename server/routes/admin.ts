import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAdminAuth } from '../middleware/auth';

const router = Router();

// Zod schemas
const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const updateEnquirySchema = z.object({
  status: z
    .enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED'])
    .optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  internalNotes: z.string().max(5000).optional().nullable(),
  assignedTo: z.string().max(100).optional().nullable(),
});

const addNoteSchema = z.object({
  note: z.string().trim().min(1, 'Note content cannot be empty').max(3000),
});

// -------------------------------------------------------------
// Admin Authentication Routes
// -------------------------------------------------------------

// POST /api/admin/auth/login
router.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({
        ok: false,
        message: 'Invalid email or password format.',
        errors: parse.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = parse.data;

    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      // Delay response slightly to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 300));
      res.status(401).json({
        ok: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      res.status(401).json({
        ok: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_for_eclipto_2026';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: expiresIn as any }
    );

    // Set secure HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      ok: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      ok: false,
      message: 'An internal authentication error occurred.',
    });
  }
});

// POST /api/admin/auth/logout
router.post('/auth/logout', (_req: Request, res: Response): void => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ ok: true, message: 'Logged out successfully.' });
});

// GET /api/admin/auth/me
router.get('/auth/me', requireAdminAuth, (req: Request, res: Response): void => {
  res.json({
    ok: true,
    user: req.adminUser,
  });
});

// -------------------------------------------------------------
// Admin Dashboard & Analytics Routes (Protected)
// -------------------------------------------------------------

// GET /api/admin/dashboard/stats
router.get('/dashboard/stats', requireAdminAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const totalEnquiries = await prisma.enquiry.count();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const newToday = await prisma.enquiry.count({
      where: {
        createdAt: { gte: startOfToday },
      },
    });

    // Group counts by status
    const allEnquiries = await prisma.enquiry.findMany({
      select: {
        status: true,
        service: true,
        priority: true,
        createdAt: true,
      },
    });

    const statusCounts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL_SENT: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    const serviceCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = {
      LOW: 0,
      NORMAL: 0,
      HIGH: 0,
      URGENT: 0,
    };

    for (const enq of allEnquiries) {
      if (statusCounts[enq.status] !== undefined) {
        statusCounts[enq.status]++;
      } else {
        statusCounts[enq.status] = 1;
      }

      serviceCounts[enq.service] = (serviceCounts[enq.service] || 0) + 1;

      if (priorityCounts[enq.priority] !== undefined) {
        priorityCounts[enq.priority]++;
      } else {
        priorityCounts[enq.priority] = 1;
      }
    }

    const converted = statusCounts.CONVERTED || 0;
    const closed = statusCounts.CLOSED || 0;
    const resolvedTotal = converted + closed;
    const conversionRate = resolvedTotal > 0 ? Math.round((converted / resolvedTotal) * 100) : 0;

    // Recent 5 enquiries
    const recentEnquiries = await prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        enquiryNumber: true,
        fullName: true,
        companyName: true,
        email: true,
        service: true,
        budgetRange: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    });

    res.json({
      ok: true,
      data: {
        totalEnquiries,
        newToday,
        statusCounts,
        serviceCounts,
        priorityCounts,
        conversionRate,
        recentEnquiries,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ ok: false, message: 'Failed to retrieve dashboard statistics.' });
  }
});

// -------------------------------------------------------------
// Admin Enquiry Management Routes (Protected)
// -------------------------------------------------------------

// GET /api/admin/enquiries - Search, filter, paginate
router.get('/enquiries', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      status,
      service,
      priority,
      page = '1',
      limit = '15',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 15));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status as string;
    }

    if (service && service !== 'ALL') {
      where.service = service as string;
    }

    if (priority && priority !== 'ALL') {
      where.priority = priority as string;
    }

    if (search && (search as string).trim().length > 0) {
      const q = (search as string).trim();
      where.OR = [
        { enquiryNumber: { contains: q } },
        { fullName: { contains: q } },
        { email: { contains: q } },
        { companyName: { contains: q } },
        { message: { contains: q } },
      ];
    }

    const allowedSortFields = ['createdAt', 'updatedAt', 'priority', 'status', 'fullName'];
    const finalSortBy = allowedSortFields.includes(sortBy as string) ? (sortBy as string) : 'createdAt';
    const finalSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [finalSortBy]: finalSortOrder },
        include: {
          activities: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      prisma.enquiry.count({ where }),
    ]);

    res.json({
      ok: true,
      data: enquiries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    console.error('Error querying enquiries:', error);
    res.status(500).json({ ok: false, message: 'Failed to retrieve enquiries.' });
  }
});

// GET /api/admin/enquiries/export/csv - CSV Export
router.get('/enquiries/export/csv', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, service } = req.query;
    const where: any = {};
    if (status && status !== 'ALL') where.status = status as string;
    if (service && service !== 'ALL') where.service = service as string;

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Reference ID',
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Budget Range',
      'Status',
      'Priority',
      'Date Submitted',
      'Internal Notes',
      'Message',
    ];

    const escapeCsv = (str: string | null | undefined) => {
      if (!str) return '""';
      const clean = str.replace(/"/g, '""').replace(/\r?\n/g, ' ');
      return `"${clean}"`;
    };

    const rows = enquiries.map((enq) => [
      escapeCsv(enq.enquiryNumber),
      escapeCsv(enq.fullName),
      escapeCsv(enq.email),
      escapeCsv(enq.phone),
      escapeCsv(enq.companyName),
      escapeCsv(enq.service),
      escapeCsv(enq.budgetRange),
      escapeCsv(enq.status),
      escapeCsv(enq.priority),
      escapeCsv(enq.createdAt.toISOString()),
      escapeCsv(enq.internalNotes),
      escapeCsv(enq.message),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="eclipto-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.send(csvContent);
  } catch (error) {
    console.error('Error generating CSV export:', error);
    res.status(500).json({ ok: false, message: 'Failed to generate export file.' });
  }
});

// GET /api/admin/enquiries/:id - Single enquiry detail with timeline
router.get('/enquiries/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: req.params.id },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            adminUser: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    if (!enquiry) {
      res.status(404).json({ ok: false, message: 'Enquiry not found.' });
      return;
    }

    res.json({ ok: true, data: enquiry });
  } catch (error) {
    console.error('Error fetching enquiry details:', error);
    res.status(500).json({ ok: false, message: 'Failed to retrieve enquiry.' });
  }
});

// PATCH /api/admin/enquiries/:id - Update status, priority, or notes
router.patch('/enquiries/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = updateEnquirySchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({
        ok: false,
        message: 'Invalid update payload.',
        errors: parse.error.flatten().fieldErrors,
      });
      return;
    }

    const { status, priority, internalNotes, assignedTo } = parse.data;

    const existing = await prisma.enquiry.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      res.status(404).json({ ok: false, message: 'Enquiry record not found.' });
      return;
    }

    // Build activities to record audit trail
    const activityCreates: any[] = [];
    const adminId = req.adminUser?.id;
    const adminName = req.adminUser?.name || 'Administrator';

    if (status && status !== existing.status) {
      activityCreates.push({
        adminUserId: adminId,
        action: 'STATUS_CHANGE',
        description: `Status changed from ${existing.status} to ${status} by ${adminName}`,
      });
    }

    if (priority && priority !== existing.priority) {
      activityCreates.push({
        adminUserId: adminId,
        action: 'PRIORITY_CHANGE',
        description: `Priority updated from ${existing.priority} to ${priority} by ${adminName}`,
      });
    }

    if (assignedTo !== undefined && assignedTo !== existing.assignedTo) {
      activityCreates.push({
        adminUserId: adminId,
        action: 'ASSIGNED',
        description: `Assigned to ${assignedTo || 'Unassigned'} by ${adminName}`,
      });
    }

    const updated = await prisma.enquiry.update({
      where: { id: req.params.id },
      data: {
        ...(status ? { status } : {}),
        ...(priority ? { priority } : {}),
        ...(internalNotes !== undefined ? { internalNotes } : {}),
        ...(assignedTo !== undefined ? { assignedTo } : {}),
        activities: {
          create: activityCreates,
        },
      },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            adminUser: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    res.json({
      ok: true,
      message: 'Enquiry updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ ok: false, message: 'Failed to update enquiry.' });
  }
});

// POST /api/admin/enquiries/:id/notes - Add note
router.post('/enquiries/:id/notes', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = addNoteSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({
        ok: false,
        message: 'Note cannot be blank.',
      });
      return;
    }

    const { note } = parse.data;
    const existing = await prisma.enquiry.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      res.status(404).json({ ok: false, message: 'Enquiry not found.' });
      return;
    }

    const adminName = req.adminUser?.name || 'Admin';
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedNote = `[${timestamp} - ${adminName}]:\n${note}`;
    const newInternalNotes = existing.internalNotes
      ? `${existing.internalNotes}\n\n---\n${formattedNote}`
      : formattedNote;

    const updated = await prisma.enquiry.update({
      where: { id: req.params.id },
      data: {
        internalNotes: newInternalNotes,
        activities: {
          create: {
            adminUserId: req.adminUser?.id,
            action: 'NOTE_ADDED',
            description: `Note added by ${adminName}: "${note.length > 80 ? note.slice(0, 80) + '...' : note}"`,
          },
        },
      },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            adminUser: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    res.json({
      ok: true,
      message: 'Internal note saved.',
      data: updated,
    });
  } catch (error) {
    console.error('Error adding internal note:', error);
    res.status(500).json({ ok: false, message: 'Failed to add note.' });
  }
});

export default router;
