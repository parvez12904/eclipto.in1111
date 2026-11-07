export interface ReelItem {
  id: string;
  caption: string;
  title: string;
  mediaType: 'VIDEO' | 'IMAGE';
  mediaUrl: string;
  thumbnailUrl: string;
  permalink: string;
  timestamp: string;
  views?: string;
  likes?: string;
  audioTrack?: string;
}

export interface InstagramResponse {
  ok: boolean;
  source: 'live' | 'cache' | 'fallback';
  account: string;
  profileUrl: string;
  message?: string;
  reels: ReelItem[];
}

export const FALLBACK_REELS_CLIENT: ReelItem[] = [
  {
    id: 'eclipto-reel-1',
    title: 'Kinetic 3D Web & Hypercar Configurator',
    caption: 'Pushing browser boundaries with 60FPS WebGL and cinematic shaders. Built for luxury automotive performance. #WebGL #Threejs #WebDevelopment #Eclipto',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-03-24T12:00:00Z',
    views: '24.8K',
    likes: '1.9K',
    audioTrack: 'Eclipto Sound Lab • Kinetic Pulse',
  },
  {
    id: 'eclipto-reel-2',
    title: 'Autonomous Multi-Agent AI Pipelines',
    caption: 'How we orchestrate autonomous AI agents to automate 80% of enterprise customer workflows and lead qualification. #ArtificialIntelligence #Automation #SaaS',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-03-20T15:30:00Z',
    views: '19.4K',
    likes: '1.4K',
    audioTrack: 'Synthwave Odyssey • Future Beats',
  },
  {
    id: 'eclipto-reel-3',
    title: 'Spatial Web & Liquid Glass UI Systems',
    caption: 'Designing for the spatial web: tactile glass components, fluid micro-interactions, and high contrast typography. #UIUX #DesignSystem #WebDesign',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633493106115-06b245089fa0?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-03-15T18:00:00Z',
    views: '32.1K',
    likes: '2.8K',
    audioTrack: 'Original Audio • @eclipto_.in',
  },
  {
    id: 'eclipto-reel-4',
    title: 'Next-Gen Website Conversions: Zero to 340%',
    caption: 'Why standard static websites lose customers in 3 seconds. The architecture behind high-retention enterprise landing pages. #ConversionRate #WebDev',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-03-10T11:15:00Z',
    views: '28.6K',
    likes: '2.2K',
    audioTrack: 'Ambient Cyber • Tech Wave',
  },
  {
    id: 'eclipto-reel-5',
    title: 'Full-Stack Performance: Sub-10ms Latency',
    caption: 'Benchmarking modern React + Edge execution. Clean code architecture that scales seamlessly under heavy traffic spikes. #Code #Engineering #DevOps',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-03-04T16:45:00Z',
    views: '16.7K',
    likes: '1.1K',
    audioTrack: 'Deep Focus Pulse • Coding Session',
  },
  {
    id: 'eclipto-reel-6',
    title: 'Avant-Garde Brand Motion & Visual Identity',
    caption: 'Crafting unforgettable visual languages, bespoke motion physics, and dark luxury aesthetics for global disruptors. #Branding #MotionDesign #CreativeAgency',
    mediaType: 'VIDEO',
    mediaUrl: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    permalink: 'https://www.instagram.com/eclipto_.in/',
    timestamp: '2026-02-28T14:20:00Z',
    views: '35.4K',
    likes: '3.1K',
    audioTrack: 'Cinematic Noir • Eclipto Studio',
  },
];

/**
 * Fetches latest reels from the backend Instagram proxy endpoint
 * Falls back gracefully to curated client data if backend is offline or unconfigured.
 */
export async function fetchInstagramReels(): Promise<InstagramResponse> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/instagram/reels', {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timer);

    if (res.ok) {
      const data = (await res.json()) as InstagramResponse;
      if (data && Array.isArray(data.reels) && data.reels.length > 0) {
        return data;
      }
    }
  } catch {
    // Graceful fallback on network or parse failure
  }

  return {
    ok: true,
    source: 'fallback',
    account: '@eclipto_.in',
    profileUrl: 'https://www.instagram.com/eclipto_.in/',
    reels: FALLBACK_REELS_CLIENT,
  };
}
