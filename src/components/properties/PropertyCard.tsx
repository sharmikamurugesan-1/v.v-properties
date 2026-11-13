'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Scale, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Property } from '@/types';
import { formatLakhs } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const { isFavourite, toggleFavourite, inCompare, addToCompare, removeFromCompare, openSiteVisitModal } = useApp();

  const isFav = isFavourite(property.id);
  const isComp = inCompare(property.id);

  const [imgSrc, setImgSrc] = useState(
    property.featuredImage || '/images/projects/the-garden-city.png'
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E2EBF3] hover:border-[#1565C0]/30 hover:shadow-lg shadow-sm transition-all duration-300 flex flex-col h-full">

      {/* ── Image ─────────────────────────────────────────────────── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7FAFD]">
        <Image
          src={imgSrc}
          alt={property.title}
          fill
          unoptimized
          onError={() => setImgSrc('/images/hero-villa.png')}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Top left: project name only (no DTCP ID) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-[#0E2138]/80 backdrop-blur-sm text-white text-[11px] font-bold rounded-lg tracking-wide uppercase">
            {property.projectTitle}
          </span>
        </div>

        {/* Top right: save + compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => { e.preventDefault(); isComp ? removeFromCompare(property.id) : addToCompare(property.id); }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isComp ? 'bg-[#1565C0] text-white' : 'bg-white/90 text-[#0E2138] hover:text-[#1565C0]'}`}
            title="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavourite(property.id); }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-[#0E2138] hover:text-red-500'}`}
            title="Save"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom: Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-medium block">Package Price</span>
            <span className="text-xl font-bold text-white">{formatLakhs(property.totalPrice)}</span>
          </div>
          <span className="text-[11px] font-semibold text-white bg-black/40 px-2 py-0.5 rounded-lg">
            ₹{property.pricePerCent.toFixed(2)} L / Cent
          </span>
        </div>
      </div>

      {/* ── Card Body ─────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-grow gap-3">

        {/* Location + title */}
        <div>
          <div className="flex items-center gap-1 text-xs text-[#94AAC0] mb-1">
            <MapPin className="w-3 h-3 text-[#1565C0] flex-shrink-0" />
            <span>{property.location}</span>
          </div>
          <Link href={`/properties/${property.slug}`}>
            <h3 className="text-sm font-bold text-[#0E2138] hover:text-[#1565C0] transition-colors line-clamp-2 leading-snug">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <button
            onClick={() => openSiteVisitModal(property.projectTitle, property.title)}
            className="flex-1 py-2.5 rounded-lg border border-[#C8DFF0] text-[#0E2138] hover:border-[#1565C0] hover:text-[#1565C0] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            View Properties
          </button>
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 py-2.5 rounded-lg bg-[#0E2138] hover:bg-[#1565C0] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
