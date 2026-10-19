export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: 'ALL' | 'WEB & 3D' | 'AI SYSTEMS' | 'PLATFORMS' | 'BRANDING';
  outcome: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  accentColor: string;
  featuredStat: {
    label: string;
    value: string;
  };
  imageGradient: string;
}

export interface Service {
  id: string;
  num: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  metrics: string;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'aether-ai',
    title: 'AETHER AI',
    subtitle: 'Autonomous Spatial Design Engine',
    client: 'Aether Labs • San Francisco',
    year: '2026',
    category: 'AI SYSTEMS',
    outcome: '+340% Conversions, 4.8M Weekly Generations',
    description:
      'A groundbreaking generative design engine enabling designers and engineers to synthesize 3D spatial scenes in real time with sub-100ms inference.',
    challenge:
      'Standard AI interfaces are text-heavy and sluggish. Aether needed an instant, cinematic 60fps canvas that allows creative teams to collaborate without perceptible lag.',
    solution:
      'We architected an ultra-fast WebGL & WebGPU rendering canvas coupled with Edge-streamed neural weights, resulting in fluid multi-user generative composition.',
    tags: ['Next.js 15', 'WebGL', 'Edge AI', 'Rust Wasm'],
    accentColor: '#FF1053',
    featuredStat: {
      label: 'Model Inference Latency',
      value: '< 45ms',
    },
    imageGradient: 'from-[#E6004C]/30 via-[#1f0108] to-[#080104]',
  },
  {
    id: 'kinetic-velo',
    title: 'KINETIC VELO',
    subtitle: 'Hyper-Performance Electric Hypercar Configurator',
    client: 'Kinetic Automobili • Milan',
    year: '2026',
    category: 'WEB & 3D',
    outcome: 'Awwwards Site of the Month • 60fps Browser Configurator',
    description:
      'Photorealistic 3D configurator allowing VIP clientele to customize aerospace-grade carbon fiber body panels, interior ambient lighting, and powertrain specs.',
    challenge:
      'Delivering studio-grade raytracing visuals on mobile devices without crashing WebGL contexts or causing battery drain.',
    solution:
      'Engineered a hybrid PBR shader system with progressive detail streaming and procedural reflection probes tailored for high-DPI displays.',
    tags: ['Three.js', 'PBR Shaders', 'WebGPU', 'Tailwind'],
    accentColor: '#E6004C',
    featuredStat: {
      label: 'Frame Rate on Mobile',
      value: '60 FPS',
    },
    imageGradient: 'from-[#FF1053]/25 via-[#2a0410] to-[#080104]',
  },
  {
    id: 'synthesis-finance',
    title: 'SYNTHESIS NETWORK',
    subtitle: 'Decentralized High-Throughput Liquidity Terminal',
    client: 'Synthesis Protocol • Zurich',
    year: '2025',
    category: 'PLATFORMS',
    outcome: '$1.8B Volume Processed • 100% Uptime SLA',
    description:
      'Institutional-grade financial terminal delivering real-time order books, sub-second execution charts, and zero-knowledge privacy verification.',
    challenge:
      'Rendering hundreds of tick updates per second without freezing user interactions or dropping frames during volatile market conditions.',
    solution:
      'Implemented custom OffscreenCanvas chart visualizers and WebSocket multiplexing workers with sub-millisecond DOM diffing.',
    tags: ['OffscreenCanvas', 'WebSockets', 'TypeScript', 'Zero-Knowledge'],
    accentColor: '#FF1053',
    featuredStat: {
      label: 'Cumulative Volume',
      value: '$1.8B+',
    },
    imageGradient: 'from-[#E6004C]/25 via-[#1a0107] to-[#080104]',
  },
  {
    id: 'neura-health',
    title: 'NEURA INTELLIGENCE',
    subtitle: 'Cognitive Health & Neuromorphic Telemetry',
    client: 'Neura Health • Boston',
    year: '2026',
    category: 'AI SYSTEMS',
    outcome: 'FDA Class II Interface Certified • 99.99% Reliability',
    description:
      'A clinical telemetry suite that decodes multimodal EEG and bio-signals into actionable diagnostic insights for neurosurgeons and research teams.',
    challenge:
      'Ensuring strict medical-grade accessibility while preserving a cutting-edge dark aesthetic that reduces eye strain in dark operating theaters.',
    solution:
      'Designed high-contrast neon telemetry gauges and accessible auditory feedback indicators with real-time anomaly detection.',
    tags: ['FastAPI', 'React', 'AudioContext', 'Web Workers'],
    accentColor: '#E6004C',
    featuredStat: {
      label: 'Signal Precision',
      value: '99.94%',
    },
    imageGradient: 'from-[#FF1053]/30 via-[#22020d] to-[#080104]',
  },
  {
    id: 'valence-xr',
    title: 'VALENCE SPATIAL',
    subtitle: 'Spatial Computing Interface & Vision Pro Suite',
    client: 'Valence XR • Tokyo',
    year: '2025',
    category: 'WEB & 3D',
    outcome: 'Best Innovation FWA • 1.2M Spatial Sessions',
    description:
      'Interactive spatial web portal enabling enterprises to tour architectural megaprojects before groundbreaking through immersive WebXR.',
    challenge:
      'Bridging desktop browser sessions seamlessly into Apple Vision Pro and Meta Quest headsets with synchronized multi-user presence.',
    solution:
      'Built a universal WebXR pipeline that dynamically scales texture resolutions and geometry based on the connecting device headset capabilities.',
    tags: ['WebXR', 'Spatial Audio', 'GLSL Shaders', 'WebRTC'],
    accentColor: '#FF1053',
    featuredStat: {
      label: 'Spatial Sessions',
      value: '1.2M+',
    },
    imageGradient: 'from-[#E6004C]/20 via-[#190209] to-[#080104]',
  },
  {
    id: 'hyperion-cloud',
    title: 'HYPERION CLOUD',
    subtitle: 'Global Edge Compute & Telemetry Dashboard',
    client: 'Hyperion Systems • London',
    year: '2025',
    category: 'PLATFORMS',
    outcome: 'Sub-10ms Telemetry • 200+ Enterprise Deployments',
    description:
      'Command center for distributed serverless clusters across 280 edge locations worldwide with predictive AI autoscaling.',
    challenge:
      'Visualizing complex multi-region topology and latency vectors cleanly on a single unified canvas without information overload.',
    solution:
      'Crafted a dynamic 3D globe visualization paired with tactile glass cards and instant command palette navigation.',
    tags: ['Distributed Systems', 'React', 'GraphQL', 'Tailwind'],
    accentColor: '#E6004C',
    featuredStat: {
      label: 'Global Edge Nodes',
      value: '280+',
    },
    imageGradient: 'from-[#FF1053]/25 via-[#23020c] to-[#080104]',
  },
];

