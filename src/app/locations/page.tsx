'use client';

import React from 'react';
import Link from 'next/link';
import LocationIntelligence from '@/components/locations/LocationIntelligence';
import { MapPin, Navigation, TrendingUp } from 'lucide-react';

export default function LocationsPage() {
  return (
    <div className="pt-28 pb-20 bg-brand-softwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-steel mb-4">
          <Link href="/" className="hover:text-brand-electric">Home</Link>
          <span>/</span>
          <span className="text-brand-navy font-semibold">Location Intelligence</span>
        </div>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-electric text-xs font-bold rounded-full mb-2">
            <TrendingUp className="w-4 h-4" />
            Coimbatore Growth Corridors & Commute Benchmarks
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
            Coimbatore Location Intelligence
          </h1>
          <p className="text-sm text-brand-muted mt-2 max-w-2xl">
            Evaluate annual land appreciation, infrastructure drivers, proximity to CHIL SEZ IT Park, Kumaraguru College, and Coimbatore International Airport.
          </p>
        </div>

        <LocationIntelligence />

      </div>
    </div>
  );
}
