import React, { useState } from 'react';
import { PROJECTS, CLIENT_PROJECTS } from '../data/agencyData';
import type { Project, ClientProject } from '../data/agencyData';
import {
  ArrowUpRight,
  X,
  Cpu,
  CheckCircle2,
  Layers,
  Globe,
  Lock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const WorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ['ALL', 'WEB & 3D', 'AI SYSTEMS', 'PLATFORMS'];

  const filteredProjects =
    activeFilter === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      {/* Ambient background light */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#E6004C]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#FF1053]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
              <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
                03 / PORTFOLIO & CLIENT WORK
              </span>
            </div>
            <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
              <span className="block text-white">MADE TO MAKE</span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
                AN IMPRESSION.
              </span>
            </h2>
            <p className="mt-4 text-white/75 font-body text-sm sm:text-base max-w-xl">
              Live enterprise client platforms, immersive digital showcases, and
              high-performance web architecture engineered for ambitious organizations.
            </p>
          </div>

          {/* Category Filter Pills for Case Studies */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-tech tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E6004C] text-white shadow-[0_0_20px_rgba(230,0,76,0.5)] font-bold'
                      : 'glass-panel border border-white/15 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. FEATURED LIVE CLIENT WEBSITES (DEVINE HOMZ, A TIGER GLOBAL, KRAFTOR) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#FF1053]" />
              <span className="font-tech text-xs tracking-[0.2em] uppercase text-white font-bold">
                FEATURED CLIENT WEBSITES
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="font-tech text-[11px] text-[#FF1053]">LIVE IN PRODUCTION</span>
            </div>
            <span className="hidden sm:inline-block font-tech text-xs text-white/50">
              OFFICIAL CLIENT DELIVERABLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CLIENT_PROJECTS.map((project: ClientProject, index: number) => (
              <div
                key={project.id}
                className="group relative rounded-3xl glass-panel border border-white/10 hover:border-[#E6004C]/70 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(230,0,76,0.3)] flex flex-col justify-between"
              >
                {/* Browser Window Frame Header */}
                <div className="relative px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                  {/* macOS-style Traffic Lights */}
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>

                  {/* Browser URL Bar Mockup */}
                  <div className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-tech text-white/70 max-w-[125px] sm:max-w-[200px] truncate">
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{project.displayUrl}</span>
                  </div>

                  <span className="text-[10px] font-tech text-white/40">
                    0{index + 1}
                  </span>
                </div>

                {/* Visual Preview Canvas Card */}
                <div
                  className={`relative h-56 sm:h-64 w-full bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}
                >
                  {/* Geometric Background Texture */}
                  <div className="absolute inset-0 bg-subtle-grid opacity-25 pointer-events-none" />

                  {/* Ambient Glow Aura */}
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-[#E6004C]/20 blur-2xl group-hover:bg-[#FF1053]/35 transition-all duration-700 pointer-events-none" />

                  {/* Card Top: Sector & Year */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-tech tracking-widest uppercase bg-black/70 backdrop-blur-md border border-white/15 text-white/90 font-bold">
                      {project.clientSector}
                    </span>
                    <span className="font-tech text-xs text-white/60">
                      {project.year}
                    </span>
                  </div>

                  {/* Card Center: Project Name & Visual Representation */}
                  <div className="relative z-10">
                    <div className="text-[10px] font-tech uppercase tracking-widest text-[#FF1053] font-bold mb-1">
                      {project.category}
                    </div>
                    <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-glow-pink transition-all">
                      {project.name}
                    </div>
                  </div>

                  {/* Card Bottom: Live Badge */}
                  <div className="relative z-10 flex items-center space-x-2 text-[10px] font-tech text-white/70">
                    <Globe className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="text-emerald-400 font-semibold">Active Production URL</span>
                  </div>
                </div>

                {/* Card Body & Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Highlights Chips */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {project.keyHighlights.map((highlight: string, hIdx: number) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-tech tracking-wider bg-white/[0.04] border border-white/10 text-white/80"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Action Button: View Project Live in New Tab */}
                  <div className="pt-2">
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-display text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.35)] hover:shadow-[0_0_30px_rgba(230,0,76,0.65)] active:scale-95 transition-all group/btn"
                      aria-label={`View live website for ${project.name} (opens in new tab)`}
                    >
                      <span>VIEW PROJECT</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DEEP-TECH CASE STUDIES (AETHER AI, KINETIC VELO, SYNTHESIS, ETC.) */}
        <div>
          <div className="flex items-center space-x-2.5 mb-8">
            <Cpu className="w-4 h-4 text-[#FF1053]" />
            <span className="font-tech text-xs tracking-[0.2em] uppercase text-white font-bold">
              DEEP-TECH ARCHITECTURAL CASE STUDIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-3xl glass-panel border border-white/10 hover:border-[#E6004C]/60 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(230,0,76,0.25)] flex flex-col justify-between"
              >
                {/* Visual Mockup Canvas Card */}
                <div
                  className={`relative h-64 sm:h-72 w-full bg-gradient-to-br ${project.imageGradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}
                >
                  {/* Subtle Geometric Graphic Overlay */}
                  <div
                    className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Cybernetic Geometric Ring Art */}
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full border border-white/15 flex items-center justify-center opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 pointer-events-none">
                    <div
                      className="w-44 h-44 rounded-full border border-dashed border-[#FF1053]/40 animate-spin"
                      style={{ animationDuration: '40s' }}
                    />
                    <div className="w-24 h-24 rounded-full bg-[#E6004C]/20 blur-xl" />
                  </div>

                  {/* Card Top: Client & Year */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-tech tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/15 text-white/80">
                      {project.client}
                    </span>
                    <span className="font-tech text-xs font-semibold text-white/50">
                      {project.year}
                    </span>
                  </div>

                  {/* Card Center: Big Stat Metric */}
                  <div className="relative z-10">
                    <div className="text-[10px] font-tech tracking-widest text-white/60 uppercase">
                      {project.featuredStat.label}
                    </div>
                    <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight text-glow-pink">
                      {project.featuredStat.value}
                    </div>
                  </div>

                  {/* Floating Interactive CTA */}
                  <div className="relative z-10 flex items-center justify-between pt-2">
                    <span className="text-[11px] font-tech font-bold tracking-widest uppercase text-[#FF1053] group-hover:text-white transition-colors">
                      VIEW CASE STUDY
                    </span>
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#E6004C] group-hover:border-[#E6004C] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Bottom Body */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-tech text-xs text-[#E6004C] font-semibold">
                        0{idx + 1}
                      </span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-[11px] font-tech text-white/60 tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-white/60 font-medium mb-4">
                      {project.subtitle}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-tech tracking-wider bg-white/[0.04] border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE CASE STUDY MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-white/20 bg-[#080104]/95 p-5 sm:p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full glass-panel border border-white/20 text-white/70 hover:text-white hover:border-[#E6004C] transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-white/10 pb-6 mb-8 pr-12">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-tech tracking-widest uppercase bg-[#E6004C]/20 text-[#FF1053] border border-[#E6004C]/30 font-bold">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-tech text-white/60">
                  {selectedProject.client} • {selectedProject.year}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#FF1053] font-normal mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Impact Metric Hero Banner inside Modal */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#E6004C]/20 to-[#FF1053]/10 border border-[#E6004C]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-tech uppercase tracking-widest text-white/70">
                  MEASURED CLIENT IMPACT
                </span>
                <div className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
                  {selectedProject.outcome}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-tech uppercase tracking-widest text-white/60">
                  BENCHMARK
                </span>
                <div className="font-display font-black text-2xl text-[#FF1053]">
                  {selectedProject.featuredStat.value}
                </div>
              </div>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 rounded-2xl glass-panel border border-white/10">
                <div className="flex items-center space-x-2 text-[#E6004C] font-tech text-xs uppercase tracking-wider font-bold mb-3">
                  <Layers className="w-4 h-4" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-[#FF1053]/30 bg-[#FF1053]/[0.02]">
                <div className="flex items-center space-x-2 text-[#FF1053] font-tech text-xs uppercase tracking-wider font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>THE ECLIPTO SOLUTION</span>
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Technology Architecture Badges */}
            <div className="border-t border-white/10 pt-6">
              <div className="text-xs font-tech uppercase tracking-widest text-white/50 mb-3">
                DEPLOYED ARCHITECTURE & TECH STACK
              </div>
              <div className="flex flex-wrap gap-2.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-tech bg-white/[0.06] border border-white/15 text-white flex items-center space-x-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#FF1053]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 rounded-xl font-display text-xs tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold hover:shadow-[0_0_25px_rgba(230,0,76,0.6)] transition-all"
              >
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
