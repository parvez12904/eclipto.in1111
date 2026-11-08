import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  Box,
  CheckCircle2,
} from 'lucide-react';

interface DigitalShowcaseSectionProps {
  onNavigate?: (sectionId: string) => void;
  onSelectPackage?: (pkg: string) => void;
}

interface WebsitePreview {
  id: string;
  name: string;
  category: string;
  url: string;
  displayUrl: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string };
  gradient: string;
  accentColor: string;
  heroHeadline: string;
  heroSub: string;
  navItems: string[];
  features: string[];
}

interface AiVisualConcept {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  tags: string[];
  accentColor: string;
  gradient: string;
  icon: React.FC<{ className?: string }>;
  svgGraphic: React.ReactNode;
}

const WEBSITE_PREVIEWS: WebsitePreview[] = [
  {
    id: 'devine-homz',
    name: 'Devine Homz',
    category: 'LUXURY REAL ESTATE & LIVING',
    url: 'https://www.devinehomz.com',
    displayUrl: 'devinehomz.com',
    tagline: 'Ultra-Luxury Architectural Living Spaces',
    description:
      'Bespoke architectural living spaces and prime residential developments presented through an elegant, high-retention digital showcase.',
    tags: ['Luxury Real Estate', 'Interactive Floor Plans', 'Speed Optimized', 'SSL Secured'],
    metrics: { label: 'Performance Score', value: '99/100' },
    gradient: 'from-[#E6004C]/25 via-[#25030e] to-[#080104]',
    accentColor: '#FF1053',
    heroHeadline: 'BESPOKE ARCHITECTURAL RESIDENCES',
    heroSub: 'Where ultra-luxury architecture meets refined living.',
    navItems: ['ESTATES', 'VILLAS', 'PENTHOUSES', 'INQUIRE'],
    features: ['34+ Bespoke Residences', 'Interactive 3D Plans', 'Instant Virtual Tour'],
  },
  {
    id: 'a-tiger-global',
    name: 'A Tiger Global',
    category: 'GLOBAL SOURCING & LOGISTICS',
    url: 'https://atigerglobal.com',
    displayUrl: 'atigerglobal.com',
    tagline: 'Worldwide Supply Chain & Logistics Network',
    description:
      'International trading, global logistics, and supply chain infrastructure engineered with enterprise-grade responsiveness and authority.',
    tags: ['Global Logistics', 'Supply Chain Visualizer', 'Enterprise Architecture', 'Multi-Region'],
    metrics: { label: 'Global Availability', value: '99.99%' },
    gradient: 'from-[#FF1053]/25 via-[#1e020a] to-[#080104]',
    accentColor: '#E6004C',
    heroHeadline: 'WORLDWIDE SOURCING & FREIGHT NETWORK',
    heroSub: 'Enterprise logistics engineered with sub-second transparency.',
    navItems: ['NETWORK', 'FREIGHT', 'ROUTES', 'PORTAL'],
    features: ['Multi-Region Hubs', 'Route Tracking Engine', 'B2B Trade Portal'],
  },
  {
    id: 'kraftor',
    name: 'Kraftor',
    category: 'ARCHITECTURAL HARDWARE & CRAFT',
    url: 'https://kraftor.in/',
    displayUrl: 'kraftor.in',
    tagline: 'Precision Hardware & Bespoke Craftsmanship',
    description:
      'Precision architectural hardware, luxury interior fittings, and bespoke craftsmanship highlighted via a minimalist high-contrast digital catalog.',
    tags: ['Architectural Hardware', 'Minimalist Catalog', 'Tactile Motion', 'B2B Procurement'],
    metrics: { label: 'Catalogue Items', value: '450+ Units' },
    gradient: 'from-[#E6004C]/20 via-[#1a0108] to-[#080104]',
    accentColor: '#FF1053',
    heroHeadline: 'PRECISION ARCHITECTURAL HARDWARE',
    heroSub: 'Bespoke brass, bronze & titanium architectural handles & fixtures.',
    navItems: ['COLLECTIONS', 'FINISHES', 'SPECS', 'CONTACT'],
    features: ['Bespoke Matte Finishes', 'Spec Sheet Downloads', 'Fast Procurement Flow'],
  },
];

