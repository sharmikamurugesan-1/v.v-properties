'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, FileCheck, CheckCircle2, Download, 
  HelpCircle, ExternalLink, Calendar, Phone, Award 
} from 'lucide-react';
import { BUYER_DUE_DILIGENCE_CHECKLIST, COMPANY_INFO } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function TrustCentrePage() {
  const { openSiteVisitModal, showToast } = useApp();
  const [checkedSteps, setCheckedSteps] = useState<number[]>([1, 2, 3]);

  const toggleCheck = (step: number) => {
    setCheckedSteps((prev) => 
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleDownloadDossier = (docName: string) => {
    showToast(`Downloading certified legal sample: ${docName}...`, 'success');
  };

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb & Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-4">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Trust Centre & Due Diligence</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-foliage/10 text-brand-darkgreen text-xs font-bold rounded-md border border-brand-foliage/20 mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-foliage" />
                Zero Litigation • Complete Clear Title Verification
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
                V.V Properties Trust Centre
              </h1>
              <p className="text-sm text-brand-secondary mt-2 max-w-2xl leading-relaxed">
                Real estate should never involve guesswork. Review our legal approvals, verified registrations, and practical 6-step land buyer due-diligence checklist.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadDossier('Complete Legal Due-Diligence Guide')}
                className="px-5 py-3 rounded-lg bg-brand-primary hover:bg-brand-royal text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Legal Dossier PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars of V.V Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">DTCP & RERA Approvals</h3>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Every layout is sanctioned by the Directorate of Town and Country Planning (DTCP) and registered with Tamil Nadu RERA. No unapproved agricultural conversions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">30-Year Parent Deed Trace</h3>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Our title chain is vetted by Senior High Court Advocates in Coimbatore for 30 consecutive years, backed by a spotless Nil Encumbrance Certificate.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy">Registered Public Gift Deeds</h3>
            <p className="text-xs text-brand-secondary leading-relaxed">
              All internal asphalt roads, solar street lighting, and open park reserves are legally gifted to the local governing body via registered gift deeds.
            </p>
          </div>
        </div>

        {/* Interactive 6-Step Due-Diligence Checklist */}
        <div id="checklist" className="bg-white rounded-xl p-6 sm:p-10 border border-brand-border shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-brand-primary tracking-widest block mb-1">
                BUYER PROTECTION GUIDE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                6-Step Land Buying Due-Diligence Checklist
              </h2>
              <p className="text-xs sm:text-sm text-brand-secondary mt-1">
                Check off each statutory requirement as you audit your property purchase.
              </p>
            </div>

            <span className="px-3.5 py-1.5 rounded-lg bg-brand-ice text-brand-primary font-mono text-xs font-bold border border-brand-softblue/30">
              {checkedSteps.length} of {BUYER_DUE_DILIGENCE_CHECKLIST.length} Completed
            </span>
          </div>

          <div className="space-y-4">
            {BUYER_DUE_DILIGENCE_CHECKLIST.map((item) => {
              const isChecked = checkedSteps.includes(item.step);
              return (
                <div
                  key={item.step}
                  onClick={() => toggleCheck(item.step)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked 
                      ? 'bg-brand-ice/40 border-brand-primary/50 shadow-sm' 
                      : 'bg-brand-cloudwhite border-brand-border hover:border-brand-primary/40'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-brand-primary text-white' : 'border-2 border-brand-border bg-white'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-brand-navy">
                        Step 0{item.step}: {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono font-bold text-brand-darkgreen bg-brand-foliage/10 border border-brand-foliage/20 px-2 py-0.5 rounded">
                        Verified by V.V Properties
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Ribbon */}
          <div className="p-6 rounded-lg bg-brand-midnight text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
            <div>
              <h4 className="text-base font-bold text-white">Need our legal team to walk you through the documents?</h4>
              <p className="text-xs text-brand-ice/80 mt-0.5">We will provide complete photocopies of all parent deeds and approvals for your independent legal counsel.</p>
            </div>

            <button
              onClick={() => openSiteVisitModal()}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-royal text-white font-bold text-xs rounded-lg transition-all shadow-sm flex-shrink-0"
            >
              Request Legal Paperwork Inspection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
