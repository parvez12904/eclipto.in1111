import React, { useState, useEffect, useCallback } from 'react';
import {
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import type { AdminPricingPackage } from '../types';

interface PricingManagementProps {
  token: string;
}

const DEFAULT_PACKAGES: AdminPricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tierNumber: 'TIER 01',
    tierSubtitle: 'ESSENTIAL FOUNDATION',
    startingPrice: '₹5,999',
    priceNote: 'Starting price for baseline websites',
    valueProposition:
      'Perfect for individuals and small businesses looking for a professional online presence.',
    isPopular: false,
    features: [
      'Modern responsive website',
      'Up to 5 core sections/pages',
      'Mobile-friendly design',
      'Contact/WhatsApp integration',
      'Basic SEO setup',
      'Modern UI design',
    ],
    ctaText: 'CHOOSE STARTER',
  },
  {
    id: 'professional',
    name: 'Professional',
    tierNumber: 'TIER 02',
    tierSubtitle: 'GROWTH ACCELERATOR',
    badge: 'MOST POPULAR',
    startingPrice: '₹12,999',
    priceNote: 'Starting price for growing businesses',
    valueProposition:
      'Designed for growing businesses that need a stronger and more customized digital presence.',
    isPopular: true,
    features: [
      'Everything in the Starter package',
      'More customized pages and sections',
      'Premium UI/UX design',
      'Advanced contact and enquiry forms',
      'Portfolio or service showcase',
      'Social media integration',
      'Basic performance optimization',
    ],
    ctaText: 'CHOOSE PROFESSIONAL',
  },
  {
    id: 'premium',
    name: 'Premium',
    tierNumber: 'TIER 03',
    tierSubtitle: 'BESPOKE HIGH-END SUITE',
    badge: 'HIGH-END SOLUTION',
    startingPrice: '₹21,999+',
    priceNote: 'Starting price for advanced custom builds',
    valueProposition:
      'Built for businesses that require a high-end, feature-rich, and customized website.',
    isPopular: false,
    features: [
      'Everything in the Professional package',
      'Fully customized design and development',
      'Advanced animations and interactions',
      'Custom integrations',
      'Dynamic sections or backend features where required',
      'Advanced portfolio/product showcase',
      'Performance and responsive optimization',
    ],
    ctaText: 'CHOOSE PREMIUM',
  },
];

