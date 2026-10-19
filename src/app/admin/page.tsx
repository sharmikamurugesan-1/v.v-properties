"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lead, LeadStatus, SiteSettings, PlotRecord } from "@/lib/store";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "settings" | "plots">("dashboard");

  // State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [plots, setPlots] = useState<PlotRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Filters & Search for Leads
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Editing Note State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, settingsRes, plotsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/settings"),
        fetch("/api/admin/plots"),
      ]);

      if (leadsRes.status === 401 || settingsRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const leadsData = await leadsRes.json();
      const settingsData = await settingsRes.json();
      const plotsData = await plotsRes.json();

      if (leadsData.leads) setLeads(leadsData.leads);
      if (settingsData.settings) setSettings(settingsData.settings);
      if (plotsData.plots) setPlots(plotsData.plots);
    } catch (err) {
      console.error("[ADMIN DATA ERROR]", err);
      showNotification("Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // Status Counts
  const counts = useMemo(() => {
    const res = {
      total: leads.length,
      new: 0,
      contacted: 0,
      site_visit: 0,
      converted: 0,
      archived: 0,
      last7Days: 0,
    };

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    for (const l of leads) {
      if (l.status in res) {
        res[l.status as keyof typeof res] += 1;
      }
      if (new Date(l.createdAt).getTime() >= sevenDaysAgo) {
        res.last7Days += 1;
      }
    }
    return res;
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => {
        const matchesSearch =
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.phone.includes(searchQuery) ||
          (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === "all" || l.status === statusFilter;
        const matchesProject = projectFilter === "all" || l.project === projectFilter;

        return matchesSearch && matchesStatus && matchesProject;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
  }, [leads, searchQuery, statusFilter, projectFilter, sortOrder]);

  // Update Lead Status
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l))
      );
      showNotification("Lead status updated");
    } catch (err) {
      showNotification("Failed to update status", "error");
    }
  };

  // Update Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, adminNotes: adminNoteInput }),
      });
      if (!res.ok) throw new Error("Failed to save note");

      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id ? { ...l, adminNotes: adminNoteInput, updatedAt: new Date().toISOString() } : l
        )
      );
      setSelectedLead(null);
      showNotification("Admin note saved");
    } catch {
      showNotification("Failed to save note", "error");
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete lead "${name}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Deletion failed");

      setLeads((prev) => prev.filter((l) => l.id !== id));
      showNotification("Lead deleted permanently");
    } catch {
      showNotification("Failed to delete lead", "error");
    }
  };

  // CSV Safe Export (Task 3 requirement: Prefix formula injection characters =, +, -, @ with ')
  const handleExportCSV = () => {
    const sanitize = (val: unknown): string => {
      if (val === null || val === undefined) return '""';
      let str = String(val).replace(/"/g, '""');
      if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
        str = `'${str}`;
      }
      return `"${str}"`;
    };

    const headers = [
      "ID",
      "Created At",
      "Full Name",
      "Phone",
      "Email",
      "Project",
      "Budget",
      "Visit Date",
      "Status",
      "User Notes",
      "Admin Notes",
      "Source",
    ];

    const rows = filteredLeads.map((l) => [
      sanitize(l.id),
      sanitize(l.createdAt),
      sanitize(l.name),
      sanitize(l.phone),
      sanitize(l.email || ""),
      sanitize(l.project),
      sanitize(l.budget || ""),
      sanitize(l.visitDate || ""),
      sanitize(l.status),
      sanitize(l.notes || ""),
      sanitize(l.adminNotes || ""),
      sanitize(l.source || ""),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `vv_properties_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("CSV Export downloaded securely");
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaveLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      const data = await res.json();
      setSettings(data.settings);
      showNotification("Site and regulatory settings saved & public pages revalidated!");
    } catch {
      showNotification("Failed to save settings", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  // Update Plot Status
  const handlePlotStatusChange = async (id: string, newStatus: "available" | "booked" | "hold") => {
    try {
      const res = await fetch("/api/admin/plots", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Plot update failed");
      setPlots((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      showNotification(`Plot ${id} updated to ${newStatus}`);
    } catch {
      showNotification("Failed to update plot status", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0B1F3A]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-[#E6E1D6] sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 relative rounded-lg overflow-hidden border border-[#E6E1D6] bg-white">
              <Image src="/brand/vv-properties-logo.jpg" alt="V.V Properties" fill className="object-cover" />
            </div>
            <div>
              <span className="font-serif text-lg font-medium block leading-none">V.V Properties</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57]">
                Admin Intelligence & Operations
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open("/", "_blank")}
              className="text-xs text-[#5B6577] hover:text-[#0B1F3A] transition-colors"
            >
              View Public Site &rarr;
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-full border border-[#E6E1D6] text-xs font-mono uppercase tracking-wider hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-xs font-medium border ${
            notification.type === "success"
              ? "bg-emerald-900 text-white border-emerald-700"
              : "bg-red-900 text-white border-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E6E1D6] pb-2 overflow-x-auto text-xs font-mono uppercase tracking-wider">
          {[
            { id: "dashboard", label: "Dashboard Overview" },
            { id: "leads", label: `Lead Pipeline (${leads.length})` },
            { id: "settings", label: "Regulatory & Pricing Controls" },
            { id: "plots", label: `Plot Inventory (${plots.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2 px-4 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-[#0B1F3A] text-white font-semibold shadow-sm"
                  : "text-[#5B6577] hover:text-[#0B1F3A] hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#E6E1D6] border-t-[#B08D57] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono uppercase tracking-widest text-[#5B6577]">
              Loading administrative records...
            </p>
          </div>
        ) : (
          <>
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6577] block">
                      Total Inquiries
                    </span>
                    <strong className="text-3xl font-serif text-[#0B1F3A] mt-1 block">{counts.total}</strong>
                    <span className="text-[10px] text-emerald-700 mt-1 block">
                      +{counts.last7Days} in last 7 days
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6577] block">
                      New (Uncontacted)
                    </span>
                    <strong className="text-3xl font-serif text-blue-900 mt-1 block">{counts.new}</strong>
                    <span className="text-[10px] text-[#5B6577] mt-1 block">Awaiting advisory call</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6577] block">
                      Site Visits
                    </span>
                    <strong className="text-3xl font-serif text-[#B08D57] mt-1 block">{counts.site_visit}</strong>
                    <span className="text-[10px] text-[#5B6577] mt-1 block">Tours scheduled</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6577] block">
                      Converted Deeds
                    </span>
                    <strong className="text-3xl font-serif text-emerald-800 mt-1 block">{counts.converted}</strong>
                    <span className="text-[10px] text-[#5B6577] mt-1 block">Registered customers</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6577] block">
                      Plot Availability
                    </span>
                    <strong className="text-3xl font-serif text-[#0B1F3A] mt-1 block">
                      {plots.filter((p) => p.status === "available").length} / {plots.length}
                    </strong>
                    <span className="text-[10px] text-[#5B6577] mt-1 block">Open for booking</span>
                  </div>
                </div>

                {/* Recent Leads Preview */}
                <div className="bg-white rounded-3xl border border-[#E6E1D6] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D6]">
                    <h3 className="font-serif text-xl font-light">Recent Inquiries</h3>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs text-[#B08D57] hover:underline font-medium"
                    >
                      View All Leads ({leads.length}) &rarr;
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <p className="text-xs text-[#5B6577] py-6 text-center">No leads recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-[#E6E1D6] text-xs">
                      {leads.slice(0, 5).map((l) => (
                        <div key={l.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <strong className="text-sm font-medium text-[#0B1F3A] block">{l.name}</strong>
                            <span className="text-[#5B6577]">
                              {l.phone} &bull; {l.project} &bull; {new Date(l.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                              l.status === "new"
                                ? "bg-blue-100 text-blue-900"
                                : l.status === "site_visit"
                                ? "bg-amber-100 text-amber-900"
                                : "bg-emerald-100 text-emerald-900"
                            }`}
                          >
                            {l.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: LEADS PIPELINE */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                {/* Toolbar */}
                <div className="bg-white p-5 rounded-3xl border border-[#E6E1D6] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search name, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-[#E6E1D6] text-xs bg-[#F7F4EE]/50 focus:outline-none focus:border-[#B08D57]"
                    />

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#E6E1D6] text-xs bg-[#F7F4EE]/50 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="site_visit">Site Visit</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>

                    <select
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#E6E1D6] text-xs bg-[#F7F4EE]/50 focus:outline-none"
                    >
                      <option value="all">All Projects</option>
                      <option value="the-garden-city">The Garden City</option>
                      <option value="tech-valley">Tech Valley</option>
                      <option value="general">General / Consultation</option>
                    </select>

                    <button
                      onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
                      className="px-3 py-2 rounded-xl border border-[#E6E1D6] text-xs font-mono text-[#5B6577] hover:bg-[#F7F4EE]"
                    >
                      Date {sortOrder === "desc" ? "↓ Newest" : "↑ Oldest"}
                    </button>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="py-2.5 px-5 rounded-full bg-[#0B1F3A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#0B1F3A]/90 transition-all flex items-center gap-2"
                  >
                    <span>Secure CSV Export</span>
                  </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-[#E6E1D6] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F7F4EE] border-b border-[#E6E1D6] text-[#5B6577] font-mono uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3.5 px-4">Contact</th>
                          <th className="py-3.5 px-4">Project & Budget</th>
                          <th className="py-3.5 px-4">Visit Date</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Notes</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E1D6]">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-[#5B6577]">
                              No inquiries matching the selected criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => {
                            const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                            return (
                              <tr key={lead.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                                <td className="py-3 px-4">
                                  <strong className="text-sm font-serif text-[#0B1F3A] block">{lead.name}</strong>
                                  <div className="flex items-center gap-2 text-[#5B6577] mt-0.5">
                                    <a href={`tel:${lead.phone}`} className="hover:text-[#0B1F3A] underline">
                                      {lead.phone}
                                    </a>
                                    {lead.email && <span>&bull; {lead.email}</span>}
                                  </div>
                                </td>

                                <td className="py-3 px-4">
                                  <span className="font-medium text-[#0B1F3A] block capitalize">
                                    {lead.project.replace(/-/g, " ")}
                                  </span>
                                  <span className="text-[#5B6577] text-[11px] block">{lead.budget || "Not stated"}</span>
                                </td>

                                <td className="py-3 px-4">
                                  {lead.visitDate ? (
                                    <span className="font-mono text-[#0B1F3A]">{lead.visitDate}</span>
                                  ) : (
                                    <span className="text-[#5B6577]">—</span>
                                  )}
                                </td>

                                <td className="py-3 px-4">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                    className="py-1 px-2.5 rounded-lg border border-[#E6E1D6] bg-white text-xs font-medium focus:outline-none"
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="site_visit">Site Visit</option>
                                    <option value="converted">Converted</option>
                                    <option value="archived">Archived</option>
                                  </select>
                                </td>

                                <td className="py-3 px-4 max-w-xs">
                                  {lead.adminNotes ? (
                                    <p className="text-[11px] text-[#0B1F3A] line-clamp-2 italic">
                                      &ldquo;{lead.adminNotes}&rdquo;
                                    </p>
                                  ) : lead.notes ? (
                                    <p className="text-[11px] text-[#5B6577] line-clamp-2">
                                      User: {lead.notes}
                                    </p>
                                  ) : (
                                    <span className="text-[#5B6577] text-[11px]">No notes</span>
                                  )}
                                  <button
                                    onClick={() => {
                                      setSelectedLead(lead);
                                      setAdminNoteInput(lead.adminNotes || "");
                                    }}
                                    className="text-[10px] text-[#B08D57] hover:underline block mt-0.5"
                                  >
                                    {lead.adminNotes ? "Edit Note" : "+ Add Note"}
                                  </button>
                                </td>

                                <td className="py-3 px-4 text-right space-x-2">
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                                      lead.name
                                    )},%20this%20is%20V.V%20Properties%20following%20up%20on%20your%20inquiry.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 inline-block text-emerald-800 hover:text-emerald-950 font-bold"
                                    title="WhatsApp client"
                                  >
                                    WA
                                  </a>
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="p-1.5 inline-block text-blue-800 hover:text-blue-950 font-bold"
                                    title="Call client"
                                  >
                                    Call
                                  </a>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id, lead.name)}
                                    className="p-1.5 inline-block text-red-600 hover:text-red-800 font-bold"
                                    title="Delete lead"
                                  >
                                    Del
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Edit Note Modal */}
                {selectedLead && (
                  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-[#E6E1D6] shadow-2xl space-y-4">
                      <h4 className="font-serif text-xl text-[#0B1F3A]">
                        Internal Note for {selectedLead.name}
                      </h4>
                      <textarea
                        rows={4}
                        value={adminNoteInput}
                        onChange={(e) => setAdminNoteInput(e.target.value)}
                        placeholder="e.g. Client requested East-facing plot 12; site visit booked for Saturday morning with cab pickup..."
                        className="w-full p-3 rounded-xl border border-[#E6E1D6] text-xs focus:outline-none focus:border-[#B08D57]"
                      />
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setSelectedLead(null)}
                          className="py-2 px-4 rounded-full border border-[#E6E1D6] text-xs hover:bg-[#F7F4EE]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotes}
                          className="py-2 px-5 rounded-full bg-[#0B1F3A] text-white text-xs font-medium"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: REGULATORY & PRICING CONTROLS */}
            {activeTab === "settings" && settings && (
              <form onSubmit={handleSaveSettings} className="space-y-8">
                {/* Company Contact Information */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E1D6] shadow-sm space-y-5">
                  <div className="border-b border-[#E6E1D6] pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
                      Company Profile
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#0B1F3A]">Official Communications Desk</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#5B6577] font-medium mb-1">Customer Phone Number</label>
                      <input
                        type="text"
                        value={settings.company.phone || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, phone: e.target.value || null },
                          })
                        }
                        placeholder="+91 98422 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E1D6] focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5B6577] font-medium mb-1">WhatsApp Business Number</label>
                      <input
                        type="text"
                        value={settings.company.whatsapp || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, whatsapp: e.target.value || null },
                          })
                        }
                        placeholder="9198422XXXXX (digits only with 91)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E1D6] focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5B6577] font-medium mb-1">Official Inquiry Email</label>
                      <input
                        type="email"
                        value={settings.company.email || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, email: e.target.value || null },
                          })
                        }
                        placeholder="contact@vvpropertiescbe.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E1D6] focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5B6577] font-medium mb-1">Registered Office Address</label>
                      <input
                        type="text"
                        value={settings.company.officeAddress || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            company: { ...settings.company, officeAddress: e.target.value || null },
                          })
                        }
                        placeholder="Sathy Main Road, Coimbatore, Tamil Nadu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E1D6] focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-[#0B1F3A] cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={settings.company.verified}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          company: { ...settings.company, verified: e.target.checked },
                        })
                      }
                      className="rounded border-[#E6E1D6] text-[#0B1F3A]"
                    />
                    <span className="font-medium">
                      Verified Contact Credentials (display publicly without TODO disclaimer)
                    </span>
                  </label>
                </div>

                {/* Per-Project Regulatory & Pricing Controls */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E1D6] shadow-sm space-y-6">
                  <div className="border-b border-[#E6E1D6] pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
                      Statutory Sanctions
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#0B1F3A]">
                      Project RERA, DTCP & Consideration Controls
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {Object.entries(settings.projects).map(([slug, p]) => (
                      <div key={slug} className="p-6 rounded-2xl bg-[#F7F4EE]/40 border border-[#E6E1D6] space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg font-medium capitalize text-[#0B1F3A]">
                            {slug.replace(/-/g, " ")}
                          </h4>
                          <span className="text-[10px] font-mono text-[#5B6577] uppercase">{slug}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <label className="block text-[#5B6577] mb-1">DTCP Sanction Number</label>
                            <input
                              type="text"
                              value={p.dtcpNumber || ""}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  projects: {
                                    ...settings.projects,
                                    [slug]: { ...p, dtcpNumber: e.target.value || null },
                                  },
                                })
                              }
                              placeholder="e.g. DTCP/CBE/124/2026"
                              className="w-full px-3 py-2 rounded-xl border border-[#E6E1D6] bg-white"
                            />
                            <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.verified.dtcp}
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    projects: {
                                      ...settings.projects,
                                      [slug]: {
                                        ...p,
                                        verified: { ...p.verified, dtcp: e.target.checked },
                                      },
                                    },
                                  })
                                }
                                className="rounded text-[#0B1F3A]"
                              />
                              <span className="text-[11px] text-[#5B6577]">Verified DTCP</span>
                            </label>
                          </div>

                          <div>
                            <label className="block text-[#5B6577] mb-1">TNRERA Registration Number</label>
                            <input
                              type="text"
                              value={p.reraNumber || ""}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  projects: {
                                    ...settings.projects,
                                    [slug]: { ...p, reraNumber: e.target.value || null },
                                  },
                                })
                              }
                              placeholder="e.g. TN/11/Layout/XXXX/2026"
                              className="w-full px-3 py-2 rounded-xl border border-[#E6E1D6] bg-white"
                            />
                            <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.verified.rera}
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    projects: {
                                      ...settings.projects,
                                      [slug]: {
                                        ...p,
                                        verified: { ...p.verified, rera: e.target.checked },
                                      },
                                    },
                                  })
                                }
                                className="rounded text-[#0B1F3A]"
                              />
                              <span className="text-[11px] text-[#5B6577]">Verified TNRERA</span>
                            </label>
                          </div>

                          <div>
                            <label className="block text-[#5B6577] mb-1">Starting Price (in Lakhs)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={p.startingPriceInLakhs ?? ""}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  projects: {
                                    ...settings.projects,
                                    [slug]: {
                                      ...p,
                                      startingPriceInLakhs: e.target.value ? parseFloat(e.target.value) : null,
                                    },
                                  },
                                })
                              }
                              placeholder="e.g. 35.5"
                              className="w-full px-3 py-2 rounded-xl border border-[#E6E1D6] bg-white"
                            />
                            <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.verified.pricing}
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    projects: {
                                      ...settings.projects,
                                      [slug]: {
                                        ...p,
                                        verified: { ...p.verified, pricing: e.target.checked },
                                      },
                                    },
                                  })
                                }
                                className="rounded text-[#0B1F3A]"
                              />
                              <span className="text-[11px] text-[#5B6577]">Publish Exact Price</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="py-3.5 px-8 rounded-full bg-[#0B1F3A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#0B1F3A]/90 transition-all shadow-md disabled:opacity-50"
                  >
                    {saveLoading ? "Saving & Revalidating..." : "Save & Revalidate Public Site"}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: PLOT AVAILABILITY */}
            {activeTab === "plots" && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E1D6] shadow-sm space-y-6">
                <div className="border-b border-[#E6E1D6] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
                    Cadastral Inventory
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#0B1F3A]">Plot Availability & Reservation Manager</h3>
                  <p className="text-xs text-[#5B6577] mt-1">
                    Toggle individual plot status. Real-time updates reflect in the public Plot Explorer immediately.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {plots.map((plot) => (
                    <div
                      key={plot.id}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        plot.status === "available"
                          ? "bg-emerald-50/50 border-emerald-300"
                          : plot.status === "hold"
                          ? "bg-amber-50/50 border-amber-300"
                          : "bg-stone/20 border-stone/50 opacity-60"
                      }`}
                    >
                      <span className="font-serif text-sm font-semibold text-[#0B1F3A] block">{plot.plotNumber}</span>
                      <span className="text-[10px] text-[#5B6577] block mt-0.5">
                        {plot.cents} Cents &bull; {plot.facing}
                      </span>
                      <select
                        value={plot.status}
                        onChange={(e) =>
                          handlePlotStatusChange(plot.id, e.target.value as "available" | "booked" | "hold")
                        }
                        className="mt-2 w-full text-[10px] py-1 px-1.5 rounded-lg border border-[#E6E1D6] bg-white font-medium focus:outline-none"
                      >
                        <option value="available">Available</option>
                        <option value="hold">Hold</option>
                        <option value="booked">Booked</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
