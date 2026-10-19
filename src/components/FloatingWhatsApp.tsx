import React from 'react';
import { CONTACT_CONFIG } from '../config/contact';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={CONTACT_CONFIG.whatsapp.chatLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Parvez Khan on WhatsApp (+91 77208 35581)"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_35px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] focus:ring-offset-[#080104]"
      >
        {/* Subtle pulsing background ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none"
          style={{ animationDuration: '3s' }}
          aria-hidden="true"
        />

        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.4 1.1 1.2-4.2-.3-.5A11.6 11.6 0 1 1 16 27.5zm6.4-8.6c-.3-.2-2-.9-2.3-1s-.6-.2-.8.2-.9 1-1.1 1.3-.4.3-.7.2a9 9 0 0 1-2.7-1.7 10 10 0 0 1-1.9-2.3c-.2-.4 0-.5.2-.7s.3-.4.5-.6.2-.4.3-.6.1-.4 0-.6-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5s-1.5 1.5-1.5 3.6 1.5 4.2 1.7 4.5 3 4.6 7.3 6.4c1 .4 1.8.7 2.4.9 1 .3 2 .3 2.8.2.8-.1 2.5-1 2.8-2s.4-1.8.3-2-.5-.3-.9-.5z" />
        </svg>

        {/* Desktop Tooltip Badge */}
        <span className="hidden lg:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#080104]/90 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white whitespace-nowrap shadow-xl pointer-events-none items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with Parvez on WhatsApp</span>
        </span>
      </a>
    </aside>
  );
};
