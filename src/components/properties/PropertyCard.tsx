'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, Scale, MapPin, Compass, ArrowRight, 
  ShieldCheck, Calendar 
} from 'lucide-react';
import { Property } from '@/types';
import { formatLakhs, formatCent, formatSqFt } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const { 
    isFavourite, 
    toggleFavourite, 
    inCompare, 
    addToCompare, 
    removeFromCompare, 
    openSiteVisitModal,
    t 
  } = useApp();

  const isFav = isFavourite(property.id);
  const isComp = inCompare(property.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isComp) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavourite(property.id);
  };

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-border hover:border-brand-electric/40 shadow-subtle hover:shadow-architectural transition-all duration-300 flex flex-col h-full text-left">
      
      {/* Editorial Image Container with 16:10 ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-cloudwhite">
        <Image
          src={property.featuredImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Subtle vignette gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 bg-brand-midnight/85 backdrop-blur-md text-white text-[10px] font-bold rounded tracking-wider uppercase">
            {property.projectTitle}
          </span>
          <span className="px-2 py-0.5 bg-brand-botanical text-brand-darkgreen border border-brand-foliage/30 text-[10px] font-bold rounded">
            DTCP #{property.dtcpNumber}
          </span>
        </div>

        {/* Quick Save and Compare Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isComp
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-white/90 backdrop-blur-md text-brand-navy hover:bg-white hover:text-brand-electric'
            }`}
            title={isComp ? 'Remove from Compare' : 'Add to Compare'}
            aria-label="Compare property"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFavClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isFav
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-white/90 backdrop-blur-md text-brand-navy hover:bg-white hover:text-red-500'
            }`}
            title={isFav ? 'Remove from Shortlist' : 'Save to Shortlist'}
            aria-label="Save to shortlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-brand-ice font-semibold block">
              Package Price
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {formatLakhs(property.totalPrice)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-brand-ice bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
              ₹{property.pricePerCent.toFixed(2)} L / Cent
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Location & Corridor */}
          <div className="flex items-center justify-between text-xs text-brand-subtext mb-1">
            <span className="flex items-center gap-1 font-medium text-brand-text truncate">
              <MapPin className="w-3 h-3 text-brand-electric flex-shrink-0" />
              {property.location}
            </span>
            <span className="text-[10px] text-brand-subtext font-medium">
              {property.corridor.split(' ')[0]}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block group/title">
            <h3 className="text-sm sm:text-base font-bold text-brand-navy group-hover/title:text-brand-electric transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Architectural Specs Ribbon */}
          <div className="grid grid-cols-3 gap-1.5 py-2.5 my-2 border-y border-brand-divider text-center text-xs">
            <div className="p-1 rounded bg-brand-cloudwhite">
              <span className="block text-[9px] text-brand-subtext uppercase font-semibold">Area</span>
              <strong className="text-brand-navy font-bold text-xs">{property.areaCents} Cts</strong>
            </div>

            <div className="p-1 rounded bg-brand-cloudwhite">
              <span className="block text-[9px] text-brand-subtext uppercase font-semibold">Facing</span>
              <strong className="text-brand-navy font-bold text-xs flex items-center justify-center gap-0.5">
                <Compass className="w-2.5 h-2.5 text-brand-electric" />
                {property.facing}
              </strong>
            </div>

            <div className="p-1 rounded bg-brand-cloudwhite">
              <span className="block text-[9px] text-brand-subtext uppercase font-semibold">Road</span>
              <strong className="text-brand-navy font-bold text-xs">{property.roadWidthFt} Ft</strong>
            </div>
          </div>

          {/* Location Proximity Cue */}
          <div className="text-[11px] text-brand-subtext flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-foliage" />
            <span><strong>{property.distanceToITParkKm} KM</strong> to CHIL SEZ IT Park</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => openSiteVisitModal(property.projectTitle, property.title)}
            className="flex-1 py-2 px-2.5 rounded-lg border border-brand-border hover:border-brand-electric text-brand-navy hover:text-brand-electric font-semibold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <Calendar className="w-3 h-3 text-brand-electric" />
            <span>Site Visit</span>
          </button>

          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 py-2 px-2.5 rounded-lg bg-brand-navy hover:bg-brand-royal text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
