import React from 'react';
import {
  Check,
  ArrowUpRight,
  MessageSquare,
  HelpCircle,
  Crown,
  Phone,
} from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface PricingPackage {
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
  whatsappMessage: string;
}

const PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tierNumber: 'TIER 01',
    tierSubtitle: 'ESSENTIAL FOUNDATION',
    startingPrice: '₹5,999',
    priceNote: 'Starting price for baseline websites',
    valueProposition:
      'Perfect for individuals and small businesses looking for a professional online presence.',
    features: [
      'Modern responsive website',
      'Up to 5 core sections/pages',
      'Mobile-friendly design',
      'Contact/WhatsApp integration',
      'Basic SEO setup',
      'Modern UI design',
    ],
    ctaText: 'CHOOSE STARTER',
    whatsappMessage:
      'Hi Parvez, I am interested in the Starter Package (Starting from ₹5,999) for my website. Please share more details.',
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
    whatsappMessage:
      'Hi Parvez, I am interested in the Professional Package (Starting from ₹12,999) for my website. Please share more details.',
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
    whatsappMessage:
      'Hi Parvez, I am interested in the Premium Package (Starting from ₹21,999+) for my website. Please share more details.',
  },
];

const CUSTOM_REQUIREMENTS = [
  'Number of pages',
  'Custom features',
  'API integrations',
  'Admin panels',
  'E-commerce functionality',
  'Third-party integrations',
  'Content and design requirements',
];

/* -------------------------------------------------------------------------- */
/* Custom Abstract Graphics for Each Package Level                            */
/* -------------------------------------------------------------------------- */

