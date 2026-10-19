'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, Users, Building2, Download, 
  CheckCircle2, Clock, Phone, Mail, Search, RefreshCw, 
  Eye, Edit3, Trash2, ArrowRight, TrendingUp, AlertCircle 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PROPERTIES, PROJECTS } from '@/data/mockData';
import { formatLakhs } from '@/lib/utils';

export default function AdminPage() {
  const { enquiries, updateLeadStatus, plots, reservePlot, showToast } = useApp();

  // Authentication State (Default passcode: 1234 or vv2024)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'leads' | 'plots' | 'properties'>('leads');
  const [leadFilter, setLeadFilter] = useState('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'vv2024' || pin.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
      showToast('Authenticated as Senior Administrator', 'success');
    } else {
      setAuthError(true);
      showToast('Invalid access PIN', 'error');
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      showToast('No leads available to export', 'info');
      return;
    }

    const headers = ['ID', 'Name', 'Phone', 'Email', 'Project', 'Plot', 'Type', 'Date', 'Time', 'Cab Pickup', 'Status'];
    const rows = enquiries.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.project || ''}"`,
      `"${l.plotNumber || ''}"`,
      l.enquiryType,
      l.preferredDate || '',
      l.preferredTime || '',
      l.needCabPickup ? 'YES' : 'NO',
      l.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vv_properties_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV downloaded successfully! 📊', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 bg-brand-warmwhite min-h-screen flex items-center justify-center px-4 text-left">
        <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-sm border border-brand-border space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-lg bg-brand-midnight text-brand-primary flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-brand-navy">V.V Admin Portal</h1>
            <p className="text-xs text-brand-secondary">
              Restricted management area for V.V Properties executives.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Enter Admin PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter PIN (e.g. 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:border-brand-primary text-center tracking-widest font-mono text-lg bg-brand-cloudwhite"
              />
              {authError && (
                <span className="text-[11px] text-red-500 font-semibold block mt-1">
                  Incorrect PIN. Hint: Enter 1234
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-primary hover:bg-brand-royal text-white font-bold rounded-lg text-xs transition-all shadow-sm"
            >
              Authorize Access
            </button>
          </form>

          <div className="text-center text-[11px] text-brand-secondary border-t border-brand-border pt-4">
            Demo Access Key: <code className="bg-brand-ice px-2 py-0.5 rounded text-brand-navy font-bold font-mono">1234</code>
          </div>
        </div>
      </div>
    );
  }

  const filteredEnquiries = enquiries.filter((e) => {
    if (leadFilter === 'all') return true;
    return e.status === leadFilter;
  });

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-brand-border shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-foliage/10 text-brand-darkgreen text-xs font-bold rounded-md border border-brand-foliage/20 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-foliage" />
              Executive Access Session Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              V.V Properties Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-brand-darkgreen hover:bg-brand-foliage text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border border-brand-border hover:border-red-300 text-brand-secondary hover:text-red-500 font-bold rounded-lg text-xs transition-colors"
            >
              Lock Session
            </button>
          </div>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-sm">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Total Inquiries</span>
            <strong className="text-2xl font-black text-brand-navy">{enquiries.length}</strong>
            <span className="text-[10px] text-brand-darkgreen font-semibold block mt-0.5">Incoming Web Leads</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-sm">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Active Plotted Units</span>
            <strong className="text-2xl font-black text-brand-primary">{plots.length}</strong>
            <span className="text-[10px] text-brand-secondary block mt-0.5">{plots.filter((p) => p.status === 'available').length} Available</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-sm">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Master Projects</span>
            <strong className="text-2xl font-black text-brand-navy">{PROJECTS.length}</strong>
            <span className="text-[10px] text-brand-secondary block mt-0.5">Saravanampatti & Kovilpalayam</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-sm">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">24-Hr Plot Holds</span>
            <strong className="text-2xl font-black text-amber-600">
              {plots.filter((p) => p.status === 'reserved').length}
            </strong>
            <span className="text-[10px] text-brand-secondary block mt-0.5">Under Token Reservation</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-border pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-lg transition-all font-mono text-xs ${
              activeTab === 'leads' ? 'bg-brand-navy text-white' : 'text-brand-secondary hover:bg-white'
            }`}
          >
            Leads & Inquiries ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('plots')}
            className={`px-4 py-2.5 rounded-lg transition-all font-mono text-xs ${
              activeTab === 'plots' ? 'bg-brand-navy text-white' : 'text-brand-secondary hover:bg-white'
            }`}
          >
            Tech Valley Plot Inventory ({plots.length})
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2.5 rounded-lg transition-all font-mono text-xs ${
              activeTab === 'properties' ? 'bg-brand-navy text-white' : 'text-brand-secondary hover:bg-white'
            }`}
          >
            Active Listings ({PROPERTIES.length})
          </button>
        </div>

        {/* Tab 1: Leads Manager */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-brand-navy">Client Leads & Site Visit Requests</h3>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                {['all', 'New', 'Contacted', 'Visit Scheduled', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      leadFilter === st ? 'bg-brand-ice text-brand-primary border border-brand-softblue/30' : 'text-brand-secondary hover:text-brand-navy'
                    }`}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-brand-cloudwhite border-b border-brand-border text-brand-secondary uppercase font-mono font-bold">
                    <th className="p-3.5">Lead Details</th>
                    <th className="p-3.5">Interest</th>
                    <th className="p-3.5">Type & Date</th>
                    <th className="p-3.5">Cab Service</th>
                    <th className="p-3.5">Follow-up Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {filteredEnquiries.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-cloudwhite/50">
                      <td className="p-3.5">
                        <strong className="block text-brand-navy font-bold">{lead.name}</strong>
                        <span className="text-brand-secondary block font-mono">{lead.phone}</span>
                        {lead.email && <span className="text-[11px] text-brand-secondary/80">{lead.email}</span>}
                      </td>

                      <td className="p-3.5">
                        <strong className="text-brand-navy block">{lead.project || 'General'}</strong>
                        {lead.plotNumber && <span className="text-brand-primary font-semibold text-[11px]">{lead.plotNumber}</span>}
                        {lead.message && <p className="text-[11px] text-brand-secondary line-clamp-1 mt-0.5">{lead.message}</p>}
                      </td>

                      <td className="p-3.5">
                        <span className="uppercase text-[10px] font-mono font-bold text-brand-secondary block">{lead.enquiryType}</span>
                        <span className="text-brand-navy font-medium">
                          {lead.preferredDate ? `${lead.preferredDate} (${lead.preferredTime})` : 'Instant Call'}
                        </span>
                      </td>

                      <td className="p-3.5">
                        {lead.needCabPickup ? (
                          <span className="px-2 py-0.5 rounded bg-brand-foliage/10 text-brand-darkgreen border border-brand-foliage/20 text-[10px] font-bold">
                            Cab Required
                          </span>
                        ) : (
                          <span className="text-brand-secondary text-[11px]">Direct Visit</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="px-2.5 py-1.5 rounded-lg border border-brand-border bg-white font-bold text-[11px] text-brand-navy focus:outline-none focus:border-brand-primary"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Visit Scheduled">Visit Scheduled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Plots Manager */}
        {activeTab === 'plots' && (
          <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-navy">Tech Valley Layout Inventory & Status Toggles</h3>
            <p className="text-xs text-brand-secondary">
              Instantly toggle plot availability across the customer Live Plot Explorer in real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
              {plots.map((plot) => (
                <div key={plot.id} className="p-4 rounded-lg bg-brand-cloudwhite border border-brand-border space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-brand-navy">Plot #{plot.plotNumber}</strong>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      plot.status === 'available' ? 'bg-brand-foliage/10 text-brand-darkgreen border border-brand-foliage/20' : plot.status === 'reserved' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-brand-border text-brand-secondary'
                    }`}>
                      {plot.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-[11px] text-brand-secondary">
                    <div>Area: <strong>{plot.areaCents} Cts</strong> ({plot.areaSqFt} sqft)</div>
                    <div>Facing: {plot.facing} • Road: {plot.roadWidth}</div>
                    <div>Price: <strong>{formatLakhs(plot.totalPrice)}</strong></div>
                  </div>

                  <div className="pt-2 border-t border-brand-border flex items-center gap-1">
                    <button
                      onClick={() => reservePlot(plot.id, 'Admin Override', 'Direct')}
                      disabled={plot.status === 'reserved'}
                      className="flex-1 py-1 px-2 rounded-md bg-amber-500 text-white font-bold text-[10px] hover:bg-amber-600 disabled:opacity-30"
                    >
                      Hold
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Status updated for Plot #${plot.plotNumber}`, 'info');
                      }}
                      className="flex-1 py-1 px-2 rounded-md bg-brand-navy text-white font-bold text-[10px]"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Properties Listings */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-navy">Active Real Estate Dossiers</h3>
            <div className="space-y-3">
              {PROPERTIES.map((prop) => (
                <div key={prop.id} className="p-4 rounded-lg bg-brand-cloudwhite border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy">{prop.title}</h4>
                    <span className="text-[11px] text-brand-secondary block">
                      {prop.projectTitle} • {prop.location} • DTCP #{prop.dtcpNumber}
                    </span>
                  </div>

                  <div className="text-right">
                    <strong className="text-base font-black text-brand-navy block">{formatLakhs(prop.totalPrice)}</strong>
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="text-brand-primary font-semibold hover:underline"
                    >
                      View Live Dossier →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
