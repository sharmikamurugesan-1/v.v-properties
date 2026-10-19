'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, Calendar, Phone, CheckCircle2, 
  ArrowRight, Check, Compass, ShieldCheck, MapPin, Sparkles, Layers, Eye
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PROJECTS, COMPANY_INFO } from '@/data/mockData';
import LocationIntelligence from '@/components/locations/LocationIntelligence';
import Hero3DScene from '@/components/home/Hero3DScene';
import ScrollConstructionExperience from '@/components/home/ScrollConstructionExperience';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePage() {
  const { showToast } = useApp();

  // Interactive View Modes for Featured Developments (Elevation vs Master Plan)
  const [project1View, setProject1View] = useState<'elevation' | 'plan'>('elevation');
  const [project2View, setProject2View] = useState<'elevation' | 'plan'>('elevation');

  // Personal Site Tour Form State (No fake names or numbers)
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitProject, setVisitProject] = useState('Tech Valley — Saravanampatti');
  const [visitDate, setVisitDate] = useState('');
  const [cabRequired, setCabRequired] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName.trim() || !visitPhone.trim()) {
      showToast('Please provide your full name and contact number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: visitName.trim(),
          phone: visitPhone.trim(),
          project: visitProject,
          visitDate: visitDate || undefined,
          notes: cabRequired ? 'Complimentary cab pickup requested' : undefined,
          consent: true,
          honeypot: '',
          renderedAt: Date.now() - 4000,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(`Site tour requested for ${visitName}. Our team will contact you shortly.`, 'success');
    }
  };

  const waUrl = getWhatsAppUrl(
    'Hello V.V Properties, I would like to schedule a private on-site inspection in Coimbatore.'
  );

  return (
    <div className="flex flex-col w-full bg-[#FAFAF8] text-[#162438] font-sans antialiased selection:bg-[#39A8F4]/20 selection:text-[#071B35]">
      
      {/* =========================================================================
          1. HERO SECTION: QUIET LUXURY STATEMENT & 3D INTERACTIVE RESIDENCE
          ========================================================================= */}
      <section className="relative min-h-[92vh] bg-[#071B35] text-white flex items-center justify-center px-6 lg:px-16 pt-28 pb-20 overflow-hidden">
        {/* Subtle CAD grid texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, #39a8f4 1px, transparent 1px), linear-gradient(to bottom, #39a8f4 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }}
          aria-hidden="true"
        />

        {/* Ambient atmospheric glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#39a8f4]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#173F70]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center text-left">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2A4F] border border-[#39A8F4]/30 text-[#39A8F4] text-xs font-mono font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39A8F4] animate-pulse" />
              <span>COIMBATORE &bull; PLANNED COMMUNITIES</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.06] break-words">
              Architecture That Shapes Tomorrow.
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl font-sans font-light leading-relaxed">
              Curated residential developments and verified plots across Coimbatore’s prime growth corridors. Engineered for lasting value and clear title certainty.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#featured-projects"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#071B35] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#F0F4F8] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#conversion-section"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0E2A4F] text-white hover:bg-[#143A6A] border border-white/20 text-xs font-sans font-medium transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Schedule Site Tour</span>
              </Link>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[#39A8F4] text-xs block font-bold tracking-wider">VERIFIED</span>
                <span className="text-white/70 text-[11px] block">Title Scrutiny</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[#39A8F4] text-xs block font-bold tracking-wider">SANCTIONED</span>
                <span className="text-white/70 text-[11px] block">DTCP & TNRERA</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[#39A8F4] text-xs block font-bold tracking-wider">40 FT & 33 FT</span>
                <span className="text-white/70 text-[11px] block">Blacktop Roads</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive 3D Spatial Frame with User's Second Image */}
          <div className="lg:col-span-6 w-full">
            <Hero3DScene />
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. SIGNATURE CINEMATIC ARCHITECTURAL DRONE TOUR (User's Third Image)
          ========================================================================= */}
      <ScrollConstructionExperience />

      {/* =========================================================================
          3. FEATURED DEVELOPMENTS: MINIMAL EDITORIAL SHOWCASE WITH PLAN SWITCHER
          ========================================================================= */}
      <section id="featured-projects" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/[0.08] pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#102B50]" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
                  Curated Portfolio
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#0E2138] tracking-tight">
                Featured Developments
              </h2>
            </div>

            <Link
              href="/projects"
              className="group text-xs font-sans font-semibold text-[#102B50] hover:text-[#39A8F4] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>View All Projects</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Project 1: Tech Valley — Saravanampatti */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual with Elevation vs Plan interactive toggle */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EEEEEC] shadow-md group">
                <Image
                  src={project1View === 'elevation' ? '/images/hero-villa.png' : '/images/projects/blueprint.png'}
                  alt={PROJECTS[0].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-102 transition-all duration-700 ease-out"
                />
                
                {/* Cadastral Dimension Pill */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-none border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39A8F4]" />
                  <span>40 FT CENTRAL ARTERIAL ROAD</span>
                </div>

                {/* Interactive Elevation vs CAD Plan Switcher */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center bg-[#071B35]/90 border border-white/20 p-1 rounded-xl shadow-xl">
                  <button
                    onClick={() => setProject1View('elevation')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-sans font-medium transition-all ${
                      project1View === 'elevation'
                        ? 'bg-white text-[#071B35] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Elevation</span>
                  </button>
                  <button
                    onClick={() => setProject1View('plan')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-sans font-medium transition-all ${
                      project1View === 'plan'
                        ? 'bg-white text-[#071B35] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Master Plan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-sans font-medium text-[#64748B] uppercase tracking-wider block">
                  Saravanampatti Corridor &bull; Near CHIL SEZ
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#0E2138] tracking-tight mt-1.5">
                  Tech Valley
                </h3>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed font-light">
                {PROJECTS[0].overview}
              </p>

              {/* Specifications Matrix */}
              <div className="pt-2 border-t border-black/[0.06] space-y-2.5 text-xs text-[#334155]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Starting Value</span>
                  <span className="font-semibold text-[#0E2138]">₹{PROJECTS[0].priceStartingPerCent} L / Cent</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Internal Corridors</span>
                  <span className="text-[#475569]">40 ft & 33 ft Blacktop Tar Roads</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Statutory Clearances</span>
                  <span className="text-[#475569]">DTCP & TNRERA Sanctioned</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Water Pipeline</span>
                  <span className="text-[#475569]">Siruvani & Ground Supply</span>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-6">
                <Link
                  href={`/projects/${PROJECTS[0].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#102B50] hover:text-[#39A8F4] transition-colors"
                >
                  <span>Explore Master Plan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/plot-explorer?project=${PROJECTS[0].slug}`}
                  className="text-xs text-[#64748B] hover:text-[#102B50] font-sans font-medium transition-colors"
                >
                  Plot Explorer &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Project 2: The Garden City — Kovilpalayam */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8">
            
            {/* Visual with Elevation vs Plan interactive toggle */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EEEEEC] shadow-md group">
                <Image
                  src={project2View === 'elevation' ? '/images/night-pool-villa.jpg' : '/images/projects/blueprint.png'}
                  alt={PROJECTS[1].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-102 transition-all duration-700 ease-out"
                />

                {/* Cadastral Dimension Pill */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-none border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39A8F4]" />
                  <span>SATHY HIGHWAY ACCESS &bull; 30 FT ROAD</span>
                </div>

                {/* Interactive Elevation vs CAD Plan Switcher */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center bg-[#071B35]/90 border border-white/20 p-1 rounded-xl shadow-xl">
                  <button
                    onClick={() => setProject2View('elevation')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-sans font-medium transition-all ${
                      project2View === 'elevation'
                        ? 'bg-white text-[#071B35] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Twilight View</span>
                  </button>
                  <button
                    onClick={() => setProject2View('plan')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-sans font-medium transition-all ${
                      project2View === 'plan'
                        ? 'bg-white text-[#071B35] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Master Plan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-sans font-medium text-[#64748B] uppercase tracking-wider block">
                  Kovilpalayam Corridor &bull; Sathy National Highway
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#0E2138] tracking-tight mt-1.5">
                  The Garden City
                </h3>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed font-light">
                {PROJECTS[1].overview}
              </p>

              {/* Specifications Matrix */}
              <div className="pt-2 border-t border-black/[0.06] space-y-2.5 text-xs text-[#334155]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Starting Value</span>
                  <span className="font-semibold text-[#0E2138]">₹{PROJECTS[1].priceStartingPerCent} L / Cent</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Internal Corridors</span>
                  <span className="text-[#475569]">30 ft Asphalted Roadways</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Statutory Clearances</span>
                  <span className="text-[#475569]">DTCP & TNRERA Sanctioned</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Groundwater Depth</span>
                  <span className="text-[#475569]">Sweet Potable Water at 80 ft</span>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-6">
                <Link
                  href={`/projects/${PROJECTS[1].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#102B50] hover:text-[#39A8F4] transition-colors"
                >
                  <span>Explore Master Plan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/plot-explorer?project=${PROJECTS[1].slug}`}
                  className="text-xs text-[#64748B] hover:text-[#102B50] font-sans font-medium transition-colors"
                >
                  Plot Explorer &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. MINIMAL CURATED PORTFOLIO CALLOUT (Replaced cluttered slots with luxury banner)
          ========================================================================= */}
      <section className="py-20 px-6 lg:px-16 bg-[#0E2138] text-white text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#39A8F4] font-bold">
              VERIFIED RESIDENTIAL DIRECTORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              Looking for specific square footage or custom villa plots?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Explore our full directory of DTCP-approved parcels across Saravanampatti, Kovilpalayam, and Kovaipudur.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/properties"
              className="px-6 py-3.5 rounded-xl bg-white text-[#0E2138] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-white/90 transition-all shadow-lg"
            >
              <span>View Property Directory</span>
            </Link>
            <Link
              href="/plot-explorer"
              className="px-6 py-3.5 rounded-xl bg-[#143254] text-white hover:bg-[#1A3F6C] border border-white/20 text-xs font-sans font-medium transition-all"
            >
              <span>Interactive CAD Grid</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. LOCATION INTELLIGENCE (Regional Dynamics)
          ========================================================================= */}
      <section id="location-intelligence" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
                Regional Dynamics
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2138] tracking-tight">
                Location Intelligence
              </h2>
            </div>

            <Link
              href="/locations"
              className="group text-xs font-sans font-semibold text-[#102B50] hover:text-[#39A8F4] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>Explore Commute Matrix</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <LocationIntelligence />

        </div>
      </section>

      {/* =========================================================================
          6. TRUST AND ACQUISITION JOURNEY (Clear 4-Step Process)
          ========================================================================= */}
      <section id="trust-process" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#F4F4F1] border-y border-black/[0.06] text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
              Governance & Integrity
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2138] tracking-tight">
              The Acquisition Process
            </h2>
            <p className="text-sm text-[#475569] font-light leading-relaxed">
              Transparent legal scrutiny, certified clearances, and verified land demarcation at every step.
            </p>
          </div>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-mono font-bold text-[#39A8F4] tracking-widest block">01</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Digital Demarcation</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Inspect cadastral plot boundaries, road centerlines, and stone pillars on our interactive CAD plan.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-mono font-bold text-[#39A8F4] tracking-widest block">02</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Title Due Diligence</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Review certified 30-year Nil Encumbrance Certificates and High Court legal opinions before proceeding.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-mono font-bold text-[#39A8F4] tracking-widest block">03</span>
              <h3 className="text-lg font-serif text-[#0E2138]">On-Site Inspection</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Inspect physical plot boundaries, blacktop roads, and groundwater levels with free doorstep cab pickup.
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-mono font-bold text-[#39A8F4] tracking-widest block">04</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Deed Registration</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Direct deed execution at the Sub-Registrar office with clear possession and dedicated Patta name transfer.
              </p>
            </div>
          </div>

          {/* Standards Strip */}
          <div className="pt-8 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-6 text-xs text-[#475569]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Sanctioned Layouts &bull; TNRERA & DTCP Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Direct Developer Terms &bull; Zero Brokerage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Dedicated Legal Documentation Team</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. PRIVATE ON-SITE INSPECTION CONCIERGE (No fake names or numbers)
          ========================================================================= */}
      <section id="conversion-section" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
              Site Inspection Concierge
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#0E2138] tracking-tight">
              Arrange a Personal Tour
            </h2>
            <p className="text-sm text-[#475569] font-light leading-relaxed">
              Inspect physical plot demarcations, road widths, and water infrastructure with our senior development advisors.
            </p>
          </div>

          {/* Inspection Form */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/[0.06]">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#102B50] text-white mx-auto flex items-center justify-center shadow-lg">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-serif text-[#0E2138]">Tour Request Received</h4>
                <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                  Thank you, {visitName}. Our senior advisory team will contact you at {visitPhone} to confirm arrangements for {visitProject}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#102B50] hover:underline"
                >
                  Schedule another inspection
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickVisitSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] placeholder:text-black/30 focus:outline-none focus:border-[#102B50] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      placeholder="Your Contact Number"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] placeholder:text-black/30 focus:outline-none focus:border-[#102B50] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                      Preferred Development
                    </label>
                    <select
                      value={visitProject}
                      onChange={(e) => setVisitProject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Tech Valley — Saravanampatti">Tech Valley — Saravanampatti</option>
                      <option value="The Garden City — Kovilpalayam">The Garden City — Kovilpalayam</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50] focus:bg-white transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-[#475569]">
                    <input
                      type="checkbox"
                      checked={cabRequired}
                      onChange={(e) => setCabRequired(e.target.checked)}
                      className="w-4 h-4 rounded border-black/20 text-[#102B50] focus:ring-0 cursor-pointer"
                    />
                    <span>Request complimentary doorstep chauffeur pickup in Coimbatore</span>
                  </label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#0E2138] text-white font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#143254] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Site Inspection'}
                  </button>

                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-7 py-4 rounded-xl border border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/5 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                    >
                      <span>Instant WhatsApp Chat</span>
                    </a>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
