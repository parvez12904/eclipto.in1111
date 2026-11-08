import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Award, Zap } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';
import { fetchWebsiteContent, DEFAULT_HERO_CONTENT } from '../services/content';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO_CONTENT);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Load dynamic content from database if available
  useEffect(() => {
    let isMounted = true;
    fetchWebsiteContent().then((content) => {
      if (isMounted && content.hero) {
        setHeroContent({
          mainHeading: content.hero.main_heading || DEFAULT_HERO_CONTENT.mainHeading,
          highlightedHeading: content.hero.highlighted_heading || DEFAULT_HERO_CONTENT.highlightedHeading,
          description: content.hero.description || DEFAULT_HERO_CONTENT.description,
          primaryCtaText: content.hero.primary_cta_text || DEFAULT_HERO_CONTENT.primaryCtaText,
          secondaryCtaText: content.hero.secondary_cta_text || DEFAULT_HERO_CONTENT.secondaryCtaText,
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#080104]"
    >
      {/* 1. CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Fallback attractive dark crimson background with subtle radial glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, #4a0316 0%, #1f0108 45%, #080104 80%)',
          }}
        />

        {/* Central ambient red glow aura behind the sphere */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[550px] sm:h-[550px] rounded-full pointer-events-none blur-[90px] sm:blur-[120px] opacity-40 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, #E6004C 0%, #FF1053 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* HTML5 Background Video */}
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
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-95' : 'opacity-0'
            }`}
          >
            <source
              src="https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4"
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {/* 2. CINEMATIC RADIAL VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 z-1 pointer-events-none hero-vignette"
        aria-hidden="true"
      />

      {/* Top & Bottom Seamless Dissolving Gradients */}
      <div
        className="absolute inset-0 z-2 pointer-events-none hero-vertical-fade"
        aria-hidden="true"
      />

      {/* Subtle Ambient Grid Layer */}
      <div
        className="absolute inset-0 z-2 pointer-events-none bg-subtle-grid opacity-25"
        aria-hidden="true"
      />

      {/* 3. HTML5 CANVAS PARTICLES OVERLAY (~65 particles, non-blocking) */}
      <ParticleCanvas />

      {/* 4. HERO CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-12 sm:pt-32 sm:pb-20 md:py-36">
        {/* Soft directional scrim to guarantee 100% legibility against the 3D mascot video */}
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left relative p-3.5 sm:p-6 md:p-8 sm:-ml-6 md:-ml-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#080104]/90 via-[#080104]/60 to-transparent backdrop-blur-[2px] w-full">
          
          {/* Small Technical Label */}
          <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/40 mb-3.5 sm:mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(230,0,76,0.2)]">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E6004C] shadow-[0_0_8px_#E6004C] animate-pulse" />
            <span className="font-tech text-[#FF1053] text-[9.5px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em]">
              DIGITAL EXPERIENCES
            </span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/70 text-[9.5px] sm:text-[11px] font-tech tracking-wider">
              EST. 2026
            </span>
          </div>

          {/* Main Headline: Bold Sans + Elegant Italic Serif with Text Reveal */}
          <h1 className="hero-headline mb-4 sm:mb-6 text-balance drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] animate-headline-reveal">
            <span className="block font-display font-black text-white uppercase tracking-[-0.035em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {heroContent.mainHeading}
            </span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF3366] via-[#FF1053] to-[#FF6B8B] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,16,83,0.55)] pb-1">
              {heroContent.highlightedHeading}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-xl text-[13px] sm:text-base md:text-lg text-white/90 font-body font-normal leading-relaxed mb-6 sm:mb-10 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {heroContent.description}
          </p>

          {/* Buttons: LET'S BUILD SOMETHING & EXPLORE OUR WORK */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl font-display font-bold text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_35px_rgba(230,0,76,0.45)] hover:shadow-[0_0_50px_rgba(230,0,76,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto text-center"
            >
              <span>{heroContent.primaryCtaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('work')}
              className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase text-white/90 glass-panel border border-white/20 hover:border-white/40 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto text-center"
            >
              <span>{heroContent.secondaryCtaText}</span>
            </button>
          </div>

          {/* Trust Proof Micro-Badges */}
          <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-8 lg:gap-10 text-white/60">
            <div className="flex items-center space-x-2">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1053] shrink-0" />
              <span className="font-tech text-[10px] sm:text-xs tracking-wider text-white/80">
                AWWWARDS / FWA / RED DOT
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6004C] shrink-0" />
              <span className="font-tech text-[10px] sm:text-xs tracking-wider text-white/80">
                &lt; 18MS ULTRA LATENCY
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM SCROLL INDICATOR (TABLET / DESKTOP ONLY) */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
        <button
          onClick={() => onNavigate('services')}
          className="pointer-events-auto flex flex-col items-center space-y-2 group focus:outline-none"
          aria-label="Scroll down to services section"
        >
          <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors">
            SCROLL TO DISCOVER
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[#E6004C] transition-colors">
            <span className="w-1.5 h-2 rounded-full bg-[#FF1053] animate-bounce shadow-[0_0_8px_#FF1053]" />
          </div>
        </button>
      </div>
    </section>
  );
};
