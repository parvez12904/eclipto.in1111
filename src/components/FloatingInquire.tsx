import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

interface FloatingInquireProps {
  onNavigate?: (sectionId: string) => void;
}

export const FloatingInquire: React.FC<FloatingInquireProps> = ({ onNavigate }) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Quick inquiry action"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Inquire about a project with Eclipto"
        className="group relative flex items-center space-x-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-heading font-black text-xs sm:text-[13px] tracking-[0.16em] uppercase shadow-[0_4px_25px_rgba(230,0,76,0.45)] hover:shadow-[0_4px_35px_rgba(230,0,76,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF1053] focus:ring-offset-[#080104]"
      >
        {/* Subtle pulsing ambient glow ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#E6004C]/35 animate-ping pointer-events-none"
          style={{ animationDuration: '3.5s' }}
          aria-hidden="true"
        />

        {/* Live Indicator Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_white]" />
        </span>

        {/* Action Icon */}
        <MessageSquare className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />

        {/* Button Label */}
        <span className="font-extrabold tracking-[0.18em]">INQUIRE</span>

        {/* Corner Indicator Arrow */}
        <ArrowUpRight className="w-3.5 h-3.5 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

        {/* Desktop Hover Tooltip */}
        <span className="hidden lg:group-hover:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#080104]/95 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white whitespace-nowrap shadow-2xl pointer-events-none items-center space-x-1.5 animate-in fade-in zoom-in-95 duration-200">
          <Sparkles className="w-3 h-3 text-[#FF1053]" />
          <span>Start a project inquiry</span>
        </span>
      </button>
    </aside>
  );
};