const AI_CONCEPTS: AiVisualConcept[] = [
  {
    id: 'ai-agents',
    title: 'AUTONOMOUS AI AGENTS & INFERENCE',
    subtitle: 'Custom LLM Orchestration & Real-Time Workflows',
    metric: '< 42ms Inference Latency',
    description:
      'Production-ready AI agents that automate multi-step enterprise workflows, synthesize structured intelligence, and interact with user touchpoints with sub-second execution.',
    tags: ['LangChain / LlamaIndex', 'Vector Embeddings', 'Autonomous Tool Calling'],
    accentColor: '#FF1053',
    gradient: 'from-[#FF1053]/20 via-[#22020d] to-[#080104]',
    icon: Cpu,
    svgGraphic: (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="aiGrad" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF1053" stopOpacity="0.8" />
            <stop offset="1" stopColor="#E6004C" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Neural Network Nodes & Links */}
        <line x1="40" y1="90" x2="110" y2="40" stroke="#FF1053" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="40" y1="90" x2="110" y2="90" stroke="#FF1053" strokeWidth="1.5" opacity="0.8" />
        <line x1="40" y1="90" x2="110" y2="140" stroke="#FF1053" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="110" y1="40" x2="200" y2="60" stroke="#FF1053" strokeWidth="2" opacity="0.7" />
        <line x1="110" y1="90" x2="200" y2="60" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
        <line x1="110" y1="90" x2="200" y2="120" stroke="#FF1053" strokeWidth="2" opacity="0.9" />
        <line x1="110" y1="140" x2="200" y2="120" stroke="#FF1053" strokeWidth="1.5" opacity="0.6" />
        <line x1="200" y1="60" x2="280" y2="90" stroke="#FF1053" strokeWidth="2.5" opacity="0.95" />
        <line x1="200" y1="120" x2="280" y2="90" stroke="#fff" strokeWidth="2" opacity="0.8" />

        {/* Outer Glow Halo Rings */}
        <circle cx="280" cy="90" r="28" fill="#FF1053" fillOpacity="0.1" />
        <circle cx="280" cy="90" r="18" fill="#FF1053" fillOpacity="0.25" />
        <circle cx="280" cy="90" r="9" fill="#fff" filter="drop-shadow(0 0 10px #FF1053)" />

        {/* Nodes */}
        <circle cx="40" cy="90" r="6" fill="#E6004C" stroke="#fff" strokeWidth="1.5" />
        <circle cx="110" cy="40" r="5" fill="#FF1053" />
        <circle cx="110" cy="90" r="7" fill="#fff" stroke="#FF1053" strokeWidth="2" />
        <circle cx="110" cy="140" r="5" fill="#FF1053" />
        <circle cx="200" cy="60" r="7" fill="#FF1053" stroke="#fff" strokeWidth="2" />
        <circle cx="200" cy="120" r="8" fill="#fff" stroke="#FF1053" strokeWidth="2" />

        {/* Dynamic Telemetry Overlay */}
        <rect x="18" y="14" width="90" height="20" rx="4" fill="#080104" fillOpacity="0.85" stroke="#FF1053" strokeWidth="0.8" />
        <text x="26" y="28" fill="#FF1053" fontSize="8.5" fontFamily="monospace" fontWeight="bold">SYNAPSE // ACTIVE</text>

        <rect x="210" y="146" width="95" height="20" rx="4" fill="#080104" fillOpacity="0.85" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <text x="218" y="160" fill="#fff" fontSize="8.5" fontFamily="monospace">99.8% PRECISION</text>
      </svg>
    ),
  },
  {
    id: 'spatial-3d',
    title: 'SPATIAL 3D & HARDWARE WEBGL',
    subtitle: 'Browser-Native Raytracing & 60fps Shaders',
    metric: '60 FPS on Mobile • WebGPU Ready',
    description:
      'Photorealistic 3D product visualizers, architectural digital twins, and spatial web canvases rendered purely in the browser with adaptive GPU tiering.',
    tags: ['Three.js / WebGL', 'GLSL PBR Shaders', 'Progressive Geometry Streaming'],
    accentColor: '#E6004C',
    gradient: 'from-[#E6004C]/25 via-[#2a0410] to-[#080104]',
    icon: Box,
    svgGraphic: (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="sphereGrad" cx="45%" cy="40%" r="55%">
            <stop stopColor="#FF1053" />
            <stop offset="0.6" stopColor="#E6004C" />
            <stop offset="1" stopColor="#140106" />
          </radialGradient>
        </defs>
        {/* Spatial Grid Floor */}
        <ellipse cx="160" cy="140" rx="120" ry="25" fill="none" stroke="rgba(255,16,83,0.25)" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="160" cy="140" rx="80" ry="16" fill="none" stroke="rgba(255,16,83,0.4)" strokeWidth="1" />
        
        {/* Geometric Raytraced Wireframe Sphere */}
        <circle cx="160" cy="85" r="50" fill="url(#sphereGrad)" filter="drop-shadow(0 0 25px rgba(230,0,76,0.6))" />
        <ellipse cx="160" cy="85" rx="50" ry="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <ellipse cx="160" cy="85" rx="20" ry="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="160" y1="35" x2="160" y2="135" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="2 2" />
        
        {/* Light Caustic Specular Glint */}
        <circle cx="145" cy="70" r="5" fill="#fff" filter="drop-shadow(0 0 8px #fff)" />
        
        {/* Floating Geometric Wire Elements */}
        <polygon points="60,50 85,35 95,65 70,75" fill="none" stroke="#FF1053" strokeWidth="1" opacity="0.7" />
        <polygon points="250,55 275,40 285,70 260,80" fill="none" stroke="#FF1053" strokeWidth="1" opacity="0.7" />

        <text x="18" y="26" fill="#FF1053" fontSize="9" fontFamily="monospace" fontWeight="bold">WEBGL 2.0 // PBR</text>
        <text x="240" y="26" fill="rgba(255,255,255,0.6)" fontSize="8.5" fontFamily="monospace">60 FPS SYNC</text>
      </svg>
    ),
  },
  {
    id: 'enterprise-systems',
    title: 'ENTERPRISE HYPER-SCALE CLOUD SYSTEMS',
    subtitle: 'High-Throughput Distributed Microservices',
    metric: '100% Uptime SLA • Edge Redundancy',
    description:
      'Resilient web platforms engineered with zero-downtime rolling deploys, sub-millisecond edge database diffing, and institutional-grade security architecture.',
    tags: ['Distributed Microservices', 'PostgreSQL / Redis', 'Zero-Trust Architecture'],
    accentColor: '#FF1053',
    gradient: 'from-[#FF1053]/20 via-[#1f030c] to-[#080104]',
    icon: Zap,
    svgGraphic: (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        {/* Server Node Stack */}
        <g transform="translate(40, 30)">
          <rect width="240" height="28" rx="6" fill="#120107" stroke="#FF1053" strokeWidth="1.2" />
          <circle cx="18" cy="14" r="3" fill="#25D366" filter="drop-shadow(0 0 5px #25D366)" />
          <circle cx="30" cy="14" r="3" fill="#FF1053" />
          <circle cx="42" cy="14" r="3" fill="#fff" />
          <rect x="60" y="10" width="80" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="190" y="10" width="35" height="8" rx="2" fill="#E6004C" fillOpacity="0.4" />
        </g>
        <g transform="translate(40, 72)">
          <rect width="240" height="28" rx="6" fill="#120107" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="18" cy="14" r="3" fill="#25D366" />
          <circle cx="30" cy="14" r="3" fill="#25D366" />
          <circle cx="42" cy="14" r="3" fill="#FF1053" />
          <rect x="60" y="10" width="100" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="180" y="10" width="45" height="8" rx="2" fill="#FF1053" fillOpacity="0.3" />
        </g>
        <g transform="translate(40, 114)">
          <rect width="240" height="28" rx="6" fill="#120107" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="18" cy="14" r="3" fill="#25D366" />
          <circle cx="30" cy="14" r="3" fill="#25D366" />
          <circle cx="42" cy="14" r="3" fill="#25D366" />
          <rect x="60" y="10" width="70" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="195" y="10" width="30" height="8" rx="2" fill="#25D366" fillOpacity="0.4" />
        </g>
        <text x="40" y="162" fill="#FF1053" fontSize="9" fontFamily="monospace">HIGH CONCURRENCY CLUSTER</text>
        <text x="210" y="162" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">99.999% SLA</text>
      </svg>
    ),
  },
  {
    id: 'motion-systems',
    title: 'KINETIC BRAND IDENTITY & MOTION',
    subtitle: 'Viral User Retention & Award-Winning Polish',
    metric: '+320% User Retention Metric',
    description:
      'Bespoke micro-interactions, fluid kinetic physics, and editorial layout transitions crafted to leave an unforgettable impression and drive user engagement.',
    tags: ['Framer Motion', 'Kinetic Typography', 'Interactive Micro-Polish'],
    accentColor: '#FF1053',
    gradient: 'from-[#E6004C]/25 via-[#23020c] to-[#080104]',
    icon: Layers,
    svgGraphic: (
      <svg viewBox="0 0 320 180" fill="none" className="w-full h-full" aria-hidden="true">
        {/* Kinetic Ribbon Waves */}
        <path
          d="M20,120 C90,40 130,150 200,80 C240,40 280,100 300,70"
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M20,140 C80,70 140,160 210,100 C250,60 270,110 300,90"
          fill="none"
          stroke="#fff"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF1053" />
            <stop offset="0.5" stopColor="#E6004C" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        {/* Kinetic floating chips */}
        <rect x="70" y="35" width="70" height="22" rx="11" fill="#FF1053" fillOpacity="0.2" stroke="#FF1053" strokeWidth="1" />
        <text x="85" y="49" fill="#fff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">60FPS MOTION</text>

        <rect x="180" y="125" width="85" height="22" rx="11" fill="#fff" fillOpacity="0.1" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text x="193" y="139" fill="#FF1053" fontSize="8" fontFamily="sans-serif" fontWeight="bold">FLUID PHYSICS</text>
      </svg>
    ),
  },
];

