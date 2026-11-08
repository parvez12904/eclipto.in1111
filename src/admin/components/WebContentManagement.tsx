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
  Layers,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Edit2,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { DEFAULT_HERO_CONTENT, DEFAULT_SERVICES } from '../../services/content';
import type { Service } from '../../data/agencyData';

interface WebContentManagementProps {
  token: string;
}

export const WebContentManagement: React.FC<WebContentManagementProps> = ({ token }) => {
  const [subTab, setSubTab] = useState<'hero' | 'services'>('hero');
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

  // Services Fields
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [selectedService, setSelectedService] = useState<Service | null>(DEFAULT_SERVICES[0]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newDeliverable, setNewDeliverable] = useState('');

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

        if (json.data.services?.services_list) {
          try {
            const parsed = JSON.parse(json.data.services.services_list);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setServices(parsed);
              setSelectedService(parsed[0]);
            }
          } catch {
            // Keep default services
          }
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

  const handleResetHeroToDefault = () => {
    setMainHeading(DEFAULT_HERO_CONTENT.mainHeading);
    setHighlightedHeading(DEFAULT_HERO_CONTENT.highlightedHeading);
    setDescription(DEFAULT_HERO_CONTENT.description);
    setPrimaryCtaText(DEFAULT_HERO_CONTENT.primaryCtaText);
    setSecondaryCtaText(DEFAULT_HERO_CONTENT.secondaryCtaText);
  };

  const handleSaveServices = async () => {
    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          sectionName: 'services',
          items: {
            services_list: JSON.stringify(services),
          },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Failed to save services.');
      }

      showNotification('Services catalog updated and published to website!');
    } catch (err: any) {
      showNotification(err.message || 'Error saving services', true);
    } finally {
      setSaving(false);
    }
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === services.length - 1)
    ) {
      return;
    }

    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    // Recalculate 'num' prefixes: 01, 02, etc.
    const reordered = newServices.map((svc, i) => ({
      ...svc,
      num: String(i + 1).padStart(2, '0'),
    }));

    setServices(reordered);
    if (selectedService?.id === temp.id) {
      setSelectedService(reordered[targetIndex]);
    }
  };

  const handleOpenEditService = (service: Service) => {
    setEditingService({ ...service });
  };

  const handleSaveEditedService = () => {
    if (!editingService) return;
    const updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    setServices(updated);
    if (selectedService?.id === editingService.id) {
      setSelectedService(editingService);
    }
    setEditingService(null);
    showNotification(`Updated "${editingService.title}". Remember to click "Publish Services" to persist changes.`);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      deliverables: [...editingService.deliverables, newDeliverable.trim()],
    });
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (idx: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      deliverables: editingService.deliverables.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <FileText className="w-4 h-4" />
            <span>DYNAMIC WEBSITE CONTENT</span>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-tight">
            Website Content & Services Management
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-body">
            Update headlines, descriptions, CTA buttons, and services displayed on the public site.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center p-1 rounded-2xl glass-panel border border-white/10 bg-white/[0.02]">
          <button
            onClick={() => setSubTab('hero')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              subTab === 'hero'
                ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_15px_rgba(230,0,76,0.3)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Section</span>
          </button>
          <button
            onClick={() => setSubTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              subTab === 'services'
                ? 'bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_15px_rgba(230,0,76,0.3)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services Section ({services.length})</span>
          </button>
        </div>
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
      ) : subTab === 'hero' ? (
        /* ================= SUB-TAB 1: HERO SECTION ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM (7 Cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSaveHero}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-black text-lg text-white">
                  Hero Section Content
                </h3>
                <button
                  type="button"
                  onClick={handleResetHeroToDefault}
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
      ) : (
        /* ================= SUB-TAB 2: SERVICES SECTION ================= */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Services Catalog & Display Order
              </h3>
              <p className="text-xs text-white/60 font-mono">
                Reorder services, edit deliverables, update headlines and benchmark metrics.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setServices(DEFAULT_SERVICES)}
                className="px-3.5 py-2 rounded-xl glass-panel border border-white/15 text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleSaveServices}
                disabled={saving}
                className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] disabled:opacity-50 transition-all active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Publishing...' : 'Publish Services'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SERVICES LIST (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {services.map((svc, index) => {
                const isSelected = selectedService?.id === svc.id;
                return (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedService(svc)}
                    className={`p-4 rounded-2xl glass-panel border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#FF1053] bg-white/[0.05] shadow-[0_0_25px_rgba(230,0,76,0.2)]'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/15 font-mono text-xs font-bold text-[#FF1053]">
                        {svc.num}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{svc.title}</h4>
                        <p className="text-xs text-white/50 truncate font-mono">
                          {svc.deliverables.length} Deliverables • {svc.metrics}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        title="Move Up"
                        disabled={index === 0}
                        onClick={() => handleMoveService(index, 'up')}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Move Down"
                        disabled={index === services.length - 1}
                        onClick={() => handleMoveService(index, 'down')}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Edit Details"
                        onClick={() => handleOpenEditService(svc)}
                        className="p-1.5 rounded-lg bg-[#FF1053]/15 border border-[#FF1053]/30 text-[#FF1053] hover:bg-[#FF1053]/30 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIVE PREVIEW CARD (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between text-white/50 text-xs font-mono uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Eye className="w-3.5 h-3.5 text-[#FF1053]" />
                  <span>PUBLIC CARD PREVIEW</span>
                </div>
                {selectedService && (
                  <button
                    onClick={() => handleOpenEditService(selectedService)}
                    className="text-[#FF1053] hover:underline flex items-center space-x-1"
                  >
                    <span>Edit Service</span>
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {selectedService && (
                <div className="rounded-3xl glass-panel border border-[#FF1053]/40 p-6 bg-gradient-to-b from-[#14020a] to-[#080104] space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 border border-white/15 font-mono text-xs font-bold text-[#FF1053]">
                      {selectedService.num}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FF1053]/15 text-[#FF1053] border border-[#FF1053]/30 font-bold">
                      {selectedService.metrics}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">
                      {selectedService.title}
                    </h4>
                    <p className="font-editorial text-xs text-white/90 italic mt-1">
                      "{selectedService.headline}"
                    </p>
                  </div>

                  <p className="text-xs text-white/70 font-body leading-relaxed">
                    {selectedService.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="block font-mono text-[10px] uppercase text-white/50">
                      Core Deliverables:
                    </span>
                    <div className="space-y-1.5">
                      {selectedService.deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs font-mono text-white/80">
                          <Check className="w-3 h-3 text-[#FF1053] shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-white/20 bg-[#0c0206] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 font-mono text-xs font-bold text-[#FF1053]">
                  {editingService.num}
                </span>
                <h3 className="font-heading font-black text-lg text-white">
                  Edit Service: {editingService.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="text-white/50 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Headline *
                </label>
                <input
                  type="text"
                  value={editingService.headline}
                  onChange={(e) => setEditingService({ ...editingService, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Benchmark Metric *
                </label>
                <input
                  type="text"
                  value={editingService.metrics}
                  onChange={(e) => setEditingService({ ...editingService, metrics: e.target.value })}
                  placeholder="e.g. Top 1% Global Retention Rate"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                />
              </div>

              {/* Deliverables editor */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Deliverables ({editingService.deliverables.length})
                </label>
                <div className="space-y-2 mb-2">
                  {editingService.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 text-xs font-mono text-white/80"
                    >
                      <span className="truncate">{deliv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-red-400 hover:text-red-300 p-1 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Add deliverable..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl glass-panel border border-white/15 text-xs font-mono text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedService}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
