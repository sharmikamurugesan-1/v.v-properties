'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import { PROPERTIES } from '@/data/mockData';

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return PROPERTIES;
    return PROPERTIES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.projectTitle.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.corridor.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Single Search Bar ─────────────────────────────────────── */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94AAC0] pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search properties by name or location..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-[#C8DFF0] bg-[#F7FAFD] text-sm text-[#0E2138] placeholder:text-[#94AAC0] focus:outline-none focus:border-[#1565C0] focus:bg-white transition-colors shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#E2EBF3] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-[#4A6278]" />
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-[#4A6278] pl-1">
            {filteredProperties.length}{' '}
            {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* ── Property Cards ─────────────────────────────────────────── */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-[#0E2138]">No properties found</p>
            <p className="text-sm text-[#4A6278] mt-1">
              Try a different name or location.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#1565C0] text-white text-sm font-semibold hover:bg-[#0D47A1] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
