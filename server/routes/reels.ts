import { Router, Request, Response } from 'express';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { prisma } from '../db';
import { requireAdminAuth } from '../middleware/auth';

export const reelsPublicRouter = Router();
export const reelsAdminRouter = Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const isVideo = file.mimetype.startsWith('video/');
    const uploadDir = path.resolve(
      process.cwd(),
      'public/uploads',
      isVideo ? 'videos' : 'thumbnails'
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `reel-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'image/jpeg',
      'image/png',
      'image/webp',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload MP4, WebM, MOV, JPG, PNG, or WebP.'));
    }
  },
});

// Validation Schemas
const reelCreateSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(150),
  caption: z.string().max(2000).optional().nullable(),
  mediaType: z.enum(['VIDEO', 'IMAGE']).default('VIDEO'),
  videoUrl: z.string().trim().url('Must be a valid URL'),
  thumbnailUrl: z.string().trim().url('Must be a valid URL').optional().or(z.literal('')),
  instagramUrl: z.string().trim().url('Must be a valid URL').optional().or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
  views: z.string().max(20).optional().nullable(),
  likes: z.string().max(20).optional().nullable(),
  audioTrack: z.string().max(100).optional().nullable(),
});

const reelUpdateSchema = reelCreateSchema.partial();

// Fallback reels in case database is empty or temporarily unreachable
const FALLBACK_REELS = [
  {
    id: 'eclipto-reel-1',
    title: 'Kinetic 3D Web & Hypercar Configurator',
    caption: 'Pushing browser boundaries with 60FPS WebGL and cinematic shaders. Built for luxury automotive performance. #WebGL #Threejs #WebDevelopment #Eclipto',
    mediaType: 'VIDEO',
    videoUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
    instagramUrl: 'https://www.instagram.com/eclipto_.in/',
    displayOrder: 1,
    isPublished: true,
    views: '24.8K',
    likes: '1.9K',
    audioTrack: 'Eclipto Sound Lab • Kinetic Pulse',
  },
  {
    title: 'Autonomous Multi-Agent AI Pipelines',
    caption: 'How we orchestrate autonomous AI agents to automate 80% of enterprise customer workflows and lead qualification. #ArtificialIntelligence #Automation #SaaS',
    mediaType: 'VIDEO',
    videoUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85',
    instagramUrl: 'https://www.instagram.com/eclipto_.in/',
    displayOrder: 2,
    isPublished: true,
    views: '19.4K',
    likes: '1.4K',
    audioTrack: 'Synthwave Odyssey • Future Beats',
  },
  {
    title: 'Spatial Web & Liquid Glass UI Systems',
    caption: 'Designing for the spatial web: tactile glass components, fluid micro-interactions, and high contrast typography. #UIUX #DesignSystem #WebDesign',
    mediaType: 'VIDEO',
    videoUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633493106115-06b245089fa0?auto=format&fit=crop&w=800&q=85',
    instagramUrl: 'https://www.instagram.com/eclipto_.in/',
    displayOrder: 3,
    isPublished: true,
    views: '32.1K',
    likes: '2.6K',
    audioTrack: 'Atmospheric Flow • Electronic',
  },
  {
    title: 'Full-Stack Distributed Systems Engineering',
    caption: 'Zero-latency edge computing with distributed PostgreSQL and streaming WebSockets architecture for high-concurrency platforms. #Engineering #Cloud #WebDev',
    mediaType: 'VIDEO',
    videoUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=85',
    instagramUrl: 'https://www.instagram.com/eclipto_.in/',
    displayOrder: 4,
    isPublished: true,
    views: '15.7K',
    likes: '1.1K',
    audioTrack: 'Eclipto Deep Focus • Code Frequency',
  },
];

/* -------------------------------------------------------------------------- */
/* Public Routes: GET /api/reels                                              */
/* -------------------------------------------------------------------------- */

reelsPublicRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const reels = await prisma.reel.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    if (reels.length === 0) {
      res.json({
        ok: true,
        source: 'fallback',
        reels: FALLBACK_REELS,
      });
      return;
    }

    res.json({
      ok: true,
      source: 'database',
      reels: reels.map((r) => ({
        id: r.id,
        title: r.title,
        caption: r.caption || '',
        mediaType: r.mediaType as 'VIDEO' | 'IMAGE',
        mediaUrl: r.videoUrl,
        thumbnailUrl: r.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
        permalink: r.instagramUrl || 'https://www.instagram.com/eclipto_.in/',
        timestamp: r.createdAt.toISOString(),
        views: r.views || '20K',
        likes: r.likes || '1.5K',
        audioTrack: r.audioTrack || 'Eclipto Sound Lab',
      })),
    });
  } catch (error) {
    console.error('Error fetching public reels:', error);
    res.json({
      ok: true,
      source: 'fallback_error',
      reels: FALLBACK_REELS,
    });
  }
});

/* -------------------------------------------------------------------------- */
/* Admin Routes: /api/admin/reels (Protected by requireAdminAuth)             */
/* -------------------------------------------------------------------------- */

// GET /api/admin/reels - List all reels including unpublished
reelsAdminRouter.get('/', requireAdminAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const reels = await prisma.reel.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    res.json({
      ok: true,
      data: reels,
    });
  } catch (error) {
    console.error('Error in admin GET /reels:', error);
    res.status(500).json({ ok: false, message: 'Failed to retrieve reels.' });
  }
});

// POST /api/admin/reels - Create new reel
reelsAdminRouter.post('/', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = reelCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: 'Invalid reel input.',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;

    const newReel = await prisma.reel.create({
      data: {
        title: data.title,
        caption: data.caption || null,
        mediaType: data.mediaType,
        videoUrl: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl || null,
        instagramUrl: data.instagramUrl || null,
        displayOrder: data.displayOrder,
        isPublished: data.isPublished,
        views: data.views || '12.4K',
        likes: data.likes || '1.1K',
        audioTrack: data.audioTrack || 'Eclipto Sound Lab',
      },
    });

    res.status(201).json({
      ok: true,
      message: 'Reel added successfully.',
      data: newReel,
    });
  } catch (error) {
    console.error('Error creating reel:', error);
    res.status(500).json({ ok: false, message: 'Failed to create reel.' });
  }
});

// PUT /api/admin/reels/:id - Update existing reel
reelsAdminRouter.put('/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = reelUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: 'Invalid reel update data.',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;

    const existing = await prisma.reel.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ ok: false, message: 'Reel not found.' });
      return;
    }

    const updated = await prisma.reel.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.caption !== undefined && { caption: data.caption }),
        ...(data.mediaType !== undefined && { mediaType: data.mediaType }),
        ...(data.videoUrl !== undefined && { videoUrl: data.videoUrl }),
        ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl || null }),
        ...(data.instagramUrl !== undefined && { instagramUrl: data.instagramUrl || null }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(data.views !== undefined && { views: data.views }),
        ...(data.likes !== undefined && { likes: data.likes }),
        ...(data.audioTrack !== undefined && { audioTrack: data.audioTrack }),
      },
    });

    res.json({
      ok: true,
      message: 'Reel updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating reel:', error);
    res.status(500).json({ ok: false, message: 'Failed to update reel.' });
  }
});

// PATCH /api/admin/reels/:id/toggle-publish - Fast toggle publish/unpublish
reelsAdminRouter.patch('/:id/toggle-publish', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.reel.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ ok: false, message: 'Reel not found.' });
      return;
    }

    const updated = await prisma.reel.update({
      where: { id },
      data: {
        isPublished: !existing.isPublished,
      },
    });

    res.json({
      ok: true,
      message: `Reel ${updated.isPublished ? 'published' : 'unpublished'} successfully.`,
      data: updated,
    });
  } catch (error) {
    console.error('Error toggling reel status:', error);
    res.status(500).json({ ok: false, message: 'Failed to change reel status.' });
  }
});

// DELETE /api/admin/reels/:id - Delete reel
reelsAdminRouter.delete('/:id', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.reel.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ ok: false, message: 'Reel not found.' });
      return;
    }

    await prisma.reel.delete({ where: { id } });

    res.json({
      ok: true,
      message: 'Reel deleted permanently.',
    });
  } catch (error) {
    console.error('Error deleting reel:', error);
    res.status(500).json({ ok: false, message: 'Failed to delete reel.' });
  }
});

// POST /api/admin/reels/upload - Upload video file or cover image
reelsAdminRouter.post(
  '/upload',
  requireAdminAuth,
  upload.single('file'),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ ok: false, message: 'No file was uploaded.' });
      return;
    }
    const isVideo = req.file.mimetype.startsWith('video/');
    const relativeUrl = `/uploads/${isVideo ? 'videos' : 'thumbnails'}/${req.file.filename}`;
    res.json({
      ok: true,
      message: `${isVideo ? 'Video' : 'Image'} uploaded successfully.`,
      url: relativeUrl,
      filename: req.file.filename,
      sizeBytes: req.file.size,
      mimetype: req.file.mimetype,
    });
  }
);

