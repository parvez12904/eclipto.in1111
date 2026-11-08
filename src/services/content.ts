import { SERVICES, type Service } from '../data/agencyData';

export interface HeroContent {
  mainHeading: string;
  highlightedHeading: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export type DynamicService = Service;

export const DEFAULT_SERVICES: DynamicService[] = SERVICES;

export interface DynamicPricingPackage {
  id: string;
  name: string;
  tierNumber: string;
  tierSubtitle: string;
  badge?: string;
  startingPrice: string;
  priceNote: string;
  valueProposition: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  mainHeading: 'WE BUILD',
  highlightedHeading: "WHAT'S NEXT.",
  description:
    'We create powerful websites, intelligent software, and AI-powered experiences that help businesses move forward.',
  primaryCtaText: "LET'S BUILD SOMETHING",
  secondaryCtaText: 'EXPLORE OUR WORK',
};

export async function fetchWebsiteContent(): Promise<Record<string, Record<string, string>>> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/content', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      if (json && json.ok && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fail silently, fallback to defaults
  }

  return {
    hero: {
      main_heading: DEFAULT_HERO_CONTENT.mainHeading,
      highlighted_heading: DEFAULT_HERO_CONTENT.highlightedHeading,
      description: DEFAULT_HERO_CONTENT.description,
      primary_cta_text: DEFAULT_HERO_CONTENT.primaryCtaText,
      secondary_cta_text: DEFAULT_HERO_CONTENT.secondaryCtaText,
    },
  };
}

