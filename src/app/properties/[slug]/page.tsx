'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { 
  MapPin, ShieldCheck, Compass, Calendar, Phone, 
  Share2, Heart, Scale, CheckCircle2, ArrowRight, 
  ExternalLink, Building2, Droplets, Zap, Check 
} from 'lucide-react';
import { PROPERTIES, COMPANY_INFO } from '@/data/mockData';
import { formatLakhs, formatCent, formatSqFt, formatExactINR } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import PropertyCard from '@/components/properties/PropertyCard';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isFavourite, toggleFavourite, inCompare, addToCompare, removeFromCompare, openSiteVisitModal, showToast } = useApp();

  const property = PROPERTIES.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="pt-36 pb-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-brand-navy">Property Not Found</h2>
        <p className="text-sm text-brand-muted mt-2">The property listing you requested may have been sold or removed.</p>
        <Link href="/properties" className="mt-4 inline-block px-6 py-2.5 bg-brand-electric text-white font-bold rounded-xl text-xs">
          Browse Available Properties
        </Link>
      </div>
    );
  }

  const isFav = isFavourite(property.id);
  const isComp = inCompare(property.id);

  const images = property.gallery.length > 0 ? property.gallery : [property.featuredImage];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard! 📋', 'success');
    }
  };

  // Similar properties
  const similarProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb row */}
        <div className="flex items-center justify-between mb-6 text-xs font-mono uppercase tracking-wider text-brand-secondary">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-brand-primary">Properties</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold line-clamp-1">{property.title}</span>
          </div>

          <div className="flex items-center gap-2 font-sans normal-case tracking-normal">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-brand-border hover:border-brand-primary text-brand-navy flex items-center gap-1.5 transition-colors"
              title="Share Property"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-secondary" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => isComp ? removeFromCompare(property.id) : addToCompare(property.id)}
              className={`p-2 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isComp ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-border text-brand-navy hover:border-brand-primary'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isComp ? 'In Compare' : 'Compare'}</span>
            </button>
            <button
              onClick={() => toggleFavourite(property.id)}
              className={`p-2 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isFav ? 'bg-red-500 text-white border-red-500' : 'bg-white border-brand-border text-brand-navy hover:text-red-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Shortlisted' : 'Shortlist'}</span>
            </button>
          </div>
        </div>

        {/* Header Title & Pricing Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 bg-white p-6 sm:p-8 rounded-xl border border-brand-border shadow-sm">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Link 
                href={`/projects/${property.projectSlug}`}
                className="px-3 py-1 bg-brand-midnight text-white text-xs font-bold rounded-md hover:bg-brand-primary transition-colors"
              >
                Project: {property.projectTitle}
              </Link>
              <span className="px-3 py-1 bg-brand-ice text-brand-primary text-xs font-bold rounded-md border border-brand-softblue/40">
                {property.status}
              </span>
              <span className="px-3 py-1 bg-brand-foliage/10 text-brand-darkgreen text-xs font-bold rounded-md border border-brand-foliage/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-foliage" />
                DTCP #{property.dtcpNumber}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              {property.title}
            </h1>

            <p className="text-xs sm:text-sm text-brand-secondary mt-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span>{property.location} • {property.corridor}</span>
            </p>
          </div>

          <div className="text-left md:text-right bg-brand-cloudwhite p-4 rounded-lg border border-brand-border w-full md:w-auto">
            <span className="text-[11px] uppercase font-mono font-bold text-brand-secondary tracking-wider block">
              Package Price
            </span>
            <div className="text-3xl font-black text-brand-navy">
              {formatLakhs(property.totalPrice)}
            </div>
            <span className="text-xs font-bold text-brand-primary block mt-0.5">
              ₹{property.pricePerCent.toFixed(2)} Lakhs / Cent
            </span>
          </div>
        </div>

        {/* Gallery & Main Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Visual Gallery & Dossier Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Viewer */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-brand-border bg-brand-ice shadow-sm">
                <Image
                  src={images[activeImageIndex] || property.featuredImage}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-brand-primary scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specs Matrix */}
            <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm">
              <h3 className="text-base font-bold text-brand-navy mb-4">Property Specifications</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-brand-cloudwhite border border-brand-border">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Cent Area</span>
                  <strong className="text-base font-black text-brand-navy">{property.areaCents} Cents</strong>
                  <span className="text-[10px] text-brand-secondary block">{formatSqFt(property.areaSqFt)}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-brand-cloudwhite border border-brand-border">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Orientation</span>
                  <strong className="text-base font-black text-brand-navy flex items-center gap-1">
                    <Compass className="w-4 h-4 text-brand-primary" />
                    {property.facing}
                  </strong>
                  <span className="text-[10px] text-brand-secondary block">Vedic Vaastu</span>
                </div>

                <div className="p-3.5 rounded-lg bg-brand-cloudwhite border border-brand-border">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Road Width</span>
                  <strong className="text-base font-black text-brand-navy">{property.roadWidthFt} Feet</strong>
                  <span className="text-[10px] text-brand-secondary block">Blacktop Tar Road</span>
                </div>

                <div className="p-3.5 rounded-lg bg-brand-cloudwhite border border-brand-border">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Construction</span>
                  <strong className="text-base font-black text-brand-darkgreen">Ready Now</strong>
                  <span className="text-[10px] text-brand-secondary block">Immediate Possession</span>
                </div>
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">Executive Description</h3>
                <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-brand-navy mb-3">
                  Key Investment Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {property.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-brand-navy font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Approvals Verification Box */}
              <div className="p-5 rounded-lg bg-brand-botanical/20 border border-brand-foliage/30 space-y-3">
                <div className="flex items-center gap-2 text-brand-darkgreen font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-foliage" />
                  <span>Comprehensive Legal Due-Diligence Complete</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-darkgreen/90">
                  <div>• DTCP Sanction Order: <strong>{property.dtcpNumber}</strong></div>
                  <div>• TNRERA Registration: <strong>{property.reraNumber}</strong></div>
                  <div>• 30-Year Nil Encumbrance Certificate verified</div>
                  <div>• 85% Bank Loan pre-sanctioned with SBI & HDFC</div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm">
              <h3 className="text-base font-bold text-brand-navy mb-4">Infrastructure & Amenities Provided</h3>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-brand-cloudwhite border border-brand-border text-xs font-semibold text-brand-navy flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Site Visit Booking & Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking Card */}
            <div className="bg-white rounded-xl p-6 border border-brand-border shadow-sm space-y-5 sticky top-28">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-brand-primary tracking-widest block mb-1">
                  On-Site Inspection
                </span>
                <h3 className="text-xl font-bold text-brand-navy">
                  Schedule a Physical Site Visit
                </h3>
                <p className="text-xs text-brand-secondary mt-1">
                  We provide free AC cab pickup and drop from anywhere in Coimbatore.
                </p>
              </div>

              <div className="p-3 bg-brand-cloudwhite rounded-lg border border-brand-border text-xs space-y-1">
                <div><strong className="text-brand-navy">Inspecting:</strong> {property.title}</div>
                <div><strong className="text-brand-navy">Listed Price:</strong> {formatLakhs(property.totalPrice)}</div>
                <div><strong className="text-brand-navy">Distance to IT Park:</strong> {property.distanceToITParkKm} KM</div>
              </div>

              <button
                onClick={() => openSiteVisitModal(property.projectTitle, property.title)}
                className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-royal text-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Site Visit Tour</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20V.V%20Properties,%20I%20am%20interested%20in%20inspecting%20${encodeURIComponent(property.title)}%20(${property.location}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-brand-darkgreen hover:bg-brand-foliage text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Enquire via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full py-2.5 px-4 rounded-lg border border-brand-border hover:border-brand-primary text-brand-navy font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-brand-secondary" />
                <span>Call Sales: {COMPANY_INFO.phone}</span>
              </a>

              <div className="pt-2 text-[11px] text-center text-brand-secondary">
                Zero obligation. Original DTCP orders & parent deeds shown on-site.
              </div>
            </div>

          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-brand-border">
            <div className="mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-1">
                RELATED OPPORTUNITIES
              </span>
              <h3 className="text-2xl font-bold text-brand-navy">
                More Verified Coimbatore Listings
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
