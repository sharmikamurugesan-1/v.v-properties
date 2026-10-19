'use client';

import React from 'react';
import Link from 'next/link';
import PropertyComparisonTable from '@/components/compare/PropertyComparisonTable';
import { Scale } from 'lucide-react';

export default function ComparePage() {
  return (
    <div className="pt-28 pb-20 bg-brand-softwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-steel mb-4">
          <Link href="/" className="hover:text-brand-electric">Home</Link>
          <span>/</span>
          <span className="text-brand-navy font-semibold">Compare Properties</span>
        </div>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-electric text-xs font-bold rounded-full mb-2">
            <Scale className="w-4 h-4" />
            Objective Side-by-Side Analysis
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
            Property Comparison Matrix
          </h1>
          <p className="text-sm text-brand-muted mt-2 max-w-2xl">
            Compare prices, DTCP approval orders, internal road widths, and distance to CHIL SEZ IT Park to make a well-informed land purchase.
          </p>
        </div>

        <PropertyComparisonTable />

      </div>
    </div>
  );
}
