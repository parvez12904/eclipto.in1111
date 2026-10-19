import React, { useEffect } from 'react';
import { X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  // Prevent background scrolling and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const navLinks = [
    { label: 'HOME', href: 'hero' },
    { label: 'WORK', href: 'work' },
    { label: 'ABOUT', href: 'about' },
    { label: 'SERVICES', href: 'services' },
    { label: 'PROCESS', href: 'process' },
    { label: 'INSIGHTS', href: 'insights' },
    { label: 'CONTACT', href: 'contact' },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080104]/98 backdrop-blur-2xl px-6 py-8 md:hidden transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Top Bar with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(230,0,76,0.3)]">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#FF1053]"
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
          <div>
            <span className="font-heading font-black tracking-[0.25em] text-lg text-white block">
              {CONTACT_CONFIG.businessName}
            </span>
            <span className="text-[10px] font-mono text-white/50">
              {CONTACT_CONFIG.founder}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full glass-panel border border-white/20 text-white/80 hover:text-white hover:border-[#E6004C] transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Nav Items with Large Typography */}
      <nav className="my-auto py-6 flex flex-col space-y-3 flex-shrink-0">
        {navLinks.map((link, idx) => {
          const isActive = activeSection === link.href;
          return (
            <button
              key={link.href}
              onClick={() => {
                onNavigate(link.href);
                onClose();
              }}
              className="group flex items-center justify-between text-left py-2 border-b border-white/5 transition-all"
            >
              <div className="flex items-baseline space-x-4">
                <span className="text-xs font-mono text-[#E6004C] opacity-70">
                  0{idx + 1}
                </span>
                <span
                  className={`font-heading text-2xl sm:text-3xl font-bold tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#FF1053]'
                      : 'text-white/80 group-hover:text-white group-hover:translate-x-1'
                  }`}
                >
                  {link.label}
                </span>
              </div>
              <ArrowUpRight
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive
                    ? 'text-[#FF1053] translate-x-1 -translate-y-1'
                    : 'text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer Info & Let's Talk CTA */}
      <div className="pt-4 border-t border-white/10 flex flex-col space-y-3 flex-shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={CONTACT_CONFIG.phone.telLink}
            className="py-3 px-3 rounded-xl font-heading font-bold text-xs tracking-wider uppercase glass-panel border border-white/20 text-white flex items-center justify-center space-x-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#E6004C]" />
            <span>CALL</span>
          </a>

          <a
            href={CONTACT_CONFIG.whatsapp.chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 rounded-xl font-heading font-bold text-xs tracking-wider uppercase bg-[#25D366] text-white flex items-center justify-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WHATSAPP</span>
          </a>
        </div>

        <button
          onClick={() => {
            onNavigate('contact');
            onClose();
          }}
          className="w-full py-3.5 rounded-xl font-heading font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(230,0,76,0.5)] active:scale-[0.98] transition-transform"
        >
          <span>LET'S TALK</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <div className="flex flex-col space-y-1 text-xs text-white/60 pt-2 font-mono border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-white/40">Founder:</span>
            <span className="text-white font-bold">{CONTACT_CONFIG.founder}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40">Email:</span>
            <a href={CONTACT_CONFIG.email.mailtoLink} className="text-[#FF1053]">
              {CONTACT_CONFIG.email.address}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
