import dotenv from 'dotenv';
import { prisma } from '../db';

dotenv.config();

const INITIAL_REELS = [
  {
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

const INITIAL_CONTENT = [
  // Hero Section
  {
    sectionName: 'hero',
    contentKey: 'main_heading',
    contentValue: 'WE BUILD',
  },
  {
    sectionName: 'hero',
    contentKey: 'highlighted_heading',
    contentValue: "WHAT'S NEXT.",
  },
  {
    sectionName: 'hero',
    contentKey: 'description',
    contentValue:
      'We create powerful websites, intelligent software, and AI-powered experiences that help businesses move forward.',
  },
  {
    sectionName: 'hero',
    contentKey: 'primary_cta_text',
    contentValue: "LET'S BUILD SOMETHING",
  },
  {
    sectionName: 'hero',
    contentKey: 'secondary_cta_text',
    contentValue: 'EXPLORE OUR WORK',
  },

  // Pricing Section
  {
    sectionName: 'pricing',
    contentKey: 'packages_list',
    contentValue: JSON.stringify([
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
];

async function seedInitialContent() {
  console.log('[Seed] Seeding initial website content and reels...');

  // 1. Seed Content
  for (const item of INITIAL_CONTENT) {
    await prisma.websiteContent.upsert({
      where: {
        sectionName_contentKey: {
          sectionName: item.sectionName,
          contentKey: item.contentKey,
        },
      },
      update: {
        contentValue: item.contentValue,
      },
      create: {
        sectionName: item.sectionName,
        contentKey: item.contentKey,
        contentValue: item.contentValue,
      },
    });
  }
  console.log(`[Seed] Seeded ${INITIAL_CONTENT.length} website content keys.`);

  // 2. Seed Reels if none exist
  const existingCount = await prisma.reel.count();
  if (existingCount === 0) {
    for (const reel of INITIAL_REELS) {
      await prisma.reel.create({
        data: reel,
      });
    }
    console.log(`[Seed] Seeded ${INITIAL_REELS.length} initial reels.`);
  } else {
    console.log(`[Seed] Reels already exist in database (${existingCount} reels).`);
  }

  console.log('[Seed] Content and Reels setup completed successfully.');
}

seedInitialContent()
  .catch((e) => {
    console.error('[Seed Error]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
