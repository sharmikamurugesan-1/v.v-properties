'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, Award, Users, CheckCircle2, 
  MapPin, Phone, Mail, Sparkles, Building2, HeartHandshake 
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/mockData';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-3">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">About Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-primary text-xs font-mono font-bold rounded-md border border-brand-softblue/30 mb-3">
            <Building2 className="w-4 h-4" />
            14 YEARS OF REAL ESTATE EXCELLENCE IN COIMBATORE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl">
            Building Dreams, Delivering Values
          </h1>
          <p className="text-sm sm:text-base text-brand-secondary mt-3 max-w-2xl leading-relaxed">
            Founded with a steadfast mission to eliminate ambiguity from Coimbatore real estate, V.V Properties has evolved into one of the city&apos;s most respected land developers.
          </p>
        </div>

        {/* Narrative & Visual Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
              Architectural Luxury Meets Legal Integrity
            </h2>

            <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
              At V.V Properties, we believe that purchasing a piece of land is often the single largest emotional and financial milestone for a family. That’s why we refuse to take shortcuts. Every project we launch undergoes exhaustive legal scrutiny, 30-year title searches by Senior High Court Advocates, and full Directorate of Town & Country Planning (DTCP) layout approval before a single stone is laid.
            </p>

            <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
              From our flagship <strong>Tech Valley</strong> development just 3 minutes from CHIL SEZ in Saravanampatti, to our high-yield plotted enclave <strong>The Garden City</strong> at Kovilpalayam, our developments provide modern blacktop tar roads, underground potable water, solar avenue lighting, and lush park reservations.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white border border-brand-border shadow-sm">
                <strong className="text-2xl font-black text-brand-primary">26+</strong>
                <span className="block text-xs text-brand-navy font-bold mt-1">Delivered Projects</span>
                <p className="text-[11px] text-brand-secondary">Across Saravanampatti, Kovilpalayam, and Kalapatti</p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-brand-border shadow-sm">
                <strong className="text-2xl font-black text-brand-primary">3,200+</strong>
                <span className="block text-xs text-brand-navy font-bold mt-1">Homeowners & Investors</span>
                <p className="text-[11px] text-brand-secondary">Prompt registration track record</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="V.V Properties Coimbatore"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-ice block">V.V Properties Heritage</span>
              <h3 className="text-xl font-bold">Rooted in Coimbatore, Built on Transparency</h3>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-brand-border shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase font-mono font-bold text-brand-primary tracking-widest block mb-1">
              OUR PRINCIPLES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy">
              The Four Cornerstones of V.V Properties
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-lg bg-brand-cloudwhite border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-md bg-brand-ice text-brand-primary flex items-center justify-center font-bold font-mono">1</div>
              <h4 className="font-bold text-brand-navy text-sm">Verified Clear Titles</h4>
              <p className="text-xs text-brand-secondary leading-relaxed">No disputes, zero agricultural encumbrances, and unbroken parent deed chains.</p>
            </div>

            <div className="p-5 rounded-lg bg-brand-cloudwhite border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-md bg-brand-ice text-brand-primary flex items-center justify-center font-bold font-mono">2</div>
              <h4 className="font-bold text-brand-navy text-sm">Strict DTCP & RERA Sanction</h4>
              <p className="text-xs text-brand-secondary leading-relaxed">Every individual plot boundary complies with government town-planning guidelines.</p>
            </div>

            <div className="p-5 rounded-lg bg-brand-cloudwhite border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-md bg-brand-ice text-brand-primary flex items-center justify-center font-bold font-mono">3</div>
              <h4 className="font-bold text-brand-navy text-sm">Ready Infrastructure</h4>
              <p className="text-xs text-brand-secondary leading-relaxed">40ft & 33ft asphalt tar roads, underground water pipelines, and LED lighting before handover.</p>
            </div>

            <div className="p-5 rounded-lg bg-brand-cloudwhite border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-md bg-brand-ice text-brand-primary flex items-center justify-center font-bold font-mono">4</div>
              <h4 className="font-bold text-brand-navy text-sm">Pre-Approved Bank Loans</h4>
              <p className="text-xs text-brand-secondary leading-relaxed">Direct project clearance letters from SBI, HDFC, ICICI, and Canara Bank up to 85%.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
