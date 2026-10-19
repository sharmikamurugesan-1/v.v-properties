'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, Scale, Calendar, CheckCircle2, 
  MapPin, Clock, ArrowRight, Trash2, Sparkles, Building2 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PROPERTIES } from '@/data/mockData';
import PropertyCard from '@/components/properties/PropertyCard';
import { formatLakhs } from '@/lib/utils';

export default function DashboardPage() {
  const { 
    favourites, 
    comparisonList, 
    enquiries, 
    clearCompare, 
    openSiteVisitModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shortlist' | 'comparisons' | 'visits'>('shortlist');

  const shortlistedProperties = PROPERTIES.filter((p) => favourites.includes(p.id));
  const comparedProperties = PROPERTIES.filter((p) => comparisonList.includes(p.id));

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-3">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Buyer Dashboard</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-1">
                PERSONAL PROPERTY HUB
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                My Saved Portfolio & Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-brand-secondary mt-1">
                Manage your shortlisted Coimbatore plots, side-by-side comparisons, and scheduled site-visit bookings.
              </p>
            </div>

            <button
              onClick={() => openSiteVisitModal()}
              className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-royal text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Site Visit</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-border pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('shortlist')}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all font-mono text-xs ${
              activeTab === 'shortlist'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-brand-secondary hover:text-brand-navy hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'shortlist' ? 'fill-current text-red-400' : ''}`} />
            <span>Shortlisted Plots ({shortlistedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comparisons')}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all font-mono text-xs ${
              activeTab === 'comparisons'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-brand-secondary hover:text-brand-navy hover:bg-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Active Comparisons ({comparedProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all font-mono text-xs ${
              activeTab === 'visits'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-brand-secondary hover:text-brand-navy hover:bg-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>My Enquiries & Visits ({enquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: Shortlisted Properties */}
        {activeTab === 'shortlist' && (
          <div className="space-y-6">
            {shortlistedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shortlistedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-16 text-center border border-brand-border shadow-sm">
                <Heart className="w-12 h-12 text-brand-secondary/40 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-brand-navy">Your Shortlist is Empty</h3>
                <p className="text-xs text-brand-secondary mt-1 max-w-sm mx-auto">
                  Browse our Coimbatore listings and tap the heart icon on any plot to save it for easy review.
                </p>
                <Link
                  href="/properties"
                  className="mt-4 inline-block px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-brand-royal transition-colors"
                >
                  Explore Listings
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Comparisons */}
        {activeTab === 'comparisons' && (
          <div className="space-y-6">
            {comparedProperties.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-brand-border shadow-sm">
                  <span className="text-xs font-bold text-brand-navy">
                    {comparedProperties.length} Properties in Comparison Matrix
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={clearCompare}
                      className="text-xs text-red-500 font-semibold hover:underline"
                    >
                      Clear Comparison
                    </button>
                    <Link
                      href="/compare"
                      className="px-4 py-2 bg-brand-primary text-white font-bold text-xs rounded-lg hover:bg-brand-royal transition-colors shadow-sm"
                    >
                      Open Full Matrix →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {comparedProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-16 text-center border border-brand-border shadow-sm">
                <Scale className="w-12 h-12 text-brand-secondary/40 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-brand-navy">No Properties Selected to Compare</h3>
                <p className="text-xs text-brand-secondary mt-1 max-w-sm mx-auto">
                  Add up to 3 plots or villas to evaluate DTCP approvals, dimensions, and IT park commute side-by-side.
                </p>
                <Link
                  href="/properties"
                  className="mt-4 inline-block px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-brand-royal transition-colors"
                >
                  Browse Listings
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Enquiries & Site Visits */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {enquiries.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-cloudwhite border-b border-brand-border text-brand-secondary uppercase font-mono tracking-wider font-bold">
                        <th className="p-4">Reference</th>
                        <th className="p-4">Project / Plot</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Cab Service</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-brand-cloudwhite/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-brand-navy">{enq.id}</td>
                          <td className="p-4 font-bold text-brand-navy">
                            {enq.project || 'General Inquiry'}
                            {enq.plotNumber && <span className="text-brand-primary block text-[11px] font-semibold">{enq.plotNumber}</span>}
                          </td>
                          <td className="p-4 uppercase text-[11px] font-mono text-brand-secondary font-semibold">{enq.enquiryType}</td>
                          <td className="p-4 text-brand-navy font-medium">
                            {enq.preferredDate ? `${enq.preferredDate} at ${enq.preferredTime}` : 'Immediate Contact'}
                          </td>
                          <td className="p-4">
                            {enq.needCabPickup ? (
                              <span className="px-2 py-0.5 rounded bg-brand-foliage/10 text-brand-darkgreen border border-brand-foliage/20 text-[10px] font-bold">
                                Cab Requested
                              </span>
                            ) : (
                              <span className="text-brand-secondary text-[11px]">Own Transport</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              enq.status === 'Visit Scheduled' 
                                ? 'bg-brand-ice text-brand-primary border border-brand-softblue/30'
                                : enq.status === 'Contacted'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-brand-foliage/10 text-brand-darkgreen border border-brand-foliage/20'
                            }`}>
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-16 text-center border border-brand-border shadow-sm">
                <Calendar className="w-12 h-12 text-brand-secondary/40 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-brand-navy">No Active Requests Yet</h3>
                <p className="text-xs text-brand-secondary mt-1 max-w-sm mx-auto">
                  When you submit an enquiry, book a site visit, or place a 24-hr plot hold, it will appear here.
                </p>
                <button
                  onClick={() => openSiteVisitModal()}
                  className="mt-4 px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-brand-royal transition-colors"
                >
                  Schedule Your First Tour
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
