import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { ShieldCheck, Zap, Eye, Compass, Award, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '$420M+', label: 'ENTERPRISE VALUE CREATED', sub: 'Across client platforms' },
    { value: '48+', label: 'GLOBAL DESIGN AWARDS', sub: 'Awwwards, FWA, Red Dot' },
    { value: '99.8%', label: 'SYSTEM RELIABILITY SLA', sub: 'Zero-downtime standard' },
    { value: '< 18MS', label: 'EDGE INTERACTION LATENCY', sub: 'Locked 60fps refresh' },
  ];

  const values = [
    {
      icon: <Zap className="w-5 h-5 text-[#FF1053]" />,
      num: '01',
      title: 'RADICAL VELOCITY',
      desc: 'We obsess over render cycles, memory allocation, and bundle sizes. Every micro-interaction is tuned for instantaneous feedback.',
    },
    {
      icon: <Eye className="w-5 h-5 text-[#FF1053]" />,
      num: '02',
      title: 'KINETIC ELEGANCE',
      desc: 'Interfaces should feel alive. We choreograph light, depth, and spatial motion to establish immediate emotional resonance with your audience.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FF1053]" />,
      num: '03',
      title: 'ZERO-COMPROMISE CODE',
      desc: 'No generic templates. No brittle plugins. We write modular, strictly typed, self-documenting code built for decades of maintainability.',
    },
    {
      icon: <Compass className="w-5 h-5 text-[#FF1053]" />,
      num: '04',
      title: 'STRATEGIC DOMINANCE',
      desc: 'Aesthetics without conversion is vanity. We align high-concept digital art directly with measurable business acceleration.',
    },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      {/* Background radial gradient glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E6004C]/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header (STEP 4) */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
            <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
              02 / THE ECLIPTO APPROACH
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">TECHNOLOGY WITH</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              A HUMAN TOUCH.
            </span>
          </h2>

          <p className="mt-5 text-white/75 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            We design and engineer digital instruments that solve complex problems
            with brutal efficiency while eliciting deep emotional delight.
          </p>
        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/10 hover:border-[#E6004C]/50 transition-all duration-300"
            >
              <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-glow-red mb-2">
                {stat.value}
              </div>
              <div className="font-tech text-xs font-bold text-white/80 tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-tech text-white/40">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Core Values Grid */}
        <div className="mb-24">
          <div className="text-xs font-tech uppercase tracking-widest text-[#E6004C] font-semibold mb-6">
            OUR OPERATING PRINCIPLES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.num}
                className="p-7 rounded-2xl glass-panel border border-white/10 hover:border-[#E6004C]/50 hover:bg-white/[0.04] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#E6004C]/40 group-hover:scale-105 transition-all">
                      {val.icon}
                    </div>
                    <span className="font-tech text-xs text-white/30 font-bold">
                      {val.num}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2">
                    {val.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Recognition & Quotes */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-tech uppercase tracking-widest text-[#FF1053] font-bold">
                TESTIMONIALS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                PRAISE FROM VISIONARY CLIENTS
              </h3>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-white/50 text-xs font-tech">
              <Award className="w-4 h-4 text-[#FF1053]" />
              <span>INDUSTRY RECOGNIZED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#E6004C]/40 mb-4" />
                  <p className="font-body text-sm text-white/80 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center space-x-3.5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#E6004C]/40"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-xs font-display font-bold text-white tracking-wide">
                      {t.author}
                    </div>
                    <div className="text-[11px] font-tech text-white/50">
                      {t.title}, <span className="text-[#FF1053]">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
