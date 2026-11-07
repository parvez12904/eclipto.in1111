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
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-32 sm:pb-20 md:py-36">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          
          {/* Small Technical Label */}
          <div className="inline-flex items-center space-x-2.5 px-3 sm:px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-4 sm:mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E6004C] shadow-[0_0_8px_#E6004C] animate-pulse" />
            <span className="font-tech text-[#E6004C] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              DIGITAL EXPERIENCES
            </span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/60 text-[10px] sm:text-[11px] font-tech tracking-wider">
              EST. 2026
            </span>
          </div>

          {/* Main Headline: Bold Sans + Elegant Italic Serif with Text Reveal */}
          <h1 className="hero-headline mb-5 sm:mb-7 text-balance drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] animate-headline-reveal">
            <span className="block font-display font-black text-white uppercase tracking-[-0.035em]">
              WE BUILD
            </span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink animate-shimmer-gradient pb-1">
              WHAT'S NEXT.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-white/80 font-body font-normal leading-relaxed mb-8 sm:mb-10 tracking-wide">
            We create powerful websites, intelligent software, and AI-powered
            experiences that help businesses move forward.
          </p>

          {/* Buttons: LET'S BUILD SOMETHING & EXPLORE OUR WORK */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-display font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_35px_rgba(230,0,76,0.45)] hover:shadow-[0_0_50px_rgba(230,0,76,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2.5 w-full sm:w-auto"
            >
              <span>LET'S BUILD SOMETHING</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={() => onNavigate('work')}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-white/90 glass-panel border border-white/20 hover:border-white/40 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>EXPLORE OUR WORK</span>
            </button>
          </div>

          {/* Trust Proof Micro-Badges */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-8 lg:gap-10 text-white/60">
            <div className="flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-[#FF1053] shrink-0" />
              <span className="font-tech text-[11px] sm:text-xs tracking-wider text-white/80">
                AWWWARDS / FWA / RED DOT
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Zap className="w-4 h-4 text-[#E6004C] shrink-0" />
              <span className="font-tech text-[11px] sm:text-xs tracking-wider text-white/80">
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