export const SERVICES: Service[] = [
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
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'ARCHITECTURAL DISCOVERY',
    subtitle: 'Mapping Vision into Technical Blueprint',
    description:
      'We deconstruct your core value proposition, benchmark competitive vectors, and architect a technical blueprint with stringent performance budgets.',
    details: [
      'Information architecture & user journey mapping',
      'Performance budgets & latency constraints',
      'System topology & API design specifications',
    ],
  },
  {
    step: '02',
    title: 'ART DIRECTION & PROTOTYPING',
    subtitle: 'Kinetic Exploration & Visual Identity',
    description:
      'We bring designs to life early through high-fidelity interactive prototypes, custom typography, dynamic lighting, and motion choreography.',
    details: [
      'Cinematic motion design & micro-interactions',
      'Design token systems & bespoke typography',
      'Interactive 60fps staging prototypes',
    ],
  },
  {
    step: '03',
    title: 'PRECISION ENGINEERING',
    subtitle: 'Writing Clean, Bulletproof Codebases',
    description:
      'Our engineers implement every component with clean TypeScript, robust error handling, automated testing suites, and strict accessibility standards.',
    details: [
      'Type-safe component architecture',
      'State synchronization & data streaming',
      'Accessibility (WCAG 2.1 AA) compliance',
    ],
  },
  {
    step: '04',
    title: 'GLOBAL DEPLOYMENT & SCALE',
    subtitle: 'Zero-Downtime Launch & Continuous Hypergrowth',
    description:
      'We execute multi-region edge deployment, stress-test high concurrency loads, and monitor user telemetry to relentlessly optimize conversions.',
    details: [
      'Multi-region Edge CDN propagation',
      'Real-time error tracking & telemetry',
      'Continuous conversion rate optimization',
    ],
  },
];

export const INSIGHTS: Insight[] = [
  {
    id: 'future-of-spatial-web',
    title: 'The Spatial Web in 2026: Why 2D Screens Are Becoming Obsolete',
    category: 'FUTURE TECH',
    readTime: '5 MIN READ',
    date: 'MARCH 2026',
    excerpt:
      'How WebGPU and WebXR are converging to turn ordinary browser tabs into immersive 3D spatial environments.',
    content:
      'The era of static rectangular card interfaces is ending. As hardware acceleration reaches parity across mobile and spatial headsets, interfaces are transforming into living, responsive environments where light, depth, and kinetic physics govern user interaction. Organizations that master spatial storytelling now will capture generational mindshare.',
  },
  {
    id: 'sub-10ms-latency',
    title: 'Engineering Sub-10ms Latency: Architectural Lessons from High-Frequency UI',
    category: 'ENGINEERING',
    readTime: '7 MIN READ',
    date: 'FEBRUARY 2026',
    excerpt:
      'Practical techniques for orchestrating Web Workers, OffscreenCanvas, and edge serverless caching to eliminate interaction lag.',
    content:
      'Every 100 milliseconds of interface delay degrades user cognitive trust. By decoupling intensive mathematical operations and visual rendering into dedicated background threads, modern web applications can maintain unyielding 60fps and 120fps refresh rates even under massive telemetry streams.',
  },
  {
    id: 'generative-interfaces',
    title: 'Generative UI: Building Software That Rewrites Its Own Interface in Real Time',
    category: 'AI & DESIGN',
    readTime: '6 MIN READ',
    date: 'JANUARY 2026',
    excerpt:
      'How AI models are moving beyond chat prompts into runtime interface synthesis tailored to individual user intent.',
    content:
      'The next paradigm of digital product design is dynamic layout synthesis. Instead of static navigation trees, systems will observe user intent in real time and compose bespoke workflows on the fly, reducing multi-click friction to instantaneous goal fulfillment.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'ECLIPTO transformed our digital platform from standard SaaS into an award-winning cinematic experience. Our enterprise conversion rate tripled within 60 days of launch.',
    author: 'Elena Rostova',
    title: 'Chief Product Officer',
    company: 'Aether Spatial Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    quote:
      'Their obsessive technical execution is unmatched. Delivering a 60fps 3D hypercar configurator on mobile devices seemed impossible until ECLIPTO built it for us.',
    author: 'Marco Valenti',
    title: 'Head of Brand Innovation',
    company: 'Kinetic Automobili',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    quote:
      'Working with ECLIPTO felt like stepping five years into the future. They are not just an agency; they are master architects of digital wonder.',
    author: 'Dr. Sarah Lin',
    title: 'Founding Partner',
    company: 'Synthesis Ventures',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
];
