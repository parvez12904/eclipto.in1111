import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  User,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import {
  CONTACT_CONFIG,
  buildCustomMailto,
} from '../config/contact';

export const ContactSection: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<string>('Website & 3D Web');
  const [selectedBudget, setSelectedBudget] = useState<string>('$30K - $75K / ₹25L - ₹60L');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [showDispatchOptions, setShowDispatchOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const scopes = [
    'Website & 3D Web',
    'Custom Software',
    'AI Automation',
    'Digital Marketing & Growth',
  ];

  const budgets = [
    'Starter (< ₹5L)',
    'Growth (₹5L - ₹15L)',
    'Enterprise (₹15L+)',
    'Custom / Flexible',
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          phone: phone || null,
          companyName: company || null,
          service: selectedScope,
          budgetRange: selectedBudget,
          message,
          source: 'website_contact_form',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Failed to submit enquiry. Please check your inputs.');
      }

      setSubmittedReference(result.data.enquiryNumber);
      setShowDispatchOptions(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Unable to connect to the backend server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setSubmittedReference(null);
    setErrorMessage(null);
    setShowDispatchOptions(false);
  };

  const dynamicMailto = buildCustomMailto({
    name,
    email,
    company,
    service: selectedScope,
    budget: selectedBudget,
    message,
  });

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#080104] z-10 border-t border-white/10">
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-[#E6004C]/15 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (STEP 4) */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C]" />
            <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
              05 / LET'S CONNECT
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">HAVE A VISION?</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              LET'S BUILD IT.
            </span>
          </h2>

          <p className="mt-5 text-white/75 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            Have a website, software, AI automation, or digital marketing project
            in mind? Let's discuss your requirements.
          </p>
        </div>

        {/* 3 Prominent Functional Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* 1. CALL NOW */}
          <a
            href={CONTACT_CONFIG.phone.telLink}
            aria-label={`Call Parvez Khan directly at ${CONTACT_CONFIG.phone.display}`}
            className="group relative p-7 rounded-3xl glass-panel border border-white/10 hover:border-[#E6004C] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(230,0,76,0.3)]"
          >
            <div
              className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#E6004C]/10 blur-2xl group-hover:bg-[#E6004C]/25 transition-all"
              aria-hidden="true"
            />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-[#E6004C]/15 border border-[#E6004C]/40 text-[#FF1053] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                  INSTANT CALL
                </span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                CONTACT PERSON: {CONTACT_CONFIG.founder}
              </div>
              <div className="font-heading font-black text-2xl text-white tracking-tight group-hover:text-[#FF1053] transition-colors">
                {CONTACT_CONFIG.phone.display}
              </div>
              <p className="text-xs text-white/50 mt-2 font-mono">
                Direct mobile line • Mon–Sat available
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF1053] group-hover:text-white transition-colors">
                CALL NOW
              </span>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white group-hover:bg-[#E6004C] group-hover:border-[#E6004C] transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* 2. EMAIL US */}
          <a
            href={CONTACT_CONFIG.email.mailtoLink}
            aria-label={`Email Parvez Khan at ${CONTACT_CONFIG.email.address}`}
            className="group relative p-7 rounded-3xl glass-panel border border-white/10 hover:border-[#FF1053] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,16,83,0.3)]"
          >
            <div
              className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#FF1053]/10 blur-2xl group-hover:bg-[#FF1053]/25 transition-all"
              aria-hidden="true"
            />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-[#FF1053]/15 border border-[#FF1053]/40 text-[#FF1053] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                  FORMAL PROPOSAL
                </span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                PRIMARY EMAIL
              </div>
              <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight break-all group-hover:text-[#FF1053] transition-colors">
                {CONTACT_CONFIG.email.address}
              </div>
              <p className="text-xs text-white/50 mt-2 font-mono">
                Opens with pre-filled enquiry template
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF1053] group-hover:text-white transition-colors">
                EMAIL US
              </span>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white group-hover:bg-[#FF1053] group-hover:border-[#FF1053] transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* 3. CHAT ON WHATSAPP */}
          <a
            href={CONTACT_CONFIG.whatsapp.chatLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with Parvez Khan"
            className="group relative p-7 rounded-3xl glass-panel border border-white/10 hover:border-[#25D366] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
          >
            <div
              className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#25D366]/10 blur-2xl group-hover:bg-[#25D366]/25 transition-all"
              aria-hidden="true"
            />
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="font-mono text-[10px] text-[#25D366] font-bold">
                    ONLINE
                  </span>
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                WHATSAPP BUSINESS
              </div>
              <div className="font-heading font-black text-2xl text-white tracking-tight group-hover:text-[#25D366] transition-colors">
                {CONTACT_CONFIG.phone.display}
              </div>
              <p className="text-xs text-white/50 mt-2 font-mono">
                Fastest response • Instant chat with Parvez
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#25D366] group-hover:text-white transition-colors">
                CHAT ON WHATSAPP
              </span>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white group-hover:bg-[#25D366] group-hover:border-[#25D366] transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

        </div>

        {/* 2-Column Section: Project Builder Form & Official Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Project Scope Form & Live Dispatch (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              
              {showDispatchOptions ? (
                <div className="py-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-4">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-heading font-black text-sm uppercase tracking-wide text-white">
                        PROJECT ENQUIRY RECORDED SECURELY
                      </div>
                      <p className="text-xs text-white/75 font-mono leading-relaxed">
                        Your project brief has been committed permanently to the ECLIPTØ database. {CONTACT_CONFIG.founder} and our engineering leads have been alerted.
                      </p>
                    </div>
                  </div>

                  {/* Reference ID Showcase Card */}
                  <div className="p-5 rounded-2xl bg-black/80 border border-[#E6004C]/40 shadow-[0_0_30px_rgba(230,0,76,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">
                        OFFICIAL REFERENCE IDENTIFIER
                      </span>
                      <div className="font-heading font-black text-2xl text-white tracking-widest text-[#FF1053]">
                        {submittedReference || 'EC-2026-CONFIRMED'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(submittedReference || '')}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase glass-panel border border-white/20 hover:border-[#FF1053] text-white flex items-center space-x-2 transition-all"
                    >
                      {copiedRef ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-white/70" />
                          <span>COPY REFERENCE</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary of entered info */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
                    <div className="text-white/50 text-[10px] uppercase tracking-wider">
                      SUBMITTED SPECIFICATION
                    </div>
                    <div className="text-white">
                      <span className="text-white/50">Client:</span> {name} {company ? `(${company})` : ''}
                    </div>
                    <div className="text-white">
                      <span className="text-white/50">Contact:</span> {email} {phone ? `• ${phone}` : ''}
                    </div>
                    <div className="text-white">
                      <span className="text-white/50">Service Scope:</span> {selectedScope}
                    </div>
                    <div className="text-white">
                      <span className="text-white/50">Investment Tier:</span> {selectedBudget}
                    </div>
                    {message && (
                      <div className="text-white/80 pt-2 border-t border-white/5 text-[11px] line-clamp-3">
                        "{message}"
                      </div>
                    )}
                  </div>

                  {/* Immediate Direct Channels */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block text-center">
                      NEED AN INSTANT RESPONSE? CONNECT DIRECTLY WITH PARVEZ KHAN:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={`https://wa.me/917720835581?text=${encodeURIComponent(
                          `Hi Parvez, I have submitted enquiry ref ${submittedReference || 'EC-2026'} for ${selectedScope} (${name}${company ? ' - ' + company : ''}). Looking forward to discussing!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl font-heading font-bold text-xs tracking-wider uppercase bg-[#25D366] text-white flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WHATSAPP PARVEZ NOW</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={dynamicMailto}
                        className="p-4 rounded-xl font-heading font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        <span>OPEN IN EMAIL CLIENT</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs font-mono text-white/50 hover:text-white underline transition-colors"
                    >
                      ← Submit Another Project Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-red-400 text-xs font-mono animate-in fade-in duration-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-bold block text-red-300 mb-0.5">Submission Error</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Scope Selector Chips */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-3">
                      01 // WHAT SERVICE DO YOU REQUIRE?
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {scopes.map((scope) => {
                        const isSelected = selectedScope === scope;
                        return (
                          <button
                            type="button"
                            key={scope}
                            onClick={() => setSelectedScope(scope)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold shadow-[0_0_18px_rgba(230,0,76,0.4)]'
                                : 'glass-panel border border-white/10 text-white/70 hover:text-white hover:border-white/25'
                            }`}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector Pills */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-3">
                      02 // ESTIMATED INVESTMENT RANGE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgets.map((budget) => {
                        const isSelected = selectedBudget === budget;
                        return (
                          <button
                            type="button"
                            key={budget}
                            onClick={() => setSelectedBudget(budget)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-mono text-center tracking-wider transition-all duration-200 ${
                              isSelected
                                ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                : 'glass-panel border border-white/10 text-white/70 hover:text-white hover:border-white/25'
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2"
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2"
                      >
                        PHONE NUMBER (OPTIONAL)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2"
                      >
                        COMPANY / BUSINESS NAME
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Enterprises"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2"
                    >
                      PROJECT REQUIREMENTS & AMBITION *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the project goals, timeline, and key deliverables..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-heading font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_35px_rgba(230,0,76,0.45)] hover:shadow-[0_0_50px_rgba(230,0,76,0.7)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>TRANSMITTING ENQUIRY SECURELY...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT PROJECT BRIEF TO ECLIPTØ</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] font-mono text-center text-white/40">
                      Direct connection to {CONTACT_CONFIG.founder} • Stored permanently in secure database • SLA: 2–4 Hours
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* RIGHT: Official Business Profile & Guarantee (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Contact Card */}
            <div className="p-7 sm:p-8 rounded-3xl glass-panel border border-white/15 space-y-5">
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#E6004C]/20 border border-[#E6004C]/40 flex items-center justify-center text-[#FF1053]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#FF1053] uppercase font-bold">
                    FOUNDER & PRINCIPAL
                  </div>
                  <h3 className="font-heading font-black text-xl text-white">
                    {CONTACT_CONFIG.founder}
                  </h3>
                  <div className="text-xs font-mono text-white/60">
                    {CONTACT_CONFIG.businessName}
                  </div>
                </div>
              </div>

              {/* Direct Details List */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-white/50">PHONE</span>
                  <a
                    href={CONTACT_CONFIG.phone.telLink}
                    className="text-white font-bold hover:text-[#FF1053] transition-colors"
                  >
                    {CONTACT_CONFIG.phone.display}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-white/50">EMAIL</span>
                  <a
                    href={CONTACT_CONFIG.email.mailtoLink}
                    className="text-white font-bold hover:text-[#FF1053] transition-colors break-all"
                  >
                    {CONTACT_CONFIG.email.address}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-white/50">WHATSAPP</span>
                  <a
                    href={CONTACT_CONFIG.whatsapp.chatLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold hover:underline transition-all"
                  >
                    +91 77208 35581 ↗
                  </a>
                </div>
              </div>

              {/* Response Time SLA */}
              <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-white/60">
                <Clock className="w-4 h-4 text-[#E6004C]" />
                <span>Typical response time: Within 2–4 hours</span>
              </div>
            </div>

            {/* Service Coverage Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                SPECIALIZED SCOPES
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/80">
                  • 3D Web & WebGL
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/80">
                  • Custom Software
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/80">
                  • AI Automation
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/80">
                  • Digital Marketing
                </div>
              </div>
            </div>

            {/* Direct Action Reminder */}
            <div className="p-5 rounded-2xl glass-panel border border-[#E6004C]/30 bg-[#E6004C]/[0.03] flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <div className="text-xs text-white/80 font-mono">
                Have an urgent launch? Call or WhatsApp Parvez Khan directly for priority scheduling.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