const StarterEmblem: React.FC = () => (
  <svg
    viewBox="0 0 280 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto rounded-xl"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="starterBg" x1="0" y1="0" x2="280" y2="84" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.18" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <rect width="280" height="84" rx="10" fill="url(#starterBg)" stroke="rgba(255,255,255,0.08)" />
    
    {/* Clean geometric launch vector */}
    <g transform="translate(18, 14)">
      <circle cx="28" cy="28" r="24" fill="#14020a" stroke="rgba(255,16,83,0.3)" strokeWidth="1" />
      <circle cx="28" cy="28" r="16" stroke="#FF1053" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points="28,14 36,36 28,31 20,36" fill="#FF1053" />
      <circle cx="28" cy="28" r="3" fill="#fff" />
    </g>

    {/* Metric Badge */}
    <g transform="translate(90, 22)">
      <text x="0" y="12" fill="#FF1053" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
        LAUNCHPAD SPEC
      </text>
      <text x="0" y="26" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        Lean & High-Retention
      </text>
      <text x="0" y="38" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
        Rapid Turnaround • 100% Responsive
      </text>
    </g>
  </svg>
);

const ProfessionalEmblem: React.FC = () => (
  <svg
    viewBox="0 0 280 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto rounded-xl"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="proBg" x1="0" y1="0" x2="280" y2="84" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.32" />
        <stop offset="0.6" stopColor="#E6004C" stopOpacity="0.2" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="proCore" cx="50%" cy="50%" r="50%">
        <stop stopColor="#FF1053" />
        <stop offset="1" stopColor="#E6004C" stopOpacity="0.2" />
      </radialGradient>
    </defs>
    <rect width="280" height="84" rx="10" fill="url(#proBg)" stroke="rgba(255,16,83,0.4)" strokeWidth="1.2" />
    
    {/* Multi-ring Quantum Energy Reactor */}
    <g transform="translate(18, 14)">
      <circle cx="28" cy="28" r="26" fill="url(#proCore)" opacity="0.35" filter="blur(4px)" />
      <ellipse cx="28" cy="28" rx="24" ry="12" stroke="#FF1053" strokeWidth="1.2" transform="rotate(-25 28 28)" />
      <ellipse cx="28" cy="28" rx="24" ry="12" stroke="#fff" strokeWidth="0.8" opacity="0.7" transform="rotate(35 28 28)" />
      <circle cx="28" cy="28" r="7" fill="#fff" filter="drop-shadow(0 0 6px #FF1053)" />
      <circle cx="28" cy="28" r="3" fill="#E6004C" />
    </g>

    {/* Metric Badge */}
    <g transform="translate(90, 20)">
      <rect x="0" y="0" width="76" height="13" rx="6.5" fill="rgba(255,16,83,0.25)" />
      <text x="6" y="9.5" fill="#fff" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
        MAX CONVERSION
      </text>
      <text x="0" y="26" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        Custom Scale Engine
      </text>
      <text x="0" y="38" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">
        Bespoke UI/UX • Advanced Forms
      </text>
    </g>
  </svg>
);

const PremiumEmblem: React.FC = () => (
  <svg
    viewBox="0 0 280 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto rounded-xl"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="premBg" x1="0" y1="0" x2="280" y2="84" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6004C" stopOpacity="0.25" />
        <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.18" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <rect width="280" height="84" rx="10" fill="url(#premBg)" stroke="rgba(255,255,255,0.12)" />
    
    {/* Architectural Diamond Prism */}
    <g transform="translate(18, 14)">
      <polygon points="28,6 50,22 42,48 14,48 6,22" fill="#1b030d" stroke="#FF1053" strokeWidth="1.2" />
      <polygon points="28,6 38,22 28,48 18,22" fill="rgba(255,16,83,0.3)" stroke="#fff" strokeWidth="0.8" />
      <circle cx="28" cy="6" r="2.5" fill="#fff" filter="drop-shadow(0 0 4px #FF1053)" />
      <circle cx="50" cy="22" r="2" fill="#FF1053" />
      <circle cx="6" cy="22" r="2" fill="#FF1053" />
    </g>

    {/* Metric Badge */}
    <g transform="translate(90, 22)">
      <text x="0" y="12" fill="#FF1053" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
        FLAGSHIP ENTERPRISE
      </text>
      <text x="0" y="26" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        Unrestricted Architecture
      </text>
      <text x="0" y="38" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
        Dynamic Backend • 60fps Motion
      </text>
    </g>
  </svg>
);

interface PricingSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${CONTACT_CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`;
  };

  const getPackageEmblem = (id: string) => {
    switch (id) {
      case 'starter':
        return <StarterEmblem />;
      case 'professional':
        return <ProfessionalEmblem />;
      case 'premium':
        return <PremiumEmblem />;
      default:
        return <StarterEmblem />;
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-12 sm:py-16 md:py-20 lg:py-22 bg-[#080104] z-10 border-t border-white/10"
      aria-label="Website Development Pricing Packages"
    >
      {/* Background radial gradient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E6004C]/08 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] animate-pulse" />
            <span className="font-tech text-[#E6004C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold">
              06 / TRANSPARENT PRICING
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">ECLIPTO WEBSITE</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              DEVELOPMENT PACKAGES.
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-white/75 font-body text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
            Transparent starting packages crafted for every stage of your digital journey.
            Zero hidden costs, rigorous production quality, and direct developer communication.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch mb-10 sm:mb-12">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl glass-panel p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? 'border-[#FF1053] bg-white/[0.06] shadow-[0_15px_50px_rgba(230,0,76,0.3)] lg:-translate-y-2'
                    : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03] hover:-translate-y-1'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-7 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white text-[10px] font-tech font-bold uppercase tracking-widest shadow-[0_4px_15px_rgba(230,0,76,0.5)] flex items-center space-x-1.5">
                    {pkg.isPopular && <Crown className="w-3 h-3 text-amber-300" />}
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {/* Visual Emblem Graphic */}
                  <div className="mb-4 overflow-hidden">
                    {getPackageEmblem(pkg.id)}
                  </div>

                  {/* Package Top: Name & Tier Identification */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-tech text-[10px] text-[#FF1053] uppercase tracking-widest font-bold block mb-0.5">
                        {pkg.tierNumber} • {pkg.tierSubtitle}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* Starting Price Box */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-white/50 block mb-0.5">
                      STARTING FROM
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight text-glow-pink">
                        {pkg.startingPrice}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-white/60 mt-1 block">
                      {pkg.priceNote}
                    </span>
                  </div>

                  {/* Value Proposition */}
                  <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed mb-5 font-normal min-h-[40px]">
                    {pkg.valueProposition}
                  </p>

                  {/* Included Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-[10px] font-tech uppercase tracking-widest text-[#FF1053] font-bold mb-2">
                      WHAT'S INCLUDED:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <div className="mt-0.5 p-1 rounded-full bg-[#E6004C]/20 text-[#FF1053] shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-body text-xs sm:text-sm text-white/85 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA: WhatsApp Connect / Inquiry */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={getWhatsAppLink(pkg.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_25px_rgba(230,0,76,0.45)] hover:shadow-[0_0_35px_rgba(230,0,76,0.7)] hover:scale-[1.02] active:scale-95'
                        : 'glass-panel border border-white/20 text-white hover:border-[#FF1053] hover:bg-[#FF1053]/15 hover:text-white'
                    }`}
                    aria-label={`Inquire about ${pkg.name} package on WhatsApp`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>{pkg.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full mt-2 text-center text-[11px] font-tech text-white/50 hover:text-white transition-colors"
                    >
                      or submit custom enquiry form
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CUSTOM REQUIREMENTS & BESPOKE QUOTATIONS BANNER */}
        <div className="relative rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl">
          <div
            className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#FF1053]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center space-x-2 text-[#FF1053] font-tech text-xs uppercase tracking-wider font-bold">
                <HelpCircle className="w-4 h-4" />
                <span>HAVE SPECIFIC ARCHITECTURAL REQUIREMENTS?</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Custom Requirements & Bespoke Quotations
              </h3>

              <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed">
                Every enterprise has unique needs. Final pricing varies depending on:
              </p>

              {/* Requirement bullet chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {CUSTOM_REQUIREMENTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center space-x-2 text-xs font-tech text-white/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="font-editorial text-xs sm:text-sm text-white/90 pt-1">
                "Contact Eclipto for a customized quotation tailored to your exact architectural scope."
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center w-full">
              <a
                href={getWhatsAppLink(
                  'Hi Parvez, I would like to request a customized quotation for a bespoke website project.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_25px_rgba(230,0,76,0.45)] hover:shadow-[0_0_35px_rgba(230,0,76,0.7)] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>REQUEST CUSTOM QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={CONTACT_CONFIG.phone.telLink}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl glass-panel border border-white/20 text-white hover:border-[#FF1053] text-xs font-display font-bold tracking-widest uppercase transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF1053]" />
                <span>CALL: {CONTACT_CONFIG.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
