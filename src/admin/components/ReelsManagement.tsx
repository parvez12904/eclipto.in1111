import React, { useState, useEffect, useCallback } from 'react';
import {
  Film,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Play,
  UploadCloud,
  FileVideo,
} from 'lucide-react';
import type { AdminReel } from '../types';

interface ReelsManagementProps {
  token: string;
}

export const ReelsManagement: React.FC<ReelsManagementProps> = ({ token }) => {
  const [reels, setReels] = useState<AdminReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<AdminReel | null>(null);
  const [deletingReel, setDeletingReel] = useState<AdminReel | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isPublished, setIsPublished] = useState<boolean>(true);

  const getHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Load all reels
  const fetchReels = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/reels', {
        headers: getHeaders(),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setReels(json.data);
      } else {
        setErrorMessage(json.message || 'Failed to load reels.');
      }
    } catch {
      setErrorMessage('Network error while loading reels.');
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCaption('');
    setVideoUrl('');
    setThumbnailUrl('');
    setInstagramUrl('');
    setDisplayOrder(reels.length + 1);
    setIsPublished(true);
  };

  const handleOpenAdd = () => {
    resetForm();
    setDisplayOrder(reels.length + 1);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (reel: AdminReel) => {
    setEditingReel(reel);
    setTitle(reel.title);
    setCaption(reel.caption || '');
    setVideoUrl(reel.videoUrl);
    setThumbnailUrl(reel.thumbnailUrl || '');
    setInstagramUrl(reel.instagramUrl || '');
    setDisplayOrder(reel.displayOrder);
    setIsPublished(reel.isPublished);
  };

  // Upload Video or Thumbnail directly
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isThumbnail = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const res = await fetch('/api/admin/reels/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        if (isThumbnail) {
          setThumbnailUrl(json.url);
        } else {
          setVideoUrl(json.url);
        }
        showNotification(
          `${isThumbnail ? 'Thumbnail image' : 'Video file'} uploaded successfully!`
        );
      } else {
        showNotification(json.message || 'Upload failed', true);
      }
    } catch {
      showNotification('File upload error', true);
    } finally {
      setUploading(false);
    }
  };

  // Submit Add Reel
  const handleCreateReel = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/reels', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          caption: caption || null,
          mediaType: 'VIDEO',
          videoUrl,
          thumbnailUrl: thumbnailUrl || null,
          instagramUrl: instagramUrl || null,
          displayOrder: Number(displayOrder),
          isPublished,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Failed to create reel.');
      }

      showNotification('Reel created and published successfully!');
      setIsAddModalOpen(false);
      resetForm();
      fetchReels();
    } catch (err: any) {
      showNotification(err.message || 'Error creating reel', true);
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Edit Reel
  const handleUpdateReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;
    setActionLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/reels/${editingReel.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          caption: caption || null,
          mediaType: 'VIDEO',
          videoUrl,
          thumbnailUrl: thumbnailUrl || null,
          instagramUrl: instagramUrl || null,
          displayOrder: Number(displayOrder),
          isPublished,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Failed to update reel.');
      }

      showNotification('Reel updated successfully!');
      setEditingReel(null);
      fetchReels();
    } catch (err: any) {
      showNotification(err.message || 'Error updating reel', true);
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Publish Status
  const handleTogglePublish = async (reelId: string) => {
    try {
      const res = await fetch(`/api/admin/reels/${reelId}/toggle-publish`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        showNotification(json.message || 'Status updated');
        setReels((prev) =>
          prev.map((r) => (r.id === reelId ? { ...r, isPublished: !r.isPublished } : r))
        );
      } else {
        showNotification(json.message || 'Failed to toggle status', true);
      }
    } catch {
      showNotification('Network error toggling status', true);
    }
  };

  // Delete Reel
  const handleDeleteConfirm = async () => {
    if (!deletingReel) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/reels/${deletingReel.id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        showNotification('Reel deleted permanently.');
        setDeletingReel(null);
        setReels((prev) => prev.filter((r) => r.id !== deletingReel.id));
      } else {
        showNotification(json.message || 'Failed to delete reel', true);
      }
    } catch {
      showNotification('Network error while deleting reel', true);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-[#FF1053] font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Film className="w-4 h-4" />
            <span>REELS & MOTION CONTENT</span>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-tight">
            Manage Website Reels
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-body">
            Add, edit, reorder, and publish/unpublish video reels displayed on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-display text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] transition-all shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW REEL</span>
        </button>
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

      {/* Reels List Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 font-mono text-white/60 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF1053]" />
          <span>Loading reels from database...</span>
        </div>
      ) : reels.length === 0 ? (
        <div className="py-16 text-center rounded-2xl glass-panel border border-white/10 p-8 space-y-4">
          <Film className="w-10 h-10 text-white/30 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-white">No Reels Found</h3>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            You haven't added any reels yet. Click "Add New Reel" to create your first video showcase.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#E6004C] text-white text-xs font-mono uppercase tracking-wider font-bold"
          >
            Create First Reel
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className={`rounded-2xl glass-panel border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                reel.isPublished
                  ? 'border-white/15 bg-white/[0.03] hover:border-[#FF1053]/50'
                  : 'border-white/5 bg-black/40 opacity-70'
              }`}
            >
              {/* Top Media Preview Area */}
              <div className="relative aspect-[16/9] w-full bg-black/80 overflow-hidden border-b border-white/10 group">
                {reel.thumbnailUrl ? (
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a0108] to-[#080104]">
                    <Film className="w-8 h-8 text-white/20" />
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 z-10">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      reel.isPublished
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}
                  >
                    {reel.isPublished ? '● PUBLISHED' : '○ DRAFT'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono text-white/80">
                    Order: {reel.displayOrder}
                  </span>
                </div>

                {/* Direct Video Link Tag */}
                <a
                  href={reel.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/80 hover:text-white hover:border-[#FF1053] flex items-center space-x-1 transition-all z-10"
                >
                  <Play className="w-2.5 h-2.5 text-[#FF1053]" />
                  <span>Test URL</span>
                </a>
              </div>

              {/* Reel Metadata */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-base text-white tracking-tight line-clamp-1 mb-1">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 font-body mb-3">
                    {reel.caption || 'No caption provided.'}
                  </p>

                  <div className="flex items-center space-x-3 text-[11px] font-mono text-white/50 mb-3">
                    <span>Views: {reel.views || '0'}</span>
                    <span>•</span>
                    <span>Likes: {reel.likes || '0'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleTogglePublish(reel.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 ${
                      reel.isPublished
                        ? 'text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
                        : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30'
                    }`}
                    title={reel.isPublished ? 'Unpublish reel' : 'Publish reel'}
                  >
                    {reel.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(reel)}
                      className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      title="Edit reel"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingReel(reel)}
                      className="p-1.5 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete reel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {(isAddModalOpen || editingReel) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-white/20 bg-[#0d0206] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingReel(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1053] font-bold block mb-1">
                {editingReel ? 'EDIT REEL SPECIFICATION' : 'ADD NEW REEL TO WEBSITE'}
              </span>
              <h3 className="font-heading font-black text-2xl text-white">
                {editingReel ? 'Update Reel Details' : 'Create New Reel'}
              </h3>
            </div>

            <form
              onSubmit={editingReel ? handleUpdateReel : handleCreateReel}
              className="space-y-4 text-xs font-mono"
            >
              <div>
                <label className="block uppercase tracking-wider text-white/70 mb-1.5">
                  Reel Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Gen 3D Web Experiences"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#FF1053] transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-white/70 mb-1.5">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter a description or hashtags for the reel..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#FF1053] transition-colors resize-none"
                />
              </div>

              {/* Video URL or File Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block uppercase tracking-wider text-white/70">
                    Video Source (URL or File Upload) *
                  </label>
                  <label className="cursor-pointer text-[11px] font-mono text-[#FF1053] hover:underline flex items-center space-x-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Video File</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => handleFileUpload(e, false)}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://cdn.example.com/videos/reel.mp4 or /uploads/videos/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#FF1053] transition-colors"
                />

                {/* Quick select custom uploaded video */}
                <div className="flex items-center justify-between pt-1 text-[10px] text-white/50">
                  <span>Direct URL or local uploaded file path</span>
                  <button
                    type="button"
                    onClick={() => setVideoUrl('/uploads/videos/eclipto-reel-custom.mp4')}
                    className="text-[#25D366] hover:underline flex items-center space-x-1"
                  >
                    <FileVideo className="w-3 h-3" />
                    <span>Use custom uploaded video</span>
                  </button>
                </div>

                {uploading && (
                  <div className="p-2 rounded-lg bg-[#FF1053]/10 border border-[#FF1053]/30 flex items-center space-x-2 text-[11px] text-[#FF1053] animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading video file to server storage...</span>
                  </div>
                )}
              </div>

              {/* Thumbnail URL or File Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block uppercase tracking-wider text-white/70">
                    Cover / Thumbnail Image (Optional)
                  </label>
                  <label className="cursor-pointer text-[11px] font-mono text-[#FF1053] hover:underline flex items-center space-x-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Cover Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => handleFileUpload(e, true)}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /uploads/thumbnails/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#FF1053] transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-white/70 mb-1.5">
                  Instagram Reel URL (Optional Link)
                </label>
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#FF1053] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-white/70 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white focus:outline-none focus:border-[#FF1053]"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center space-x-2.5 cursor-pointer py-2.5">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-[#FF1053] focus:ring-0 bg-white/10 border-white/20"
                    />
                    <span className="text-white text-xs uppercase tracking-wider">
                      Publish Immediately
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingReel(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] disabled:opacity-50 transition-all"
                >
                  {actionLoading ? 'Saving...' : editingReel ? 'Update Reel' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl glass-panel border border-red-500/30 bg-[#120206] p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 w-fit">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-heading font-black text-xl text-white">
              Delete Reel Permanently?
            </h3>
            <p className="text-xs text-white/70 font-mono leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{deletingReel.title}"</strong>?
              This reel will be removed permanently from the database and public website.
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setDeletingReel(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
