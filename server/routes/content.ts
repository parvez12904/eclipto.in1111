import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { requireAdminAuth } from '../middleware/auth';

export const contentPublicRouter = Router();
export const contentAdminRouter = Router();

// Default sensible website content fallback
export const DEFAULT_CONTENT: Record<string, Record<string, string>> = {
  hero: {
    main_heading: 'WE BUILD',
    highlighted_heading: "WHAT'S NEXT.",
    description:
      'We create powerful websites, intelligent software, and AI-powered experiences that help businesses move forward.',
    primary_cta_text: "LET'S BUILD SOMETHING",
    secondary_cta_text: 'EXPLORE OUR WORK',
  },
  pricing: {
    packages_list: JSON.stringify([
      {
        id: 'starter',
        name: 'Starter',
        tierNumber: 'TIER 01',
        tierSubtitle: 'ESSENTIAL FOUNDATION',
        startingPrice: '₹5,999',
        priceNote: 'Starting price for baseline websites',
        valueProposition:
          'Perfect for individuals and small businesses looking for a professional online presence.',
        isPopular: false,
        features: [
          'Modern responsive website',
          'Up to 5 core sections/pages',
          'Mobile-friendly design',
          'Contact/WhatsApp integration',
          'Basic SEO setup',
          'Modern UI design',
        ],
        ctaText: 'CHOOSE STARTER',
      },
      {
        id: 'professional',
        name: 'Professional',
        tierNumber: 'TIER 02',
        tierSubtitle: 'GROWTH ACCELERATOR',
        badge: 'MOST POPULAR',
        startingPrice: '₹12,999',
        priceNote: 'Starting price for growing businesses',
        valueProposition:
          'Designed for growing businesses that need a stronger and more customized digital presence.',
        isPopular: true,
        features: [
          'Everything in the Starter package',
          'More customized pages and sections',
          'Premium UI/UX design',
          'Advanced contact and enquiry forms',
          'Portfolio or service showcase',
          'Social media integration',
          'Basic performance optimization',
        ],
        ctaText: 'CHOOSE PROFESSIONAL',
      },
      {
        id: 'premium',
        name: 'Premium',
        tierNumber: 'TIER 03',
        tierSubtitle: 'BESPOKE HIGH-END SUITE',
        badge: 'HIGH-END SOLUTION',
        startingPrice: '₹21,999+',
        priceNote: 'Starting price for advanced custom builds',
        valueProposition:
          'Built for businesses that require a high-end, feature-rich, and customized website.',
        isPopular: false,
        features: [
          'Everything in the Professional package',
          'Fully customized design and development',
          'Advanced animations and interactions',
          'Custom integrations',
          'Dynamic sections or backend features where required',
          'Advanced portfolio/product showcase',
          'Performance and responsive optimization',
        ],
        ctaText: 'CHOOSE PREMIUM',
      },
    ]),
  },
};

/* -------------------------------------------------------------------------- */
/* Public Routes: GET /api/content                                            */
/* -------------------------------------------------------------------------- */

contentPublicRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const allRecords = await prisma.websiteContent.findMany();

    const grouped: Record<string, Record<string, string>> = { ...DEFAULT_CONTENT };

    for (const record of allRecords) {
      if (!grouped[record.sectionName]) {
        grouped[record.sectionName] = {};
      }
      grouped[record.sectionName][record.contentKey] = record.contentValue;
    }

    res.json({
      ok: true,
      data: grouped,
    });
  } catch (error) {
    console.error('Error fetching public website content:', error);
    // Return sensible fallback
    res.json({
      ok: true,
      data: DEFAULT_CONTENT,
    });
  }
});

/* -------------------------------------------------------------------------- */
/* Admin Routes: /api/admin/content (Protected)                               */
/* -------------------------------------------------------------------------- */

const updateContentSchema = z.object({
  sectionName: z.string().trim().min(1).max(50),
  items: z.record(z.string(), z.string()),
});

// GET /api/admin/content - Retrieve all editable content
contentAdminRouter.get('/', requireAdminAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const allRecords = await prisma.websiteContent.findMany();

    const grouped: Record<string, Record<string, string>> = { ...DEFAULT_CONTENT };

    for (const record of allRecords) {
      if (!grouped[record.sectionName]) {
        grouped[record.sectionName] = {};
      }
      grouped[record.sectionName][record.contentKey] = record.contentValue;
    }

    res.json({
      ok: true,
      data: grouped,
    });
  } catch (error) {
    console.error('Error fetching admin content:', error);
    res.status(500).json({ ok: false, message: 'Failed to retrieve website content.' });
  }
});

// PUT /api/admin/content - Upsert content items for a section
contentAdminRouter.put('/', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = updateContentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: 'Invalid content update payload.',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { sectionName, items } = parsed.data;

    const operations = Object.entries(items).map(([contentKey, contentValue]) => {
      return prisma.websiteContent.upsert({
        where: {
          sectionName_contentKey: {
            sectionName,
            contentKey,
          },
        },
        update: {
          contentValue,
        },
        create: {
          sectionName,
          contentKey,
          contentValue,
        },
      });
    });

    await prisma.$transaction(operations);

    res.json({
      ok: true,
      message: `Website content for [${sectionName}] updated successfully.`,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ ok: false, message: 'Failed to save website content.' });
  }
});