export const PricingManagement: React.FC<PricingManagementProps> = ({ token }) => {
  const [packages, setPackages] = useState<AdminPricingPackage[]>(DEFAULT_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Load packages from server
  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content', {
        headers: getHeaders(),
      });
      const json = await res.json();
      if (res.ok && json.ok && json.data?.pricing?.packages_list) {
        try {
          const parsed = JSON.parse(json.data.pricing.packages_list);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPackages(parsed);
          }
        } catch {
          // Keep defaults
        }
      }
    } catch {
      setErrorMessage('Failed to load pricing packages.');
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleUpdatePackageField = (index: number, field: keyof AdminPricingPackage, value: any) => {
    setPackages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddFeature = (pkgIndex: number) => {
    setPackages((prev) => {
      const updated = [...prev];
      updated[pkgIndex] = {
        ...updated[pkgIndex],
        features: [...updated[pkgIndex].features, 'New capability feature'],
      };
      return updated;
    });
  };

  const handleRemoveFeature = (pkgIndex: number, featureIndex: number) => {
    setPackages((prev) => {
      const updated = [...prev];
      const newFeatures = updated[pkgIndex].features.filter((_, i) => i !== featureIndex);
      updated[pkgIndex] = { ...updated[pkgIndex], features: newFeatures };
      return updated;
    });
  };

  const handleUpdateFeature = (pkgIndex: number, featureIndex: number, text: string) => {
    setPackages((prev) => {
      const updated = [...prev];
      const newFeatures = [...updated[pkgIndex].features];
      newFeatures[featureIndex] = text;
      updated[pkgIndex] = { ...updated[pkgIndex], features: newFeatures };
      return updated;
    });
  };

  const handleSaveAllPackages = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          sectionName: 'pricing',
          items: {
            packages_list: JSON.stringify(packages),
          },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Failed to update pricing packages.');
      }

      showNotification('Pricing packages saved to database successfully!');
    } catch (err: any) {
      showNotification(err.message || 'Error saving packages', true);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setPackages(DEFAULT_PACKAGES);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>TRANSPARENT PRICING & TIERS</span>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-tight">
            Manage Pricing Packages
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-body">
            Edit Starter (₹5,999), Professional (₹12,999), and Premium (₹21,999+) packages, deliverables, and CTA text.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl glass-panel border border-white/15 text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSaveAllPackages}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] disabled:opacity-50 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Packages'}</span>
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
          <span>Loading pricing configurations...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg, pIdx) => (
            <div
              key={pkg.id}
              className={`rounded-3xl glass-panel p-6 border transition-all duration-300 space-y-5 flex flex-col justify-between ${
                pkg.isPopular
                  ? 'border-[#FF1053] bg-white/[0.05] shadow-[0_10px_40px_rgba(230,0,76,0.2)]'
                  : 'border-white/15 bg-white/[0.02]'
              }`}
            >
              <div className="space-y-4">
                {/* Popular Toggle & Tier Label */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-mono text-[10px] text-[#FF1053] font-bold uppercase tracking-wider">
                    {pkg.tierNumber} • {pkg.tierSubtitle}
                  </span>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[10px] font-mono">
                    <input
                      type="checkbox"
                      checked={pkg.isPopular || false}
                      onChange={(e) => handleUpdatePackageField(pIdx, 'isPopular', e.target.checked)}
                      className="rounded text-[#FF1053] focus:ring-0 bg-white/10 border-white/20"
                    />
                    <span className="text-white/80">Popular</span>
                  </label>
                </div>

                {/* Package Name & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                      Package Name
                    </label>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => handleUpdatePackageField(pIdx, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white font-heading font-black text-sm focus:outline-none focus:border-[#FF1053]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                      Starting Price
                    </label>
                    <input
                      type="text"
                      value={pkg.startingPrice}
                      onChange={(e) => handleUpdatePackageField(pIdx, 'startingPrice', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white font-heading font-black text-sm text-[#FF1053] focus:outline-none focus:border-[#FF1053]"
                    />
                  </div>
                </div>

                {/* Price Note */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    Price Subtitle / Note
                  </label>
                  <input
                    type="text"
                    value={pkg.priceNote}
                    onChange={(e) => handleUpdatePackageField(pIdx, 'priceNote', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                  />
                </div>

                {/* Value Proposition */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    Value Proposition
                  </label>
                  <textarea
                    rows={2}
                    value={pkg.valueProposition}
                    onChange={(e) => handleUpdatePackageField(pIdx, 'valueProposition', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-body focus:outline-none focus:border-[#FF1053] resize-none"
                  />
                </div>

                {/* Features List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                      Included Deliverables ({pkg.features.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature(pIdx)}
                      className="text-[10px] font-mono text-[#FF1053] hover:underline flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Feature</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-1.5">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleUpdateFeature(pIdx, fIdx, e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF1053]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(pIdx, fIdx)}
                          className="p-1 rounded text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button Text */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    Button CTA Label
                  </label>
                  <input
                    type="text"
                    value={pkg.ctaText}
                    onChange={(e) => handleUpdatePackageField(pIdx, 'ctaText', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono uppercase tracking-wider font-bold focus:outline-none focus:border-[#FF1053]"
                  />
                </div>
              </div>

              {/* Bottom Card Summary Pill */}
              <div className="pt-3 border-t border-white/10 text-center">
                <span className="text-[10px] font-mono text-white/40">
                  Selects: "{pkg.name} — {pkg.startingPrice}" on public website
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
