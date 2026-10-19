import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Download,
  RefreshCw,
  LogOut,
  ArrowUpRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  FileText,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Inbox,
} from 'lucide-react';
import type { AdminUser, DashboardStats, Enquiry } from './types';

interface AdminDashboardProps {
  user: AdminUser;
  token: string;
  onLogout: () => void;
  onBackToWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  token,
  onLogout,
  onBackToWebsite,
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Selected Enquiry for Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const getHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dashboard/stats', {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }, [getHeaders]);

  // Fetch Enquiries List
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        status: statusFilter,
        service: serviceFilter,
        priority: priorityFilter,
        search: searchQuery,
      });

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`, {
        headers: getHeaders(),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setEnquiries(data.data);
        setTotalCount(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getHeaders, page, statusFilter, serviceFilter, priorityFilter, searchQuery]);

  useEffect(() => {
    fetchStats();
    fetchEnquiries();
  }, [fetchStats, fetchEnquiries]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
    fetchEnquiries();
  };

  // Open Enquiry Detail
  const openEnquiryDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSelectedEnquiry(data.data);
      }
    } catch (err) {
      console.error('Error fetching detail:', err);
    }
  };

  // Quick Status Update
  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        // Update local list
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: data.data.status } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(data.data);
        }
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Quick Priority Update
  const updateEnquiryPriority = async (id: string, newPriority: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ priority: newPriority }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, priority: data.data.priority } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to update priority:', err);
    }
  };

  // Add Internal Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;

    try {
      setSavingNote(true);
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/notes`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ note: newNoteText.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSelectedEnquiry(data.data);
        setNewNoteText('');
        // Update in table list
        setEnquiries((prev) =>
          prev.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const params = new URLSearchParams({
      status: statusFilter,
      service: serviceFilter,
    });
    // Trigger download
    window.open(`/api/admin/enquiries/export/csv?${params.toString()}`, '_blank');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
      case 'LOW':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
      default:
        return 'bg-white/10 text-white/70 border border-white/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      case 'CONTACTED':
        return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40';
      case 'QUALIFIED':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/40';
      case 'PROPOSAL_SENT':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
      case 'CONVERTED':
        return 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-bold';
      case 'CLOSED':
        return 'bg-white/10 text-white/50 border border-white/20';
      default:
        return 'bg-white/10 text-white/70 border border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#080104] text-white flex flex-col font-sans selection:bg-[#E6004C] selection:text-white">
      {/* 1. Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#080104]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="font-heading font-black text-xl tracking-tight text-white flex items-center space-x-2">
              <span>ECLIPT</span>
              <span className="text-[#FF1053]">Ø</span>
              <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[#E6004C]/20 border border-[#E6004C]/40 text-[#FF1053]">
                ADMIN
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Database Online (SQLite/PostgreSQL Ready)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 font-mono text-xs text-white/70">
              <User className="w-3.5 h-3.5 text-[#FF1053]" />
              <span className="font-bold text-white">{user.name || 'Admin'}</span>
              <span className="text-white/40">({user.role})</span>
            </div>

            <button
              onClick={onBackToWebsite}
              className="text-xs font-mono px-3.5 py-1.5 rounded-xl glass-panel border border-white/15 text-white/80 hover:text-white hover:border-[#FF1053] transition-colors flex items-center space-x-1.5"
            >
              <span>Public Website</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl glass-panel border border-white/15 text-white/60 hover:text-red-400 hover:border-red-500/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 2. Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Enquiries */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                TOTAL ENQUIRIES
              </span>
              <div className="p-2.5 rounded-xl bg-[#E6004C]/15 border border-[#E6004C]/30 text-[#FF1053]">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white">
              {stats?.totalEnquiries ?? 0}
            </div>
            <div className="mt-2 text-xs font-mono text-white/40">Permanent DB records</div>
          </div>

          {/* Card 2: New Today */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                NEW TODAY
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white">
              {stats?.newToday ?? 0}
            </div>
            <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center space-x-1">
              <span>● Requires fast initial contact</span>
            </div>
          </div>

          {/* Card 3: In Active Pipeline */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                ACTIVE PIPELINE
              </span>
              <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white">
              {(stats?.statusCounts?.QUALIFIED ?? 0) +
                (stats?.statusCounts?.PROPOSAL_SENT ?? 0) +
                (stats?.statusCounts?.CONTACTED ?? 0)}
            </div>
            <div className="mt-2 text-xs font-mono text-white/40">Qualified & Proposals</div>
          </div>

          {/* Card 4: Converted / Wins */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                CONVERTED CLIENTS
              </span>
              <div className="p-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366]">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white">
              {stats?.statusCounts?.CONVERTED ?? 0}
            </div>
            <div className="mt-2 text-xs font-mono text-[#25D366]">
              Win Rate: {stats?.conversionRate ?? 0}%
            </div>
          </div>
        </div>

        {/* 3. Search, Filters & Actions Toolbar */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by client name, email, company, ref ID (e.g. EC-2026)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#E6004C]"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-[#0c0205] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#E6004C]"
              >
                <option value="ALL">Status: All</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="CONVERTED">Converted</option>
                <option value="CLOSED">Closed</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-[#0c0205] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#E6004C]"
              >
                <option value="ALL">Priority: All</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="NORMAL">Normal</option>
                <option value="LOW">Low</option>
              </select>

              {/* Service Filter */}
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-[#0c0205] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#E6004C]"
              >
                <option value="ALL">Scope: All</option>
                <option value="Website & 3D Web">Website & 3D Web</option>
                <option value="Custom Software">Custom Software</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Digital Marketing & Growth">Digital Marketing</option>
              </select>

              {/* Action Buttons */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                title="Refresh enquiries"
                className="p-2.5 rounded-xl glass-panel border border-white/15 text-white/70 hover:text-white hover:border-[#E6004C] transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleExportCsv}
                className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 hover:border-[#FF1053] text-white text-xs font-mono flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#FF1053]" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Enquiries Data Table */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-black text-lg text-white">
              CLIENT SUBMISSIONS ({totalCount})
            </h2>
            <div className="text-xs font-mono text-white/50">
              Page {page} of {totalPages}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4">REFERENCE</th>
                  <th className="py-3 px-4">CLIENT & CONTACT</th>
                  <th className="py-3 px-4">SERVICE / BUDGET</th>
                  <th className="py-3 px-4">PRIORITY</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/50">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF1053]" />
                      Loading enquiries from database...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40">
                      No customer enquiries found matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      onClick={() => openEnquiryDetail(enq.id)}
                    >
                      {/* Ref */}
                      <td className="py-4 px-4 font-bold text-[#FF1053]">
                        {enq.enquiryNumber}
                      </td>

                      {/* Client */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm">{enq.fullName}</div>
                        <div className="text-white/60">{enq.email}</div>
                        {enq.companyName && (
                          <div className="text-white/40 text-[11px]">{enq.companyName}</div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4">
                        <div className="text-white/90">{enq.service}</div>
                        <div className="text-white/50 text-[11px]">
                          {enq.budgetRange || 'Flexible'}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${getPriorityBadge(
                            enq.priority
                          )}`}
                        >
                          {enq.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer bg-black/60 ${getStatusBadge(
                            enq.status
                          )}`}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="QUALIFIED">Qualified</option>
                          <option value="PROPOSAL_SENT">Proposal Sent</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-white/50 text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEnquiryDetail(enq.id);
                          }}
                          className="px-3 py-1.5 rounded-xl glass-panel border border-white/10 hover:border-[#FF1053] text-white/80 hover:text-white transition-colors"
                        >
                          Manage →
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl glass-panel border border-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1 text-xs font-mono"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-white/60">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-xl glass-panel border border-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1 text-xs font-mono"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 5. Detail & Management Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 bg-[#080104] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-8">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel border border-white/20 text-white/70 hover:text-white hover:border-[#FF1053] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#FF1053] font-bold mb-1">
                <span>{selectedEnquiry.enquiryNumber}</span>
                <span>•</span>
                <span className="text-white/50">
                  {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl text-white">
                {selectedEnquiry.fullName}
              </h3>
              {selectedEnquiry.companyName && (
                <div className="text-xs font-mono text-white/60">
                  Company: {selectedEnquiry.companyName}
                </div>
              )}
            </div>

            {/* Quick Contact Action Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                  `[ECLIPTO] Proposal for ${selectedEnquiry.service} (${selectedEnquiry.enquiryNumber})`
                )}`}
                className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF1053] flex items-center space-x-2 text-xs font-mono transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF1053]" />
                <span className="truncate">{selectedEnquiry.email}</span>
              </a>

              {selectedEnquiry.phone ? (
                <>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF1053] flex items-center space-x-2 text-xs font-mono transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#FF1053]" />
                    <span>{selectedEnquiry.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedEnquiry.fullName}, Parvez Khan here from ECLIPTØ regarding your enquiry ${selectedEnquiry.enquiryNumber}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] flex items-center space-x-2 text-xs font-mono transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </>
              ) : (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 text-xs font-mono">
                  No phone provided
                </div>
              )}
            </div>

            {/* Scope & Budget Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 font-mono text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Service Scope</span>
                <span className="font-bold text-white">{selectedEnquiry.service}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Budget Tier</span>
                <span className="font-bold text-white">
                  {selectedEnquiry.budgetRange || 'Not specified'}
                </span>
              </div>
            </div>

            {/* Client Brief Message */}
            <div className="mb-6">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                PROJECT BRIEF / AMBITION
              </label>
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-sm font-sans text-white/90 whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status & Priority Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-1.5">
                  UPDATE STATUS
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => updateEnquiryStatus(selectedEnquiry.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0c0205] border border-white/20 text-white font-bold"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-1.5">
                  UPDATE PRIORITY
                </label>
                <select
                  value={selectedEnquiry.priority}
                  onChange={(e) => updateEnquiryPriority(selectedEnquiry.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0c0205] border border-white/20 text-white font-bold"
                >
                  <option value="LOW">LOW</option>
                  <option value="NORMAL">NORMAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
            </div>

            {/* Internal Private Notes Section */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center space-x-2 font-mono text-xs uppercase text-white/60">
                <FileText className="w-4 h-4 text-[#FF1053]" />
                <span>CONFIDENTIAL INTERNAL NOTES</span>
              </div>

              {selectedEnquiry.internalNotes && (
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-white/80 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {selectedEnquiry.internalNotes}
                </div>
              )}

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add private note (e.g. Call scheduled, budget negotiated)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#E6004C]"
                />
                <button
                  type="submit"
                  disabled={savingNote || !newNoteText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#E6004C] hover:bg-[#FF1053] text-white text-xs font-mono font-bold disabled:opacity-50 transition-colors flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </form>
            </div>

            {/* Activity History Audit Trail */}
            {selectedEnquiry.activities && selectedEnquiry.activities.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-3">
                  ACTIVITY AUDIT TIMELINE
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto font-mono text-[11px]">
                  {selectedEnquiry.activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <span className="text-white/80">{act.description}</span>
                      <span className="text-white/40 text-[10px]">
                        {new Date(act.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
