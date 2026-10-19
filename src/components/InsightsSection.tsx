import React, { useState } from 'react';
import { INSIGHTS } from '../data/agencyData';
import type { Insight } from '../data/agencyData';
import { ArrowUpRight, Clock, BookOpen, X } from 'lucide-react';

export const InsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Insight | null>(null);

  return (
    <section id="insights" className="relative py-28 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
              <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
                PERSPECTIVES & RESEARCH
              </span>
            </div>
            <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
              <span className="block text-white">AGENCY</span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
                INSIGHTS.
              </span>
            </h2>
            <p className="mt-4 text-white/75 font-body text-sm sm:text-base max-w-xl">
              Original architectural research on WebGPU, generative runtime UI, and
              micro-latency interface engineering.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-tech text-white/50">
            <BookOpen className="w-4 h-4 text-[#FF1053]" />
            <span>PEER-REVIEWED RESEARCH</span>
          </div>
        </div>

        {/* 3 Insight Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              onClick={() => setSelectedArticle(insight)}
              className="group p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#E6004C]/50 hover:bg-white/[0.04] cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-tech mb-6 text-white/50">
                  <span className="px-2.5 py-1 rounded bg-[#E6004C]/15 text-[#FF1053] border border-[#E6004C]/30 font-bold tracking-wider">
                    {insight.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{insight.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors mb-3">
                  {insight.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6">
                  {insight.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-tech text-white/40">
                  {insight.date}
                </span>
                <div className="flex items-center space-x-1 text-xs font-tech font-bold text-[#FF1053] group-hover:text-white transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-white/20 bg-[#080104]/98 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel border border-white/20 text-white/70 hover:text-white hover:border-[#E6004C] transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-white/10 pb-6 mb-8 pr-10">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-tech tracking-widest uppercase bg-[#E6004C]/20 text-[#FF1053] border border-[#E6004C]/30 font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-xs font-tech text-white/50">
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
                {selectedArticle.title}
              </h3>
            </div>

            <div className="prose prose-invert max-w-none text-white/80 space-y-5 text-sm sm:text-base leading-relaxed font-body">
              <p className="font-editorial text-lg text-white/95 leading-normal">
                "{selectedArticle.excerpt}"
              </p>
              <p>{selectedArticle.content}</p>
              <p>
                As we continue to partner with pioneering brands globally, our R&D
                lab open-sources benchmarks and architectural case studies to push the
                entire creative web development community forward.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl font-display text-xs tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
