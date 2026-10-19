import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', id: 'hero' },
    { label: 'WORK', id: 'work' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PROCESS', id: 'process' },
    { label: 'INSIGHTS', id: 'insights' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#080104]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* LEFT: ECLIPTO Brand Mark & Name */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center space-x-3.5 focus:outline-none"
          aria-label="ECLIPTO Homepage"
        >
          {/* Minimalist Stylized 'E' Inside Square Glass Container */}
          <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(230,0,76,0.25)] group-hover:border-[#E6004C] group-hover:shadow-[0_0_20px_rgba(230,0,76,0.6)] transition-all duration-300">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#FF1053] transition-transform duration-300 group-hover:scale-105"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h14" />
              <path d="M4 12h10" />
              <path d="M4 19h14" />
              <path d="M4 5v14" />
            </svg>
          </div>
          <span className="font-display font-black tracking-[0.25em] text-lg text-white group-hover:text-white transition-colors">
            ECLIPTO
          </span>
        </button>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav
          className="hidden md:flex items-center space-x-8 lg:space-x-10"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative py-2 text-[11px] lg:text-xs font-body font-semibold tracking-[0.2em] uppercase transition-colors duration-200 focus:outline-none"
              >
                <span
                  className={
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/70 hover:text-white'
                  }
                >
                  {item.label}
                </span>

                {/* Red Accent Active Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E6004C] shadow-[0_0_10px_#E6004C] animate-in fade-in zoom-in-50 duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Glass Outline Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('contact')}
            title="Connect with Parvez Khan (+91 77208 35581)"
            aria-label="Connect with Parvez Khan"
            className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-display font-bold tracking-[0.16em] uppercase glass-panel border border-white/20 text-white hover:border-[#E6004C] hover:bg-[#E6004C]/15 hover:shadow-[0_0_25px_rgba(230,0,76,0.35)] active:scale-95 transition-all duration-300"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF1053] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2.5 rounded-lg md:hidden glass-panel border border-white/20 text-white/80 hover:text-white hover:border-[#E6004C] transition-colors focus:outline-none"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
