import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import type { AdminUser } from './types';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser, token: string) => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Invalid administrator credentials');
      }

      // Store token in localStorage for cross-session SPA calls
      if (data.token) {
        localStorage.setItem('eclipto_admin_token', data.token);
      }

      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080104] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#E6004C]/15 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#FF1053]" />
            <span className="font-mono text-[#FF1053] text-[11px] uppercase tracking-[0.25em] font-bold">
              ADMINISTRATIVE PORTAL
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            ECLIPT<span className="text-[#FF1053]">Ø</span> CONSOLE
          </h1>
          <p className="mt-2 text-white/60 font-mono text-xs">
            Restricted access • Enquiries & Lead Management
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-red-400 text-xs font-mono animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <div>
                <span className="font-bold block text-red-300">Authentication Failed</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2"
              >
                ADMIN EMAIL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@eclipto.agency"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2"
              >
                SECURE PASSWORD
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E6004C] focus:ring-1 focus:ring-[#E6004C] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-heading font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#E6004C] to-[#FF1053] shadow-[0_0_35px_rgba(230,0,76,0.45)] hover:shadow-[0_0_50px_rgba(230,0,76,0.7)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>VERIFYING SESSION...</span>
                </>
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="text-xs font-mono text-white/50 hover:text-white transition-colors"
            >
              ← Return to Public Eclipto Website
            </button>
          </div>
        </div>

        {/* Local Dev Note */}
        <div className="mt-6 p-4 rounded-2xl glass-panel border border-white/10 text-center text-xs font-mono text-white/40">
          Default seed credentials: <span className="text-white/80">admin@eclipto.agency</span> / <span className="text-white/80">EcliptoAdmin2026!</span>
        </div>
      </div>
    </div>
  );
};
