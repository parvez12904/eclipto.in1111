import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080104] text-white border-t border-white/10 z-10 overflow-hidden">
      {/* Top Newsletter & Manifesto Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7">
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-3">
              CONNECT WITH <span className="text-[#FF1053]">{CONTACT_CONFIG.businessName}</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xl">
              {CONTACT_CONFIG.tagline} We partner with visionary enterprises and ambitious founders to build next-generation software, web experiences, and AI systems.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 rounded-xl glass-panel border border-[#E6004C]/50 flex items-center space-x-3 text-emerald-400 font-mono text-xs">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>THANK YOU. WE HAVE RECEIVED YOUR SUBSCRIPTION.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#E6004C] transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-heading font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.35)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] transition-all flex items-center justify-center space-x-2"
                >
                  <span>JOIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Main Footer Links & Official Business Contact Details */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Official Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(230,0,76,0.25)]">
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
                <span className="font-heading font-black tracking-[0.25em] text-2xl text-white block">
                  {CONTACT_CONFIG.businessName}
                </span>
                <span className="text-xs font-mono text-[#FF1053] tracking-wide">
                  {CONTACT_CONFIG.tagline}
                </span>
              </div>
            </div>

            {/* Official Contact Card Box */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-white/70">
                <User className="w-4 h-4 text-[#FF1053]" />
                <span className="text-white/40">Contact Person:</span>
                <span className="text-white font-bold">{CONTACT_CONFIG.founder}</span>
              </div>

              <div className="flex items-center space-x-2 text-white/70">
                <Mail className="w-4 h-4 text-[#FF1053]" />
                <span className="text-white/40">Email:</span>
                <a
                  href={CONTACT_CONFIG.email.mailtoLink}
                  className="text-white hover:text-[#FF1053] transition-colors font-medium break-all underline decoration-white/20 underline-offset-2"
                >
                  {CONTACT_CONFIG.email.address}
                </a>
              </div>

              <div className="flex items-center space-x-2 text-white/70">
                <Phone className="w-4 h-4 text-[#FF1053]" />
                <span className="text-white/40">Phone:</span>
                <a
                  href={CONTACT_CONFIG.phone.telLink}
                  className="text-white hover:text-[#FF1053] transition-colors font-bold"
                >
                  {CONTACT_CONFIG.phone.display}
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center space-x-3">
                <a
                  href={CONTACT_CONFIG.whatsapp.chatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 transition-colors font-bold text-[11px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={CONTACT_CONFIG.phone.telLink}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white/80 hover:text-white transition-colors text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E6004C]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Col (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E6004C] font-semibold mb-4">
              INDEX
            </div>
            <ul className="space-y-2.5 text-xs font-mono">
              {['hero', 'work', 'about', 'services', 'process', 'insights', 'contact'].map(
                (sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => onNavigate(sec)}
                      className="text-white/60 hover:text-white transition-colors uppercase text-left"
                    >
                      {sec === 'hero' ? 'HOME' : sec}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Capabilities Col (3 cols) */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E6004C] font-semibold mb-4">
              SOLUTIONS
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li>High-End Websites & 3D Web</li>
              <li>Custom Software Engineering</li>
              <li>Autonomous AI Automation</li>
              <li>Digital Marketing & Growth</li>
              <li>UI/UX Design & Brand Motion</li>
            </ul>
          </div>

          {/* Contact Direct Channels Col (2 cols) */}
          <div className="lg:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E6004C] font-semibold mb-4">
              CONNECT
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li>
                <a
                  href={CONTACT_CONFIG.whatsapp.chatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center space-x-1"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-[#25D366]" />
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_CONFIG.phone.telLink}
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Direct Call</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF1053]" />
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_CONFIG.email.mailtoLink}
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Direct Email</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF1053]" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
        <div>
          © {new Date().getFullYear()} {CONTACT_CONFIG.businessName}. Founded by {CONTACT_CONFIG.founder}. All rights reserved.
        </div>

        <div className="flex items-center space-x-6">
          <a
            href={CONTACT_CONFIG.email.mailtoLink}
            className="hover:text-white transition-colors"
          >
            {CONTACT_CONFIG.email.address}
          </a>
          {onOpenAdmin ? (
            <button
              onClick={onOpenAdmin}
              className="text-white/40 hover:text-[#FF1053] transition-colors"
            >
              Admin Portal
            </button>
          ) : (
            <a
              href="/admin"
              className="text-white/40 hover:text-[#FF1053] transition-colors"
            >
              Admin Portal
            </a>
          )}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-[#FF1053] hover:text-white transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
