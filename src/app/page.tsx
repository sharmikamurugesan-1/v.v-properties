'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, Calendar, Phone, CheckCircle2, 
  ArrowRight, Check, Compass, RotateCcw
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PROJECTS, PROPERTIES, COMPANY_INFO } from '@/data/mockData';
import PropertyCard from '@/components/properties/PropertyCard';
import LocationIntelligence from '@/components/locations/LocationIntelligence';

export default function HomePage() {
  const { openSiteVisitModal, showToast } = useApp();

  // Property Discovery Filters (Section 4)
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');

  // Filtered properties backed by actual data
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      if (selectedLocation !== 'all' && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      if (selectedType !== 'all' && prop.type !== selectedType) {
        return false;
      }
      if (selectedBudget === 'under20' && prop.totalPrice > 25) return false;
      if (selectedBudget === '20to50' && (prop.totalPrice < 20 || prop.totalPrice > 55)) return false;
      if (selectedBudget === 'above50' && prop.totalPrice < 50) return false;
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.totalPrice - b.totalPrice;
      if (selectedSort === 'price-high') return b.totalPrice - a.totalPrice;
      if (selectedSort === 'area-high') return b.areaCents - a.areaCents;
      return 0;
    });
  }, [selectedLocation, selectedType, selectedBudget, selectedSort]);

  // Section 7 Form State
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitProject, setVisitProject] = useState('Tech Valley — Saravanampatti');
  const [visitDate, setVisitDate] = useState('');
  const [cabRequired, setCabRequired] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName.trim() || !visitPhone.trim()) {
      showToast('Please provide your full name and phone number.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast(`Site tour requested for ${visitName}. Our team will contact you shortly.`, 'success');
  };

  return (
    <div className="flex flex-col w-full bg-[#FAFAF8] text-[#162438] font-sans antialiased">
      
      {/* =========================================================================
          1. HERO: FULL-BLEED PHOTO, ONE HEADLINE, ONE SUBLINE, ONE PRIMARY CTA
          ========================================================================= */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-start px-6 lg:px-16 overflow-hidden">
        {/* Full-Bleed Photo Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="V.V Properties Architectural Residence"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle warm cinematic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        </div>

        {/* Hero Content: Pure, Spacious, Architectural Elegance */}
        <div className="relative z-10 max-w-4xl text-left pt-24 sm:pt-28 pb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.12] max-w-2xl break-words">
            Spaces of quiet distinction.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl font-sans font-light leading-relaxed mt-4 sm:mt-6">
            Master-planned residential land and bespoke villas in Coimbatore’s prime growth corridors.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-white text-[#0E2138] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-white/95 transition-all shadow-md"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Blueprint to Building Section (Built in Phase 2) */}
      <div id="blueprint-to-building" />

      {/* =========================================================================
          3. FEATURED PROJECTS: REFINED EDITORIAL PRESENTATION
          ========================================================================= */}
      <section id="featured-projects" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/[0.08] pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
                Selected Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#0E2138] tracking-tight">
                Featured Developments
              </h2>
            </div>

            <Link
              href="/projects"
              className="text-xs font-sans font-semibold text-[#102B50] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Project 1: Tech Valley — Saravanampatti */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Project Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EEEEEC] shadow-sm group">
                <Image
                  src={PROJECTS[0].bannerImage}
                  alt={PROJECTS[0].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-sans font-medium text-[#64748B] uppercase tracking-wider block">
                  Saravanampatti, Coimbatore
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0E2138] tracking-tight mt-1">
                  {PROJECTS[0].name.split('—')[0]}
                </h3>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed font-light">
                {PROJECTS[0].overview}
              </p>

              {/* Specifications */}
              <div className="pt-2 border-t border-black/[0.06] space-y-2 text-xs text-[#334155]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Starting Value</span>
                  <span className="font-semibold text-[#0E2138]">₹{PROJECTS[0].priceStartingPerCent} L / Cent</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Approvals</span>
                  <span className="text-[#475569]">{PROJECTS[0].dtcpNumber}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Registration</span>
                  <span className="text-[#475569]">{PROJECTS[0].reraNumber}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/projects/${PROJECTS[0].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#102B50] hover:underline"
                >
                  <span>Explore Master Plan & Plots</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

          {/* Project 2: The Garden City — Kovilpalayam */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8">
            
            {/* Project Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EEEEEC] shadow-sm group">
                <Image
                  src={PROJECTS[1].bannerImage}
                  alt={PROJECTS[1].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-sans font-medium text-[#64748B] uppercase tracking-wider block">
                  Kovilpalayam, Coimbatore
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0E2138] tracking-tight mt-1">
                  {PROJECTS[1].name.split('—')[0]}
                </h3>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed font-light">
                {PROJECTS[1].overview}
              </p>

              {/* Specifications */}
              <div className="pt-2 border-t border-black/[0.06] space-y-2 text-xs text-[#334155]">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#64748B]">Starting Value</span>
                  <span className="font-semibold text-[#0E2138]">₹{PROJECTS[1].priceStartingPerCent} L / Cent</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Approvals</span>
                  <span className="text-[#475569]">{PROJECTS[1].dtcpNumber}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-black/[0.04]">
                  <span className="text-[#64748B]">Registration</span>
                  <span className="text-[#475569]">{PROJECTS[1].reraNumber}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/projects/${PROJECTS[1].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#102B50] hover:underline"
                >
                  <span>Explore Master Plan & Plots</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. PROPERTY DISCOVERY (Search & Filter Without Neon or Clutter)
          ========================================================================= */}
      <section id="property-discovery" className="py-24 sm:py-32 px-6 lg:px-16 bg-[#F4F4F1] border-y border-black/[0.06] text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
                Inventory
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2138] tracking-tight">
                Available Plots & Residences
              </h2>
            </div>

            <Link
              href="/properties"
              className="text-xs font-sans font-semibold text-[#102B50] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Minimal Filter Bar */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-black/[0.06]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div>
                <label className="text-[11px] font-sans text-[#64748B] uppercase tracking-wider block mb-1">
                  Corridor
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                >
                  <option value="all">All Corridors</option>
                  <option value="Saravanampatti">Saravanampatti</option>
                  <option value="Kovilpalayam">Kovilpalayam</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-sans text-[#64748B] uppercase tracking-wider block mb-1">
                  Classification
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                >
                  <option value="all">All Classifications</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Luxury Villa">Luxury Villa</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-sans text-[#64748B] uppercase tracking-wider block mb-1">
                  Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                >
                  <option value="all">All Budgets</option>
                  <option value="under20">Under ₹25 Lakhs</option>
                  <option value="20to50">₹20 Lakhs – ₹55 Lakhs</option>
                  <option value="above50">Above ₹50 Lakhs</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-sans text-[#64748B] uppercase tracking-wider block mb-1">
                  Sort
                </label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area-high">Area: Largest First</option>
                </select>
              </div>

            </div>

            <div className="mt-3 pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#64748B]">
              <span>
                Showing <strong className="text-[#0E2138]">{filteredProperties.length}</strong> verified properties
              </span>
              {(selectedLocation !== 'all' || selectedType !== 'all' || selectedBudget !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedType('all');
                    setSelectedBudget('all');
                    setSelectedSort('featured');
                  }}
                  className="text-[#102B50] font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-black/[0.06] space-y-3">
              <Compass className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <h4 className="text-base font-serif text-[#0E2138]">No properties match this filter</h4>
              <button
                onClick={() => {
                  setSelectedLocation('all');
                  setSelectedType('all');
                  setSelectedBudget('all');
                }}
                className="px-4 py-2 bg-[#0E2138] text-white text-xs font-sans font-medium rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          5. LOCATION INTELLIGENCE (Saravanampatti vs Kovilpalayam)
          ========================================================================= */}
      <section id="location-intelligence" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-7xl mx-auto space-y-14">
          
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
              className="text-xs font-sans font-semibold text-[#102B50] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Commute Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <LocationIntelligence />

        </div>
      </section>

      {/* =========================================================================
          6. TRUST AND BUYING PROCESS (Clear 4-Step Journey)
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
            
            <div className="space-y-3">
              <span className="text-xs font-sans font-bold text-[#64748B] tracking-widest block">01</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Digital Demarcation</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Inspect cadastral plot boundaries, road centerlines, and stone pillars on our interactive CAD plan.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-sans font-bold text-[#64748B] tracking-widest block">02</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Title Due Diligence</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Review certified 30-year Nil Encumbrance Certificates and High Court legal opinions before proceeding.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-sans font-bold text-[#64748B] tracking-widest block">03</span>
              <h3 className="text-lg font-serif text-[#0E2138]">On-Site Inspection</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Inspect physical plot boundaries, blacktop roads, and groundwater levels with free doorstep cab pickup.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-sans font-bold text-[#64748B] tracking-widest block">04</span>
              <h3 className="text-lg font-serif text-[#0E2138]">Deed Registration</h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                Direct deed execution at the Sub-Registrar office with clear possession and dedicated Patta name transfer.
              </p>
            </div>

          </div>

          {/* Standards strip with clear TODO placeholders */}
          <div className="pt-8 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-6 text-xs text-[#475569]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Sanctioned Layouts ({COMPANY_INFO.reraOfficeRegistration})</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Direct Developer Pricing • 0% Brokerage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#102B50]" />
              <span>Track Record: {COMPANY_INFO.satisfiedFamilies}</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CONVERSION SECTION: COMPACT SITE VISIT ENQUIRY & DIRECT ACCESS
          ========================================================================= */}
      <section id="conversion-section" className="py-28 sm:py-36 px-6 lg:px-16 bg-[#FAFAF8] text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#64748B] block">
              Site Inspection
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E2138] tracking-tight">
              Arrange a Personal Tour
            </h2>
            <p className="text-sm text-[#475569] font-light leading-relaxed">
              Inspect physical plot demarcations, road widths, and water quality with our senior development team.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-black/[0.06]">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#102B50] text-white mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-[#0E2138]">Tour Request Received</h4>
                <p className="text-xs text-[#64748B] max-w-md mx-auto">
                  Thank you, {visitName}. Our team will contact you at {visitPhone} to confirm details for {visitProject}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-[#102B50] hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickVisitSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      placeholder="e.g. Ramesh Krishnan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      placeholder="+91 98422 00000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                      Development
                    </label>
                    <select
                      value={visitProject}
                      onChange={(e) => setVisitProject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                    >
                      <option value="Tech Valley — Saravanampatti">Tech Valley (Saravanampatti)</option>
                      <option value="The Garden City — Kovilpalayam">The Garden City (Kovilpalayam)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 bg-[#FAFAF8] text-xs text-[#0E2138] focus:outline-none focus:border-[#102B50]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="cabToggle"
                    checked={cabRequired}
                    onChange={(e) => setCabRequired(e.target.checked)}
                    className="w-4 h-4 text-[#102B50] rounded border-black/20 focus:ring-[#102B50]"
                  />
                  <label htmlFor="cabToggle" className="text-xs text-[#334155] font-sans select-none">
                    Include complimentary doorstep AC cab pickup & drop
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#0E2138] hover:bg-[#1A365D] text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                >
                  Confirm Site Visit
                </button>
              </form>
            )}
          </div>

          {/* Direct Office Reference with TODO placeholders */}
          <div className="text-center text-xs text-[#64748B] space-y-1">
            <p>Direct Inquiries: {COMPANY_INFO.phone}</p>
            <p>{COMPANY_INFO.officeAddress}</p>
          </div>

        </div>
      </section>

    </div>
  );
}
