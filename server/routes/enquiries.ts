import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { generateEnquiryNumber } from '../utils/reference';
import { sendNewEnquiryNotification } from '../utils/email';

const router = Router();

const enquirySubmissionSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(150, 'Email cannot exceed 150 characters'),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone number is too long')
    .optional()
    .nullable()
    .transform((val) => (val && val.trim().length > 0 ? val.trim() : null)),
  companyName: z
    .string()
    .trim()
    .max(100, 'Company name cannot exceed 100 characters')
    .optional()
    .nullable()
    .transform((val) => (val && val.trim().length > 0 ? val.trim() : null)),
  service: z
    .string({ required_error: 'Service requirement is required' })
    .trim()
    .min(2, 'Please select or enter a service')
    .max(100, 'Service name is too long'),
  budgetRange: z
    .string()
    .trim()
    .max(100, 'Budget range is too long')
    .optional()
    .nullable()
    .transform((val) => (val && val.trim().length > 0 ? val.trim() : null)),
  message: z
    .string({ required_error: 'Project brief / message is required' })
    .trim()
    .min(10, 'Please provide at least 10 characters describing your project')
    .max(3000, 'Brief cannot exceed 3000 characters'),
  source: z
    .string()
    .trim()
    .max(50)
    .optional()
    .default('website_contact_form'),
});

// POST /api/enquiries - Public enquiry submission
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = enquirySubmissionSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      res.status(400).json({
        ok: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors: fieldErrors,
      });
      return;
    }

    const data = parseResult.data;

    // Generate unique human-readable reference number with collision protection
    let enquiryNumber = generateEnquiryNumber();
    let collisionCheck = await prisma.enquiry.findUnique({ where: { enquiryNumber } });
    let attempts = 0;
    while (collisionCheck && attempts < 5) {
      enquiryNumber = generateEnquiryNumber();
      collisionCheck = await prisma.enquiry.findUnique({ where: { enquiryNumber } });
      attempts++;
    }

    // Determine initial priority
    let priority = 'NORMAL';
    const lowerMessage = data.message.toLowerCase();
    if (
      lowerMessage.includes('urgent') ||
      lowerMessage.includes('asap') ||
      lowerMessage.includes('immediate') ||
      (data.budgetRange && data.budgetRange.includes('Enterprise'))
    ) {
      priority = 'HIGH';
    }

    // Create record in database
    const enquiry = await prisma.enquiry.create({
      data: {
        enquiryNumber,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        service: data.service,
        budgetRange: data.budgetRange,
        message: data.message,
        source: data.source,
        status: 'NEW',
        priority,
        activities: {
          create: {
            action: 'CREATED',
            description: `Enquiry received from ${data.source} with initial priority ${priority}`,
          },
        },
      },
    });

    // Asynchronously dispatch email notification without blocking client response
    sendNewEnquiryNotification({
      enquiryNumber: enquiry.enquiryNumber,
      fullName: enquiry.fullName,
      email: enquiry.email,
      phone: enquiry.phone,
      companyName: enquiry.companyName,
      service: enquiry.service,
      budgetRange: enquiry.budgetRange,
      message: enquiry.message,
    }).catch((err) => {
      console.error('[Notification dispatch error]', err);
    });

    res.status(201).json({
      ok: true,
      message: 'Your project enquiry has been securely received.',
      data: {
        enquiryNumber: enquiry.enquiryNumber,
        fullName: enquiry.fullName,
        email: enquiry.email,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      ok: false,
      message: 'An unexpected internal error occurred while processing your enquiry. Please try again.',
    });
  }
});

export default router;
