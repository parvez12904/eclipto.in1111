import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import {
  ArrowUpRight,
  Check,
  Code2,
  Cpu,
  MonitorPlay,
  MessageSquare,
  Palette,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website-development':
        return <MonitorPlay className="w-5 h-5 text-[#FF1053]" />;
      case 'custom-software':
        return <Code2 className="w-5 h-5 text-[#FF1053]" />;
      case 'ai-automation':
        return <Cpu className="w-5 h-5 text-[#FF1053]" />;
      case 'whatsapp-automation':
        return <MessageSquare className="w-5 h-5 text-[#25D366]" />;
      case 'branding-design':
        return <Palette className="w-5 h-5 text-[#FF1053]" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-[#FF1053]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#FF1053]" />;
    }
  };

  const activeService =
    SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header (STEP 4) */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
            <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
              01 / WHAT WE DO
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">BIG IDEAS.</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              BEAUTIFULLY BUILT.
            </span>
          </h2>

          <p className="mt-5 text-white/75 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            We partner with ambitious founders and established enterprises to
            engineer custom digital ecosystems that accelerate market leadership.
          </p>
        </div>

        {/* 6 Services Grid (STEP 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => {
            const isActive = activeServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative p-7 rounded-2xl glass-panel transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden border ${
                  isActive
                    ? 'border-[#E6004C] bg-white/[0.06] shadow-[0_10px_35px_rgba(230,0,76,0.25)] -translate-y-1'
                    : 'border-white/10 hover:border-[#E6004C]/50 hover:bg-white/[0.03] hover:-translate-y-1'
                }`}
              >
                {/* Subtle corner aura on hover */}
                <div
                  className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#E6004C]/10 blur-2xl group-hover:bg-[#FF1053]/20 transition-all pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* Card Header: Icon, Number & Small Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#E6004C]/40 group-hover:scale-105 transition-all">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="font-tech text-xs text-[#E6004C] font-bold">
                        {service.num}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#E6004C] text-white shadow-[0_0_12px_#E6004C]'
                          : 'border border-white/15 text-white/40 group-hover:text-white group-hover:border-[#E6004C]'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bold Readable Service Title */}
                  <h3 className="font-display text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="font-body text-sm text-white/70 leading-relaxed font-normal mb-5 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom: Metric Highlight */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-tech text-[10px] uppercase tracking-wider text-white/50">
                    IMPACT BENCHMARK
                  </span>
                  <span className="font-tech text-xs font-semibold text-[#FF1053]">
                    {service.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detail Feature Banner */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div
            className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-[#E6004C]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center space-x-3.5">
              <div className="p-3.5 rounded-2xl bg-[#E6004C]/15 border border-[#E6004C]/30 text-[#FF1053]">
                {getServiceIcon(activeService.id)}
              </div>
              <div>
                <span className="font-tech text-xs text-[#E6004C] tracking-widest uppercase font-bold">
                  FOCUS // {activeService.num}
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {activeService.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-tech tracking-wider uppercase bg-[#FF1053]/15 text-[#FF1053] border border-[#FF1053]/30 font-bold">
                {activeService.metrics}
              </span>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] transition-all"
              >
                <span>REQUEST BRIEF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="font-editorial text-lg sm:text-xl text-white/90 mb-6 font-normal">
            "{activeService.headline}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {activeService.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start space-x-2.5"
              >
                <div className="mt-0.5 p-1 rounded-full bg-[#E6004C]/20 text-[#FF1053] flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-body text-xs sm:text-sm text-white/85 font-medium">
                  {deliv}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
