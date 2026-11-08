import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { DEFAULT_HERO_CONTENT } from '../../services/content';

interface WebContentManagementProps {
  token: string;
}

export const WebContentManagement: React.FC<WebContentManagementProps> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hero Fields
  const [mainHeading, setMainHeading] = useState(DEFAULT_HERO_CONTENT.mainHeading);
  const [highlightedHeading, setHighlightedHeading] = useState(
    DEFAULT_HERO_CONTENT.highlightedHeading
  );
  const [description, setDescription] = useState(DEFAULT_HERO_CONTENT.description);
  const [primaryCtaText, setPrimaryCtaText] = useState(DEFAULT_HERO_CONTENT.primaryCtaText);
  const [secondaryCtaText, setSecondaryCtaText] = useState(
    DEFAULT_HERO_CONTENT.secondaryCtaText
  );

  const getHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Fetch current content from server
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content', {
        headers: getHeaders(),
      });
      const json = await res.json();
      if (res.ok && json.ok && json.data) {
        if (json.data.hero) {
          setMainHeading(json.data.hero.main_heading || DEFAULT_HERO_CONTENT.mainHeading);
          setHighlightedHeading(
            json.data.hero.highlighted_heading || DEFAULT_HERO_CONTENT.highlightedHeading
          );
          setDescription(json.data.hero.description || DEFAULT_HERO_CONTENT.description);
          setPrimaryCtaText(
            json.data.hero.primary_cta_text || DEFAULT_HERO_CONTENT.primaryCtaText
          );
          setSecondaryCtaText(
            json.data.hero.secondary_cta_text || DEFAULT_HERO_CONTENT.secondaryCtaText
          );
        }
      }
    } catch {
      setErrorMessage('Failed to load content from server.');
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          sectionName: 'hero',
          items: {
            main_heading: mainHeading,
            highlighted_heading: highlightedHeading,
            description,
            primary_cta_text: primaryCtaText,
            secondary_cta_text: secondaryCtaText,
          },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Failed to update hero content.');
      }

      showNotification('Hero section content updated and saved to database!');
    } catch (err: any) {
      showNotification(err.message || 'Error saving content', true);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    setMainHeading(DEFAULT_HERO_CONTENT.mainHeading);
    setHighlightedHeading(DEFAULT_HERO_CONTENT.highlightedHeading);
    setDescription(DEFAULT_HERO_CONTENT.description);
    setPrimaryCtaText(DEFAULT_HERO_CONTENT.primaryCtaText);
    setSecondaryCtaText(DEFAULT_HERO_CONTENT.secondaryCtaText);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
          <FileText className="w-4 h-4" />
          <span>DYNAMIC WEBSITE CONTENT</span>
        </div>
        <h2 className="font-heading font-black text-2xl text-white tracking-tight">
          Website Content Management
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-body">
          Update the text, titles, descriptions, and CTA buttons on the public website without editing source code.
        </p>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center space-x-2 text-red-400 text-xs font-mono animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 font-mono text-white/60 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF1053]" />
          <span>Loading content from database...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSaveHero} className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-black text-lg text-white">
                  Hero Section Content
                </h3>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs font-mono text-white/50 hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Main Heading & Highlighted Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Main Heading (White) *
                  </label>
                  <input
                    type="text"
                    required
                    value={mainHeading}
                    onChange={(e) => setMainHeading(e.target.value)}
                    placeholder="WE BUILD"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Highlighted Heading (Pink) *
                  </label>
                  <input
                    type="text"
                    required
                    value={highlightedHeading}
                    onChange={(e) => setHighlightedHeading(e.target.value)}
                    placeholder="WHAT'S NEXT."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Supporting Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Supporting mission statement..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#FF1053] resize-none"
                />
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Primary Button Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={primaryCtaText}
                    onChange={(e) => setPrimaryCtaText(e.target.value)}
                    placeholder="LET'S BUILD SOMETHING"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Secondary Button Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={secondaryCtaText}
                    onChange={(e) => setSecondaryCtaText(e.target.value)}
                    placeholder="EXPLORE OUR WORK"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] disabled:opacity-50 transition-all active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Hero Content'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: LIVE PREVIEW (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-white/50 text-xs font-mono uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-[#FF1053]" />
              <span>LIVE HOMEPAGE PREVIEW</span>
            </div>

            <div className="rounded-3xl glass-panel border border-white/15 p-6 bg-gradient-to-b from-[#150209] to-[#080104] space-y-4 shadow-xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/[0.05] border border-[#E6004C]/30 text-[9px] font-mono text-[#FF1053] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] animate-pulse" />
                <span>DIGITAL EXPERIENCES • EST. 2026</span>
              </div>

              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {mainHeading || 'WE BUILD'}
                </span>
                <span className="block font-editorial text-2xl sm:text-3xl bg-gradient-to-r from-[#FF3366] via-[#FF1053] to-[#FF6B8B] bg-clip-text text-transparent">
                  {highlightedHeading || "WHAT'S NEXT."}
                </span>
              </div>

              <p className="text-xs text-white/80 font-body leading-relaxed line-clamp-3">
                {description || DEFAULT_HERO_CONTENT.description}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-display text-[10px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1">
                  <span>{primaryCtaText || "LET'S BUILD"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
                <div className="px-4 py-2 rounded-lg glass-panel border border-white/20 text-white font-display text-[10px] font-bold tracking-wider uppercase text-center">
                  {secondaryCtaText || 'EXPLORE OUR WORK'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
