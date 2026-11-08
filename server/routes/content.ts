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
  services: {
    services_list: JSON.stringify([
      {
        id: 'website-development',
        num: '01',
        title: 'Website Development',
        headline: 'High-performance websites and immersive 3D digital experiences.',
        description:
          'We combine avant-garde art direction, buttery 60fps WebGL motion, and obsessive attention to typographic detail to make your digital presence unforgettable.',
        deliverables: [
          'Interactive 3D Websites & Configurator Apps',
          'Award-Winning Motion Design & Micro-Animations',
          'Custom Shader Programming & Canvas Effects',
          'High-Conversion Design Systems & Brand Kits',
        ],
        techStack: ['React', 'Three.js / WebGL', 'Tailwind CSS', 'Vite', 'Framer Motion'],
        metrics: 'Top 1% Global Retention Rate',
      },
      {
        id: 'custom-software',
        num: '02',
        title: 'Custom Software Development',
        headline: 'Resilient software platforms engineered for extreme scale.',
        description:
          'From sub-second financial terminals to enterprise SaaS backbones, we build resilient, secure, and reactive software platforms that scale gracefully.',
        deliverables: [
          'Micro-Frontend & Edge SSR Architectures',
          'Real-Time WebSocket & Offscreen Canvas Systems',
          'High-Security API & Database Modeling',
          'Zero-Downtime Deployment & CI/CD Pipelines',
        ],
        techStack: ['TypeScript', 'Node.js', 'Next.js', 'Rust', 'PostgreSQL', 'Docker'],
        metrics: '99.99% Production Uptime',
      },
      {
        id: 'ai-automation',
        num: '03',
        title: 'AI Agents & Automation',
        headline: 'Transform operational complexity into autonomous intelligence.',
        description:
          'We design and deploy proprietary AI agent pipelines, custom generative UI components, and domain-tuned models that give your business an unfair advantage.',
        deliverables: [
          'Autonomous Multi-Agent Workflow Pipelines',
          'Low-Latency Generative UI Interfaces',
          'Custom LLM Fine-Tuning & RAG Architectures',
          'Secure On-Premise & Edge Neural Inference',
        ],
        techStack: ['PyTorch', 'LangChain', 'FastAPI', 'Vector DBs', 'Edge Runtime'],
        metrics: '8.4x Operational Acceleration',
      },
      {
        id: 'whatsapp-automation',
        num: '04',
        title: 'WhatsApp Business Automation',
        headline: 'Conversational sales, automated lead qualification, and 24/7 engagement.',
        description:
          'Integrate high-conversion WhatsApp bots, broadcast workflows, and verified API automations directly into your CRM to close clients on autopilot.',
        deliverables: [
          'Official WhatsApp Cloud API & Bot Architecture',
          'Automated Lead Qualification & Booking Funnels',
          'CRM & ERP Synchronization (HubSpot, Salesforce, Sheets)',
          'Multi-Agent Customer Support & Broadcast Routing',
        ],
        techStack: ['WhatsApp Cloud API', 'Node.js', 'Webhooks', 'Redis', 'Python'],
        metrics: '3.8x Higher Conversion vs Email',
      },
      {
        id: 'branding-design',
        num: '05',
        title: 'Branding & Creative Design',
        headline: 'Distinctive visual identities that command industry authority.',
        description:
          'Bespoke visual identities, kinetic motion languages, design token architectures, and typographic direction crafted for modern high-growth brands.',
        deliverables: [
          'Brand Identity Guidelines & Logo Systems',
          'Kinetic Motion Design & Video Showreels',
          'Comprehensive Design Systems & Component Libraries',
          'Editorial Print & Packaging Collateral',
        ],
        techStack: ['Figma', 'After Effects', 'GLSL', 'Cinema 4D', 'Design Tokens'],
        metrics: 'Award-Winning Brand Recall',
      },
      {
        id: 'digital-marketing',
        num: '06',
        title: 'Digital Marketing & Growth',
        headline: 'Full-funnel growth architecture tailored for market dominance.',
        description:
          'Data-driven performance marketing, technical SEO, high-conversion landing page funnels, and retention systems that consistently generate qualified pipeline.',
        deliverables: [
          'Technical SEO & Core Web Vitals Dominance',
          'High-Intent Paid Acquisition (Google, Meta, LinkedIn)',
          'Conversion Rate Optimization (CRO) & A/B Testing',
          'Customer Lifecycle & Behavioral Telemetry',
        ],
        techStack: ['Google Ads', 'Meta API', 'PostHog', 'Mixpanel', 'VWO'],
        metrics: 'Average 310% Revenue Growth',
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

