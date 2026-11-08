import React from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  User,
  Globe,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import type { AdminUser } from '../types';

interface SettingsManagementProps {
  user: AdminUser;
  onBackToWebsite: () => void;
}

export const SettingsManagement: React.FC<SettingsManagementProps> = ({
  user,
  onBackToWebsite,
}) => {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
          <Settings className="w-4 h-4" />
          <span>ADMINISTRATION & SYSTEM</span>
        </div>
        <h2 className="font-heading font-black text-2xl text-white tracking-tight">
          System Settings & Access
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-body">
          Review administrator account credentials, database connection telemetry, and public routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-[#E6004C]/20 border border-[#E6004C]/40 text-[#FF1053]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF1053] font-bold uppercase tracking-wider block">
                AUTHENTICATED USER
              </span>
              <h3 className="font-heading font-black text-base text-white">
                {user.name || 'Parvez Khan'}
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Email:</span>
              <span className="text-white font-bold">{user.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Privilege Level:</span>
              <span className="text-[#FF1053] font-bold uppercase">{user.role}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">User ID:</span>
              <span className="text-white/60 text-[11px] font-mono truncate max-w-[180px]">
                {user.id}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/50">Session Security:</span>
              <span className="text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>JWT Signed (7 Days)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Card */}
        <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                DATABASE INFRASTRUCTURE
              </span>
              <h3 className="font-heading font-black text-base text-white">
                PostgreSQL Managed Cluster
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Engine:</span>
              <span className="text-white font-bold">PostgreSQL v16</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Host:</span>
              <span className="text-white/80 font-mono text-[11px]">ep-winter-dust-a1qu4adw</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">SSL Encryption:</span>
              <span className="text-emerald-400">Enforced (require)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/50">ORM Layer:</span>
              <span className="text-white">Prisma Client v6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Public Shortcuts */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
        <h3 className="font-heading font-black text-base text-white">
          Public Website Links
        </h3>
        <p className="text-xs text-white/60 font-body">
          Quickly test and inspect how your managed changes appear to visitors:
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onBackToWebsite}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF1053]" />
            <span>Public Home</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          <a
            href="/#reels"
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors"
          >
            <span>Reels Section</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="/#pricing"
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors"
          >
            <span>Pricing Section</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="/#contact"
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors"
          >
            <span>Inquiry Form</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