export const DigitalShowcaseSection: React.FC<DigitalShowcaseSectionProps> = ({
  onNavigate,
  onSelectPackage,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CLIENTS' | 'AI'>('ALL');

  const handleInquireProject = (_projectName: string) => {
    if (onSelectPackage) {
      onSelectPackage('Professional — ₹12,999');
    }
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <section
      id="showreel"
      className="relative py-14 sm:py-20 md:py-24 bg-[#080104] z-10 border-t border-white/10 overflow-hidden"
      aria-label="Digital Website Previews & AI Creative Showcase"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[600px] rounded-full bg-[#E6004C]/08 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-1/4 w-[500px] h-[500px] rounded-full bg-[#FF1053]/06 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8 sm:pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/35 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF1053] animate-pulse shadow-[0_0_8px_#FF1053]" />
              <span className="font-tech text-[#FF1053] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold">
                04 / DIGITAL ARCHITECTURE & AI VISUALS
              </span>
            </div>

            <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
              <span className="block text-white">WEBSITE PREVIEWS</span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF3366] via-[#FF1053] to-[#FF6B8B] bg-clip-text text-transparent text-glow-pink">
                & CREATIVE AI SHOWCASE.
              </span>
            </h2>

            <p className="mt-4 text-white/80 font-body text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
              Inspect our high-performance client website architectures currently live in production,
              alongside cutting-edge generative AI workflows and hardware-accelerated spatial visual systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-xl font-tech text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ALL'
                  ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold shadow-[0_0_20px_rgba(230,0,76,0.45)]'
                  : 'glass-panel border border-white/15 text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              ALL SHOWCASES ({WEBSITE_PREVIEWS.length + AI_CONCEPTS.length})
            </button>
            <button
              onClick={() => setActiveTab('CLIENTS')}
              className={`px-4 py-2 rounded-xl font-tech text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'CLIENTS'
                  ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold shadow-[0_0_20px_rgba(230,0,76,0.45)]'
                  : 'glass-panel border border-white/15 text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              LIVE CLIENT WEBSITES ({WEBSITE_PREVIEWS.length})
            </button>
            <button
              onClick={() => setActiveTab('AI')}
              className={`px-4 py-2 rounded-xl font-tech text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'AI'
                  ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold shadow-[0_0_20px_rgba(230,0,76,0.45)]'
                  : 'glass-panel border border-white/15 text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              AI & CREATIVE SYSTEMS ({AI_CONCEPTS.length})
            </button>
          </div>
        </div>

        {/* 1. REALISTIC WEBSITE PREVIEWS GRID (DEVINE HOMZ, A TIGER GLOBAL, KRAFTOR) */}
        {(activeTab === 'ALL' || activeTab === 'CLIENTS') && (
          <div className="mb-14 sm:mb-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#FF1053]" />
                <h3 className="font-tech text-xs sm:text-sm tracking-[0.2em] uppercase text-white font-bold">
                  PRODUCTION CLIENT WEBSITES
                </h3>
                <span className="text-white/30 text-xs">•</span>
                <span className="font-tech text-[10px] sm:text-xs text-[#25D366] flex items-center space-x-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>ONLINE & ACCESSIBLE</span>
                </span>
              </div>
              <span className="hidden sm:inline-block font-tech text-xs text-white/50">
                BROWSER PREVIEW MOCKUPS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {WEBSITE_PREVIEWS.map((site) => (
                <div
                  key={site.id}
                  className="rounded-2xl sm:rounded-3xl glass-panel border border-white/15 hover:border-[#FF1053]/60 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(230,0,76,0.25)] hover:-translate-y-1 group"
                >
                  {/* REALISTIC BROWSER CHROME HEADER */}
                  <div className="px-4 py-3 bg-[#0d0206] border-b border-white/10 flex items-center justify-between">
                    {/* Window Controls (Red, Amber, Green) */}
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Address Bar with SSL Lock Icon */}
                    <div className="flex-1 max-w-[210px] sm:max-w-[230px] mx-2 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 flex items-center justify-center space-x-1.5 text-[11px] font-mono text-white/70">
                      <ShieldCheck className="w-3 h-3 text-[#25D366] shrink-0" />
                      <span className="truncate">{site.displayUrl}</span>
                    </div>

                    {/* External Link Pill */}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`Open ${site.name} in a new tab`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* REALISTIC SIMULATED WEBSITE INTERFACE CANVAS */}
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-[#180209] to-[#090104] p-4 flex flex-col justify-between overflow-hidden border-b border-white/10">
                    {/* Ambient subtle glow inside browser preview */}
                    <div
                      className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#FF1053]/20 blur-2xl pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Mini Website Top Nav */}
                    <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-white/10">
                      <div className="font-display font-black text-xs text-white tracking-widest flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded bg-[#FF1053]" />
                        <span>{site.name.toUpperCase()}</span>
                      </div>
                      <div className="hidden xs:flex items-center space-x-2 text-[9px] font-mono text-white/50">
                        {site.navItems.map((item, i) => (
                          <span key={i} className="hover:text-white transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mini Website Hero Content */}
                    <div className="relative z-10 my-auto py-2">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-[#FF1053]/20 border border-[#FF1053]/40 text-[8.5px] font-mono text-[#FF1053] font-bold uppercase tracking-wider mb-1.5">
                        {site.category}
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-white tracking-tight leading-snug line-clamp-2">
                        {site.heroHeadline}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/60 font-body line-clamp-2 mt-1">
                        {site.heroSub}
                      </p>
                    </div>

                    {/* Mini Feature Chips / Bottom Bar */}
                    <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono">
                      <div className="flex items-center space-x-1 text-[#25D366]">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{site.features[0]}</span>
                      </div>
                      <span className="text-white/40">{site.metrics.value}</span>
                    </div>
                  </div>

                  {/* CARD BODY DETAILS & ACTIONS */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Sector */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-black text-lg text-white tracking-tight">
                          {site.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60">
                          {site.metrics.label}: <strong className="text-white">{site.metrics.value}</strong>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed mb-4">
                        {site.description}
                      </p>

                      {/* Tech Stack / Capability Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {site.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2.5">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-display text-[11px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(230,0,76,0.35)] hover:shadow-[0_0_25px_rgba(230,0,76,0.6)] transition-all"
                        aria-label={`Visit live website for ${site.name}`}
                      >
                        <span>VISIT LIVE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleInquireProject(site.name)}
                        className="w-full inline-flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl glass-panel border border-white/20 hover:border-[#FF1053] hover:bg-[#FF1053]/15 text-white font-display text-[11px] font-bold tracking-wider uppercase transition-all"
                      >
                        <span>INQUIRE BUILD</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. AI CREATIVE CONCEPTS & SYSTEM VISUALS (4 High-Tech Cards) */}
        {(activeTab === 'ALL' || activeTab === 'AI') && (
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-[#FF1053]" />
                <h3 className="font-tech text-xs sm:text-sm tracking-[0.2em] uppercase text-white font-bold">
                  AI-GENERATED CONCEPTS & SYSTEM ARCHITECTURES
                </h3>
                <span className="text-white/30 text-xs">•</span>
                <span className="font-tech text-[10px] sm:text-xs text-[#FF1053] font-bold">
                  NEXT-GEN CAPABILITIES
                </span>
              </div>
              <span className="hidden sm:inline-block font-tech text-xs text-white/50">
                PROPRIETARY DESIGN SYSTEMS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch">
              {AI_CONCEPTS.map((concept) => {
                const IconComponent = concept.icon;
                return (
                  <div
                    key={concept.id}
                    className="rounded-2xl sm:rounded-3xl glass-panel border border-white/15 hover:border-[#FF1053]/60 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(230,0,76,0.25)] hover:-translate-y-1 group"
                  >
                    {/* Visual Graphic Canvas Area */}
                    <div className="relative aspect-[16/9] w-full bg-[#0a0104] p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b border-white/10">
                      {/* Ambient background glow */}
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-[#FF1053]/15 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />
                      {concept.svgGraphic}
                    </div>

                    {/* Text Details Area */}
                    <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Header & Icon */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 rounded-xl bg-[#FF1053]/15 border border-[#FF1053]/30 text-[#FF1053]">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-tech text-[10px] text-[#FF1053] uppercase tracking-wider block font-bold">
                                {concept.subtitle}
                              </span>
                              <h4 className="font-display font-black text-base sm:text-lg text-white tracking-tight">
                                {concept.title}
                              </h4>
                            </div>
                          </div>
                        </div>

                        {/* Metric Highlight Badge */}
                        <div className="inline-block my-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/15 text-[11px] font-mono text-white/90">
                          <strong className="text-[#FF1053]">{concept.metric}</strong>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed mb-4">
                          {concept.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {concept.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-white/50">
                          Ready to deploy in your stack?
                        </span>
                        <button
                          onClick={() => handleInquireProject(concept.title)}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FF1053]/15 hover:bg-[#FF1053] border border-[#FF1053]/40 text-white font-display text-[11px] font-bold tracking-wider uppercase transition-all duration-300"
                        >
                          <span>DISCUSS ARCHITECTURE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
