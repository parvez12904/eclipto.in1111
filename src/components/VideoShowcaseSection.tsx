import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const VIDEO_SOURCE =
  'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4';

interface VideoShowcaseSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Synchronize play state
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Toggle Mute / Sound
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle Native Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const duration = videoRef.current.duration;
    const current = videoRef.current.currentTime;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  // Attempt autoplay safely on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <section
      id="showreel"
      className="relative py-16 sm:py-20 md:py-24 bg-[#080104] z-10 border-t border-white/10 overflow-hidden"
      aria-label="Eclipto Cinematic Brand Film"
    >
      {/* Background ambient radial gradients */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#E6004C]/10 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 top-1/4 w-[400px] h-[400px] rounded-full bg-[#FF1053]/08 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] animate-pulse" />
              <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
                CINEMATIC SHOWCASE // 03
              </span>
            </div>

            <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
              <span className="block text-white">SEE THE VISION</span>
              <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
                IN MOTION.
              </span>
            </h2>

            <p className="mt-4 text-white/75 font-body text-sm sm:text-base leading-relaxed max-w-xl">
              Immerse yourself in Eclipto's signature kinetic design language, spatial 3D interfaces,
              and precision engineering.
            </p>
          </div>

          {/* Quick Details Badge */}
          <div className="flex items-center space-x-3 text-xs font-tech text-white/60">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
              <Film className="w-3.5 h-3.5 text-[#FF1053]" />
              <span>4K CINEMATIC MASTER</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#E6004C]" />
              <span>60 FPS ULTRA MOTION</span>
            </div>
          </div>
        </div>

        {/* Video Theater Frame Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] group transition-all duration-500 hover:border-[#FF1053]/50"
        >
          {/* Ambient Glow Aura Behind Player */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#E6004C]/15 via-transparent to-[#FF1053]/15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            aria-hidden="true"
          />

          {/* Theater Frame Top Navigation Bar */}
          <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0c0207]/90 backdrop-blur-md border-b border-white/10">
            {/* macOS Chrome Dots */}
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#FF1053]/80 border border-[#FF1053]" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-400" />
              <span className="ml-3 font-tech text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:inline-block">
                eclipto.in // studio-film.mp4
              </span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center space-x-2 font-tech text-[10px] sm:text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold uppercase tracking-widest">
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Main Video Viewport (16:9 Aspect Ratio) */}
          <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Shimmer Placeholder while loading */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.06] to-white/[0.02] animate-pulse flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2 text-white/50 font-tech text-xs">
                  <div className="w-10 h-10 rounded-full border border-white/20 border-t-[#FF1053] animate-spin" />
                  <span>STREAMING ECLIPTO SHOWREEL...</span>
                </div>
              </div>
            )}

            {/* Fallback Error State */}
            {hasError && (
              <div className="absolute inset-0 bg-[#0d0206] flex flex-col items-center justify-center p-6 text-center">
                <p className="font-tech text-sm text-[#FF1053] mb-3">
                  VIDEO STREAM CURRENTLY UNAVAILABLE
                </p>
                <a
                  href={VIDEO_SOURCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-tech hover:bg-[#E6004C]"
                >
                  OPEN DIRECT STREAM
                </a>
              </div>
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              src={VIDEO_SOURCE}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className={`w-full h-full object-cover cursor-pointer transition-opacity duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Center Play/Pause Overlay Indicator on Click/Hover */}
            {(!isPlaying || showControls) && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300 focus:outline-none"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E6004C]/30 border-2 border-[#FF1053] flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,16,83,0.6)] transform transition-transform duration-300 hover:scale-110 active:scale-95">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  )}
                </div>
              </button>
            )}

            {/* Bottom Floating Control Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 sm:opacity-0 group-hover:opacity-100'
              }`}
            >
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-3.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E6004C] to-[#FF1053] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none font-tech text-xs"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-white/70" />
                        <span className="text-[11px] text-white/70">UNMUTE</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#FF1053]" />
                        <span className="text-[11px] text-[#FF1053] font-bold">AUDIO ON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline font-tech text-[11px] text-white/50 tracking-wider">
                    ECLIPTO CINEMA 60FPS
                  </span>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theater Frame Bottom Metadata Bar */}
          <div className="px-5 py-4 bg-[#0a0105] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech text-white/70">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-white/60 text-center sm:text-left">
              <span className="text-[#FF1053] font-bold">MASTER PRODUCTION</span>
              <span>•</span>
              <span>1080P PRORES STREAM</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">COLOR GRADED IN REC.709</span>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-1.5 text-[#FF1053] hover:text-white transition-colors font-bold uppercase tracking-wider text-[11px]"
              >
                <span>COMMISSION A PRODUCTION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

