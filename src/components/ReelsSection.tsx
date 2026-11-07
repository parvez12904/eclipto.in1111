import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Heart,
  X,
  ExternalLink,
} from 'lucide-react';
import { fetchInstagramReels, type ReelItem } from '../services/instagram';
import { CONTACT_CONFIG } from '../config/contact';

// Official Instagram Brand Icon
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const ReelsSection: React.FC = () => {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
  const [isModalMuted, setIsModalMuted] = useState<boolean>(false);
  const [isModalPlaying, setIsModalPlaying] = useState<boolean>(true);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Smooth scroll entrance observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch reels data from backend / resilient client fallback
  useEffect(() => {
    let isMounted = true;
    fetchInstagramReels()
      .then((data) => {
        if (isMounted) {
          setReels(data.reels);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Carousel smooth scroll navigation
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 280;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setIsModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setIsModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsModalMuted(modalVideoRef.current.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="relative py-14 sm:py-16 md:py-20 bg-[#080104] z-10 overflow-hidden border-t border-white/10"
      aria-label="Instagram Showcase and Creative Motion Reels"
    >
      {/* 1. COMPACT BACKGROUND ACCENTS & DEPTH */}
      <div className="absolute inset-0 bg-subtle-grid opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Scaled-down ambient radial glows */}
      <div
        className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#E6004C]/12 blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-28 w-96 h-96 rounded-full bg-[#FF1053]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Refined subtle orbital wireframe accent */}
      <div
        className="absolute top-12 right-12 w-52 h-52 rounded-full border border-white/5 opacity-25 pointer-events-none hidden lg:flex items-center justify-center animate-float-slow"
        aria-hidden="true"
      >
        <div
          className="w-36 h-36 rounded-full border border-dashed border-[#FF1053]/25 animate-spin"
          style={{ animationDuration: '45s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* 2. REFINED COMPACT HEADER WITH PROPORTIONATE TYPOGRAPHY */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl space-y-2.5">
            {/* Tag Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#E6004C]/35 shadow-[0_0_15px_rgba(230,0,76,0.15)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1053] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1053]" />
              </span>
              <span className="font-tech text-[#FF1053] text-[10px] uppercase tracking-[0.22em] font-bold">
                02 / INSTAGRAM SHOWCASE
              </span>
              <span className="text-white/30 text-[9px]">•</span>
              <span className="font-tech text-white/75 text-[10px] tracking-wider">
                {CONTACT_CONFIG.instagram.display}
              </span>
            </div>

            {/* Proportionate Creative Headline */}
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.08] uppercase text-white">
              <span>CREATING. </span>
              <span className="font-editorial font-normal italic tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
                INSPIRING.
              </span>
              <span className="block sm:inline sm:ml-2">MOVING.</span>
            </h2>

            {/* Concise Subtitle */}
            <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed max-w-xl font-normal">
              Fresh motion studies, 60FPS WebGL visualizers, and digital product experiments curated
              directly from the{' '}
              <span className="text-white font-semibold underline decoration-[#FF1053] decoration-1 underline-offset-2">
                {CONTACT_CONFIG.instagram.display}
              </span>{' '}
              design laboratory.
            </p>
          </div>

          {/* Action Header Controls: Compact Follow Button & Navigation Arrows */}
          <div className="flex items-center space-x-3 self-start md:self-end pt-1">
            <a
              href={CONTACT_CONFIG.instagram.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4.5 py-2.5 rounded-full text-[11px] font-display font-bold tracking-[0.14em] uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.35)] hover:shadow-[0_0_28px_rgba(230,0,76,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 group"
              aria-label={`Follow ${CONTACT_CONFIG.instagram.display} on Instagram`}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-white transition-transform group-hover:rotate-12" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Slider Navigation Arrows (Desktop / Tablet) */}
            <div className="hidden sm:flex items-center space-x-1.5">
              <button
                onClick={() => handleScroll('left')}
                className="w-9 h-9 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#FF1053] hover:bg-white/[0.08] active:scale-90 transition-all focus:outline-none"
                aria-label="Previous reels"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-9 h-9 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#FF1053] hover:bg-white/[0.08] active:scale-90 transition-all focus:outline-none"
                aria-label="Next reels"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. COMPACT REELS CAROUSEL */}
        {loading ? (
          /* Loading Skeleton */
          <div className="flex gap-4 sm:gap-5 overflow-hidden py-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-[200px] sm:w-[220px] md:w-[240px] aspect-[9/15.5] rounded-2xl glass-panel border border-white/10 shrink-0 animate-pulse bg-white/[0.03] p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-white/10 rounded-full" />
                  <div className="h-4 w-12 bg-white/10 rounded-full" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto" />
                <div className="space-y-2">
                  <div className="h-3 w-3/4 bg-white/10 rounded" />
                  <div className="h-2.5 w-1/2 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : reels.length === 0 ? (
          /* Empty State */
          <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/15 text-center my-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(230,0,76,0.35)]">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-1">
              New Reels Coming Soon
            </h3>
            <p className="text-white/70 font-body text-xs max-w-sm mx-auto mb-4 leading-relaxed">
              We are publishing fresh motion experiments weekly. Follow our account to catch every release.
            </p>
            <a
              href={CONTACT_CONFIG.instagram.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white text-[11px] font-bold tracking-wider uppercase"
            >
              <span>VISIT {CONTACT_CONFIG.instagram.display}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          /* Proportionate Interactive Reels Scroller */
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory focus:outline-none scrollbar-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
              tabIndex={0}
              aria-label="Reels list"
            >
              {reels.map((reel, idx) => {
                const isHovered = hoveredReelId === reel.id;
                return (
                  <div
                    key={reel.id}
                    onMouseEnter={() => setHoveredReelId(reel.id)}
                    onMouseLeave={() => setHoveredReelId(null)}
                    onClick={() => setActiveModalReel(reel)}
                    className="group relative w-[205px] sm:w-[225px] md:w-[245px] lg:w-[255px] aspect-[9/15.5] shrink-0 snap-center rounded-2xl glass-panel border border-white/15 hover:border-[#FF1053] overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(230,0,76,0.35)] flex flex-col justify-between cursor-pointer"
                  >
                    {/* Visual Media Background */}
                    <div className="absolute inset-0 z-0 bg-[#080104] overflow-hidden">
                      {reel.mediaUrl ? (
                        <video
                          src={reel.mediaUrl}
                          poster={reel.thumbnailUrl}
                          playsInline
                          muted
                          loop
                          autoPlay={isHovered}
                          preload="metadata"
                          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <img
                          src={reel.thumbnailUrl}
                          alt={reel.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                      )}

                      {/* Multi-layered cinematic vignette overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080104] via-[#080104]/50 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#080104]/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-[#E6004C]/0 group-hover:bg-[#E6004C]/10 transition-colors duration-400 pointer-events-none" />
                    </div>

                    {/* TOP CARD BAR */}
                    <div className="relative z-10 p-3.5 flex items-center justify-between">
                      {/* Reel Index Tag */}
                      <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF1053] animate-pulse" />
                        <span className="text-[9px] font-tech text-white font-bold uppercase tracking-wider">
                          REEL 0{idx + 1}
                        </span>
                      </div>

                      {/* Views badge */}
                      {reel.views && (
                        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90 text-[9px] font-tech">
                          <Eye className="w-3 h-3 text-[#FF1053]" />
                          <span className="font-semibold">{reel.views}</span>
                        </div>
                      )}
                    </div>

                    {/* CENTER PLAY BUTTON */}
                    <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute -inset-2 rounded-full bg-[#FF1053]/20 group-hover:bg-[#FF1053]/40 blur-sm group-hover:scale-120 transition-all duration-400" />
                        <div className="relative w-11 h-11 rounded-full bg-black/75 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-[0_0_20px_rgba(230,0,76,0.3)] group-hover:bg-[#E6004C] group-hover:border-[#FF1053] group-hover:scale-108 transition-all duration-300">
                          <Play className="w-4 h-4 ml-0.5 fill-current transition-transform group-hover:scale-105" />
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM CARD CONTENT */}
                    <div className="relative z-10 p-3.5 sm:p-4 space-y-2">
                      {/* Audio visualizer bar ticker */}
                      <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/15">
                        <div className="flex items-end space-x-0.5 h-2.5 shrink-0">
                          <span className="w-0.5 bg-[#FF1053] rounded-full animate-equalizer-1" />
                          <span className="w-0.5 bg-[#FF1053] rounded-full animate-equalizer-2" />
                          <span className="w-0.5 bg-[#FF1053] rounded-full animate-equalizer-3" />
                          <span className="w-0.5 bg-[#FF1053] rounded-full animate-equalizer-4" />
                        </div>
                        <span className="text-[9px] font-tech text-[#FF1053] tracking-wider truncate font-semibold">
                          {reel.audioTrack || 'Original Audio • @eclipto_.in'}
                        </span>
                      </div>

                      {/* Reel Title */}
                      <h3 className="font-display text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-glow-pink transition-all">
                        {reel.title}
                      </h3>

                      {/* Reel Caption Snippet */}
                      <p className="font-body text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                        {reel.caption}
                      </p>

                      {/* Card Bottom: Likes Count & "WATCH REEL" Button */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                        {reel.likes ? (
                          <div className="flex items-center space-x-1 text-white/75 font-tech text-[10px]">
                            <Heart className="w-3 h-3 text-[#FF1053] fill-current" />
                            <span>{reel.likes}</span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-tech text-white/50">4K 60FPS</span>
                        )}

                        <a
                          href={reel.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-1 text-[10px] font-tech font-bold text-white py-1 px-2.5 rounded-md bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#E6004C] hover:to-[#FF1053] border border-white/15 hover:border-[#FF1053] transition-all"
                          aria-label={`View ${reel.title} on Instagram`}
                        >
                          <span>WATCH</span>
                          <ArrowUpRight className="w-2.5 h-2.5 text-[#FF1053] group-hover:text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile swipe helper indicator */}
            <div className="sm:hidden flex items-center justify-center space-x-2 mt-3 text-[10px] font-tech text-white/50">
              <span className="inline-block w-6 h-[1px] bg-white/20" />
              <span className="tracking-wider uppercase">SWIPE TO EXPLORE</span>
              <span className="inline-block w-6 h-[1px] bg-white/20" />
            </div>
          </div>
        )}

        {/* 4. SLEEK & COMPACT INSTAGRAM COMMUNITY BANNER (FEATURE 5) */}
        <div className="mt-8 sm:mt-10 relative rounded-2xl glass-panel border border-white/15 p-5 sm:p-6 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Subtle inner ambient glow */}
          <div
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#E6004C]/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Avatar & Info */}
            <div className="flex items-center space-x-4">
              {/* Instagram Gradient Logo Disc */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 shadow-[0_0_20px_rgba(220,39,67,0.35)]">
                  <div className="w-full h-full rounded-[10px] bg-[#080104] flex items-center justify-center">
                    <InstagramIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] border border-[#080104]" />
              </div>

              {/* Text Info */}
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-tech uppercase tracking-[0.18em] text-[#FF1053] font-bold">
                    FOLLOW OUR JOURNEY
                  </span>
                  <span className="text-white/30 text-[9px]">•</span>
                  <span className="text-[10px] font-mono text-emerald-400">STUDIO FEED</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                  {CONTACT_CONFIG.instagram.display}
                </h3>

                <p className="font-body text-xs text-white/70 max-w-md leading-relaxed hidden sm:block">
                  Behind-the-scenes engineering breakdowns and WebGL motion studies published weekly.
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3 self-start lg:self-center w-full sm:w-auto">
              <a
                href={CONTACT_CONFIG.instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.35)] hover:shadow-[0_0_28px_rgba(230,0,76,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-white transition-transform group-hover:scale-110" />
                <span>FOLLOW ON INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={CONTACT_CONFIG.instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl glass-panel border border-white/20 text-white hover:border-[#FF1053] text-xs font-display font-medium tracking-wide uppercase transition-all"
              >
                <span>OPEN APP</span>
                <ExternalLink className="w-3 h-3 text-white/60" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE FULL-SCREEN MODAL PREVIEW */}
      {activeModalReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Reel player modal"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-sm max-h-[88vh] aspect-[9/16] rounded-2xl glass-panel border border-white/20 bg-[#080104] overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.98)] animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
            {/* Modal Controls Header */}
            <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20">
                <InstagramIcon className="w-3 h-3 text-[#FF1053]" />
                <span className="text-[10px] font-tech text-white font-bold">
                  {CONTACT_CONFIG.instagram.display}
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={toggleModalMute}
                  className="p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:border-[#FF1053] transition-colors"
                  aria-label={isModalMuted ? 'Unmute' : 'Mute'}
                >
                  {isModalMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setActiveModalReel(null)}
                  className="p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:border-[#FF1053] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div
              className="absolute inset-0 z-0 bg-black cursor-pointer"
              onClick={toggleModalPlay}
            >
              <video
                ref={modalVideoRef}
                src={activeModalReel.mediaUrl}
                poster={activeModalReel.thumbnailUrl}
                autoPlay
                playsInline
                loop
                muted={isModalMuted}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080104] via-[#080104]/30 to-transparent pointer-events-none" />

              {!isModalPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 rounded-full bg-[#E6004C] text-white flex items-center justify-center shadow-[0_0_30px_rgba(230,0,76,0.9)]">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Info */}
            <div className="relative z-10 p-4 space-y-2 mt-auto pointer-events-auto">
              <div className="flex items-center justify-between text-[11px] font-tech text-white/70">
                <span>{activeModalReel.views ? `${activeModalReel.views} views` : 'Eclipto Motion'}</span>
                <span>{activeModalReel.likes ? `${activeModalReel.likes} likes` : ''}</span>
              </div>

              <h4 className="font-display text-base font-bold text-white line-clamp-1">
                {activeModalReel.title}
              </h4>

              <p className="font-body text-[11px] text-white/80 max-h-16 overflow-y-auto leading-relaxed">
                {activeModalReel.caption}
              </p>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                <button
                  onClick={toggleModalPlay}
                  className="text-[11px] font-tech text-white/70 hover:text-white flex items-center space-x-1"
                >
                  {isModalPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isModalPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <a
                  href={activeModalReel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white text-[11px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(230,0,76,0.5)]"
                >
                  <span>OPEN ON INSTAGRAM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
