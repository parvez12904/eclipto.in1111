import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Award, Zap } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure video plays programmatically if autoplay was throttled
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] lg:min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#080104] pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-20"
    >
      {/* 1. AMBIENT BACKGROUND GLOW & RADIAL BACKDROPS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Soft radial atmospheric backdrop */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 45%, #2a020d 0%, #120106 45%, #080104 85%)',
          }}
        />

        {/* Central ambient red glow aura behind the visual center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] rounded-full pointer-events-none blur-[80px] sm:blur-[110px] opacity-45 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, #E6004C 0%, #FF1053 35%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Top & Bottom seamless gradient dissolves */}
        <div
          className="absolute inset-0 z-2 hero-vertical-fade"
          aria-hidden="true"
        />

        {/* Subtle Ambient Grid Layer */}
        <div
          className="absolute inset-0 z-2 bg-subtle-grid opacity-20"
          aria-hidden="true"
        />
      </div>

      {/* 2. HTML5 CANVAS PARTICLES OVERLAY */}
      <ParticleCanvas />

      {/* 3. HERO CONTENT: BALANCED 12-COLUMN RESPONSIVE LAYOUT (1440px Primary Reference) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-4 sm:py-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & ACTIONS (7 cols on lg/xl) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            
            {/* Small Technical Label */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#E6004C]/35 mb-3 sm:mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] shadow-[0_0_8px_#E6004C] animate-pulse" />
              <span className="font-tech text-[#E6004C] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
                DIGITAL EXPERIENCES
              </span>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-white/60 text-[10px] sm:text-[11px] font-tech tracking-wider">
                EST. 2026
              </span>
            </div>

            {/* Main Headline: Bold Sans + Elegant Italic Serif with Text Reveal */}
            <h1 className="hero-headline mb-3 sm:mb-4 text-balance drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] animate-headline-reveal">
              <span className="block font-display font-black text-white uppercase tracking-[-0.03em]">
                WE BUILD
              </span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink animate-shimmer-gradient pb-0.5">
                WHAT'S NEXT.
              </span>
            </h1>

            {/* Supporting Text — Optimized line length and typography */}
            <p className="max-w-xl text-xs sm:text-sm md:text-base text-white/80 font-body font-normal leading-relaxed mb-6 sm:mb-8 tracking-wide">
              We create powerful websites, intelligent software, and AI-powered
              experiences that help businesses move forward.
            </p>

            {/* Buttons: LET'S BUILD SOMETHING & EXPLORE OUR WORK */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('contact')}
                className="group relative px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-display font-bold text-xs sm:text-[13px] tracking-[0.14em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_28px_rgba(230,0,76,0.4)] hover:shadow-[0_0_42px_rgba(230,0,76,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>LET'S BUILD SOMETHING</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-semibold text-xs sm:text-[13px] tracking-[0.14em] uppercase text-white/90 glass-panel border border-white/20 hover:border-white/40 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>EXPLORE OUR WORK</span>
              </button>
            </div>

            {/* Trust Proof Micro-Badges */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/10 w-full flex flex-wrap items-center gap-4 sm:gap-6 text-white/60">
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-[#FF1053] shrink-0" />
                <span className="font-tech text-[10px] sm:text-[11px] tracking-wider text-white/80">
                  AWWWARDS / FWA / RED DOT
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-[#E6004C] shrink-0" />
                <span className="font-tech text-[10px] sm:text-[11px] tracking-wider text-white/80">
                  &lt; 18MS ULTRA LATENCY
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D CHARACTER / VIDEO VISUAL (5 cols on lg/xl) */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px] aspect-square flex items-center justify-center">
              
              {/* Character Backlight Aura */}
              <div
                className="absolute inset-4 rounded-full blur-[50px] sm:blur-[70px] lg:blur-[90px] opacity-45 animate-pulse-glow pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #E6004C 0%, #FF1053 35%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Decorative Subtle Orbit Rings */}
              <div
                className="absolute inset-0 rounded-full border border-white/10 opacity-30 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-6 rounded-full border border-[#E6004C]/20 opacity-40 pointer-events-none"
                aria-hidden="true"
              />

              {/* 3D Character Video Player — Fully Contained with Radial Vignette Soft-Edge */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                {!videoError && (
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                    className={`w-full h-full object-contain transition-opacity duration-700 ${
                      videoLoaded ? 'opacity-95' : 'opacity-0'
                    }`}
                    style={{
                      maskImage: 'radial-gradient(circle at center, black 65%, transparent 98%)',
                      WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 98%)',
                    }}
                  >
                    <source
                      src="https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4"
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. BOTTOM SCROLL INDICATOR (TABLET / DESKTOP ONLY) */}
      <div className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
        <button
          onClick={() => onNavigate('reels')}
          className="pointer-events-auto flex flex-col items-center space-y-1.5 group focus:outline-none"
          aria-label="Scroll down to reels section"
        >
          <span className="text-[9px] font-tech uppercase tracking-[0.22em] text-white/50 group-hover:text-white transition-colors">
            SCROLL TO DISCOVER
          </span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[#E6004C] transition-colors">
            <span className="w-1 h-1.5 rounded-full bg-[#FF1053] animate-bounce shadow-[0_0_6px_#FF1053]" />
          </div>
        </button>
      </div>
    </section>
  );
};
