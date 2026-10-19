import React from 'react';
import { PROCESS_STEPS } from '../data/agencyData';
import { CheckCircle2, Terminal } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header (STEP 4) */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
            <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
              04 / HOW WE WORK
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">FROM FIRST THOUGHT</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              TO FINAL EXPERIENCE.
            </span>
          </h2>

          <p className="mt-5 text-white/75 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            A battle-tested 4-phase engineering pipeline that transforms visionary
            ambition into bulletproof, high-conversion digital reality.
          </p>
        </div>

        {/* 4-Phase Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="group relative p-7 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-[#E6004C]/60 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#FF1053]">
                    {step.step}
                  </span>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-white/40">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <div className="text-xs font-tech text-[#E6004C] tracking-wide mb-4">
                  {step.subtitle}
                </div>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6">
                  {step.description}
                </p>
              </div>

              {/* Step Sub-points */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {step.details.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1053] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-xs text-white/80 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Bottom Workflow Guarantee */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#E6004C]/20 border border-[#E6004C]/50 flex items-center justify-center text-[#FF1053] flex-shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">
                HIGH-FREQUENCY AGILE VELOCITY
              </div>
              <p className="font-body text-xs sm:text-sm text-white/60">
                Weekly staging builds, synchronized repositories, and dedicated client communication channels.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-display text-xs font-bold tracking-widest uppercase glass-panel border border-white/20 hover:border-[#E6004C] text-white flex-shrink-0 transition-colors"
          >
            START A PROJECT
          </a>
        </div>

      </div>
    </section>
  );
};
