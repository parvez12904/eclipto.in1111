import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Play, Award, Zap } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenVideoModal,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Update live UTC agency clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none blur-[120px] opacity-40 animate-pulse-glow"
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
              videoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          >
            <source
              src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/bg-red-ball.mp4"
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

      {/* 4. HERO CONTENT: RESPONSIVE 12-COLUMN DESKTOP LAYOUT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT: 7 Columns (Engineered with balanced positioning framing the red sphere) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small Technical Label */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E6004C] shadow-[0_0_8px_#E6004C] animate-pulse" />
              <span className="font-tech text-[#E6004C] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                DIGITAL EXPERIENCES
              </span>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-white/60 text-[10px] sm:text-[11px] font-tech tracking-wider">
                EST. 2026
              </span>
            </div>

            {/* Main Headline: Bold Sans + Elegant Italic Serif with Text Reveal */}
            <h1 className="hero-headline mb-7 text-balance drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] animate-headline-reveal">
              <span className="block font-display font-black text-white uppercase tracking-[-0.035em]">
                WE BUILD
              </span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink animate-shimmer-gradient pb-1">
                WHAT'S NEXT.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="max-w-xl text-base sm:text-lg text-white/80 font-body font-normal leading-relaxed mb-10 tracking-wide">
              We create powerful websites, intelligent software, and AI-powered
              experiences that help businesses move forward.
            </p>

            {/* Buttons: LET'S BUILD SOMETHING & EXPLORE OUR WORK */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('contact')}
                className="group relative px-8 py-4 rounded-xl font-display font-bold text-xs sm:text-sm tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_35px_rgba(230,0,76,0.45)] hover:shadow-[0_0_50px_rgba(230,0,76,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2.5"
              >
                <span>LET'S BUILD SOMETHING</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="px-7 py-4 rounded-xl font-display font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-white/90 glass-panel border border-white/20 hover:border-white/40 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>EXPLORE OUR WORK</span>
              </button>
            </div>

            {/* Trust Proof Micro-Badges */}
            <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-wrap items-center gap-6 sm:gap-10 text-white/60">
              <div className="flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-[#FF1053]" />
                <span className="font-tech text-xs tracking-wider text-white/80">
                  AWWWARDS / FWA / RED DOT
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Zap className="w-4 h-4 text-[#E6004C]" />
                <span className="font-tech text-xs tracking-wider text-white/80">
                  &lt; 18MS ULTRA LATENCY
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT: 5 Columns (Frames the center sphere cleanly) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-4 mt-6 lg:mt-0">
            
            {/* Live Agency Telemetry Card */}
            <div className="w-full sm:w-auto min-w-[280px] p-5 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-tech tracking-widest text-white/60 uppercase">
                    SYSTEM STATUS
                  </span>
                </div>
                <span className="text-[10px] font-tech text-emerald-400 font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 font-tech text-xs">
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-white/40">STUDIO UTC</span>
                  <span className="text-white font-semibold">{currentTime || '12:00:00 UTC'}</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-white/40">DEPLOYMENTS</span>
                  <span className="text-[#FF1053] font-bold">140+ ENTERPRISE</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-white/40">SATISFACTION</span>
                  <span className="text-white font-bold">99.8%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-tech tracking-wider text-white/50">
                  INDEX: 01 / 06
                </span>
                <span className="text-[10px] font-tech text-[#E6004C] tracking-widest uppercase">
                  VERIFIED STUDIO
                </span>
              </div>
            </div>

            {/* Quick Interactive Video Reel Trigger Card */}
            {onOpenVideoModal && (
              <button
                onClick={onOpenVideoModal}
                className="group flex items-center space-x-3.5 px-4 py-3 rounded-xl glass-panel border border-white/15 hover:border-[#E6004C] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#E6004C]/20 border border-[#E6004C] flex items-center justify-center text-[#FF1053] group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <div className="text-left font-tech">
                  <div className="text-[11px] font-bold text-white tracking-wider">
                    2026 AGENCY REEL
                  </div>
                  <div className="text-[9px] text-white/50">01:42 MIN • 4K ULTRA HD</div>
                </div>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* 5. BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
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
