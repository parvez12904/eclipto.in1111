import React, { useState } from 'react';
import {
  FolderKanban,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { CLIENT_PROJECTS, PROJECTS } from '../../data/agencyData';

interface ProjectsManagementProps {
  token: string;
}

export const ProjectsManagement: React.FC<ProjectsManagementProps> = () => {
  const [activeCategory, setActiveCategory] = useState<'CLIENTS' | 'CASE_STUDIES'>('CLIENTS');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <FolderKanban className="w-4 h-4" />
            <span>PORTFOLIO & WORK ARCHITECTURE</span>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-tight">
            Portfolio & Projects Management
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-body">
            Manage live client website showcases (Devine Homz, A Tiger Global, Kraftor) and technical case studies.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setActiveCategory('CLIENTS')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              activeCategory === 'CLIENTS'
                ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_15px_rgba(230,0,76,0.4)]'
                : 'glass-panel border border-white/15 text-white/70 hover:text-white'
            }`}
          >
            Client Websites ({CLIENT_PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('CASE_STUDIES')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              activeCategory === 'CASE_STUDIES'
                ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_15px_rgba(230,0,76,0.4)]'
                : 'glass-panel border border-white/15 text-white/70 hover:text-white'
            }`}
          >
            Case Studies ({PROJECTS.length})
          </button>
        </div>
      </div>

      {/* Client Websites List */}
      {activeCategory === 'CLIENTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_PROJECTS.map((site) => (
            <div
              key={site.id}
              className="rounded-3xl glass-panel border border-white/15 bg-white/[0.02] p-6 space-y-4 flex flex-col justify-between hover:border-[#FF1053]/50 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#25D366] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>LIVE IN PRODUCTION</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">{site.year}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#FF1053] uppercase tracking-wider font-bold block mb-1">
                    {site.category}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white">
                    {site.name}
                  </h3>
                  <div className="text-xs font-mono text-white/50 mt-0.5 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-white/40" />
                    <span>{site.displayUrl}</span>
                  </div>
                </div>

                <p className="text-xs text-white/70 font-body leading-relaxed">
                  {site.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {site.keyHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/70"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={site.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(230,0,76,0.3)] hover:shadow-[0_0_25px_rgba(230,0,76,0.6)] transition-all"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Case Studies List */}
      {activeCategory === 'CASE_STUDIES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl glass-panel border border-white/15 bg-white/[0.02] p-6 space-y-4 flex flex-col justify-between hover:border-[#FF1053]/50 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono text-[#FF1053] uppercase tracking-wider font-bold">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">{proj.year}</span>
                </div>

                <div>
                  <h3 className="font-heading font-black text-xl text-white">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-body text-white/60 mt-0.5">
                    {proj.subtitle}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                  <span className="text-white/50 block text-[10px] uppercase">Outcome Metric:</span>
                  <strong className="text-white">{proj.outcome}</strong>
                </div>

                <p className="text-xs text-white/70 font-body leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-center">
                <span className="text-[11px] font-mono text-white/50">
                  Client: {proj.client}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
