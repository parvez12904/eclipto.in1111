import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  number?: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  metrics?: string;
  onClick?: () => void;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  subtitle,
  description,
  icon,
  tags,
  metrics,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative p-7 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-[#E6004C]/60 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Ambient glow in card corner on hover */}
      <div
        className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-[#E6004C]/10 blur-3xl pointer-events-none group-hover:bg-[#FF1053]/25 transition-all duration-500"
        aria-hidden="true"
      />

      <div>
        {/* Top Header: Number / Icon & Action */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {number && (
              <span className="font-tech text-xs text-[#E6004C] font-bold tracking-widest">
                {number}
              </span>
            )}
            {icon && (
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#FF1053] group-hover:scale-110 group-hover:border-[#E6004C]/50 transition-all duration-300">
                {icon}
              </div>
            )}
          </div>

          <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-[#E6004C] group-hover:bg-[#E6004C]/20 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="font-editorial text-xs sm:text-sm text-[#FF1053] mb-3">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="font-body text-sm text-white/70 leading-relaxed font-normal mb-6">
          {description}
        </p>
      </div>

      {/* Bottom Footer: Tags and Metrics */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-tech tracking-wider bg-white/[0.05] border border-white/10 text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {metrics && (
          <span className="text-[11px] font-tech font-semibold text-[#FF1053] tracking-wide ml-auto">
            {metrics}
          </span>
        )}
      </div>
    </div>
  );
};
