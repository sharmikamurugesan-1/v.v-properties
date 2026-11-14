'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoreVertical, Edit3, Type, Trash2, MapPin, Heart, Scale } from 'lucide-react';
import { Property } from '@/types';
import { formatLakhs } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const { isFavourite, toggleFavourite, inCompare, addToCompare, removeFromCompare } = useApp();

  const isFav = isFavourite(property.id);
  const isComp = inCompare(property.id);

  const [imgSrc, setImgSrc] = useState(
    property.featuredImage || '/images/projects/the-garden-city.png'
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState(property.title);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    const next = prompt('Enter the new property name:', title);
    if (next && next.trim()) {
      setTitle(next.trim());
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setIsDeleted(true);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    window.location.href = `/admin?edit=${property.id}`;
  };

  return (
    <article className="group relative h-56 w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-[#0D0221] shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* ── Full Bleed Architectural Image ───────────────────────── */}
      <Image
        src={imgSrc}
        alt={title}
        fill
        unoptimized
        onError={() => setImgSrc('/images/hero-villa.png')}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* ── Top Left: Project Badge ─────────────────────────────── */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="px-2.5 py-1 bg-[#0D0221]/80 backdrop-blur-md text-white border border-white/15 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
          {property.projectTitle}
        </span>
      </div>

      {/* ── Top Right: Vertical 3-Dots (⋮) Menu Button ────────── */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-[#0D0221] hover:bg-white flex items-center justify-center shadow-md transition-transform hover:scale-110 focus:outline-none"
          aria-label="Property options"
          title="Property options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* 3-Dots Action Dropdown: Edit, Rename, Delete */}
        {menuOpen && (
          <div
            className="absolute right-0 top-10 w-36 bg-white rounded-xl shadow-2xl border border-slate-200 p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleEdit}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#4062BB] hover:bg-[#CDE6F5]/20 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#4062BB]" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={handleRename}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#4062BB] hover:bg-[#CDE6F5]/20 transition-colors"
            >
              <Type className="w-3.5 h-3.5 text-[#4062BB]" />
              <span>Rename</span>
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#F06543] hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#F06543]" />
              <span>Delete</span>
            </button>
            <div className="my-1 border-t border-slate-100" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                isFav ? toggleFavourite(property.id) : toggleFavourite(property.id);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Complete Overlay on Hover / Pointer: Zero Bottom Bar ─── */}
      <Link
        href={`/properties/${property.slug}`}
        className="absolute inset-0 bg-gradient-to-t from-[#0D0221]/95 via-[#0D0221]/60 via-45% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white z-20 cursor-pointer"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#CDE6F5] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#4062BB] flex-shrink-0" />
            <span>{property.location}</span>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-medium">Package Price</span>
              <span className="text-lg font-extrabold text-white">{formatLakhs(property.totalPrice)}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#CDE6F5] bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
              ₹{property.pricePerCent.toFixed(2)} L / Cent
            </span>
          </div>
        </div>
      </Link>

    </article>
  );
}
