'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, Check, Plus, Scale, Compass, MapPin, 
  ShieldCheck, ArrowRight, Calendar, Sparkles 
} from 'lucide-react';
import { PROPERTIES } from '@/data/mockData';
import { formatLakhs, formatCent, formatSqFt } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function PropertyComparisonTable() {
  const { comparisonList, removeFromCompare, clearCompare, openSiteVisitModal } = useApp();
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedProperties = PROPERTIES.filter((p) => comparisonList.includes(p.id));

  if (selectedProperties.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-brand-border max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-xl bg-brand-ice text-brand-primary flex items-center justify-center mx-auto mb-4 border border-brand-softblue/30">
          <Scale className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy">No Properties Selected for Comparison</h3>
        <p className="text-sm text-brand-secondary mt-2 max-w-md mx-auto">
          Explore our verified Coimbatore listings and click the scale icon on any property to compare price, DTCP approvals, road width, and IT corridor proximity side-by-side.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/properties"
            className="px-6 py-3 rounded-lg bg-brand-primary text-white font-bold text-xs hover:bg-brand-royal transition-all shadow-sm"
          >
            Explore Coimbatore Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-left space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-brand-border shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-primary" />
            Side-by-Side Property Comparison ({selectedProperties.length}/3)
          </h2>
          <p className="text-xs text-brand-secondary">
            Direct transparent benchmark of pricing, DTCP approvals, and infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brand-navy">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="w-4 h-4 text-brand-primary rounded border-brand-border"
            />
            <span>Highlight Differences</span>
          </label>

          <button
            onClick={clearCompare}
            className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Grid (Responsive Cards on Mobile, Matrix on Desktop) */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-cloudwhite">
                <th className="p-4 sm:p-6 w-1/4 min-w-[180px] font-mono font-bold text-brand-secondary uppercase tracking-wider">
                  Features & Details
                </th>
                {selectedProperties.map((prop) => (
                  <th key={prop.id} className="p-4 sm:p-6 w-1/4 min-w-[240px] align-top">
                    <div className="relative space-y-3">
                      <button
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-ice hover:bg-red-100 hover:text-red-600 text-brand-navy flex items-center justify-center transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-brand-ice border border-brand-border">
                        <Image
                          src={prop.featuredImage}
                          alt={prop.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-brand-primary tracking-wider block">
                          {prop.projectTitle}
                        </span>
                        <h4 className="font-bold text-sm text-brand-navy line-clamp-1">{prop.title}</h4>
                        <span className="text-base font-black text-brand-navy mt-1 block">
                          {formatLakhs(prop.totalPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => openSiteVisitModal(prop.projectTitle, prop.title)}
                        className="w-full py-2 px-3 bg-brand-primary hover:bg-brand-royal text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        Book Site Visit
                      </button>
                    </div>
                  </th>
                ))}

                {/* Add more slot if < 3 */}
                {selectedProperties.length < 3 && (
                  <th className="p-4 sm:p-6 w-1/4 min-w-[200px] border-l border-dashed border-brand-border align-middle text-center bg-brand-ice/20">
                    <Link
                      href="/properties"
                      className="inline-flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-brand-primary/50 text-brand-primary hover:bg-brand-ice/50 transition-colors"
                    >
                      <Plus className="w-8 h-8 mb-2" />
                      <span className="text-xs font-bold">Add Another Property</span>
                      <span className="text-[10px] text-brand-secondary mt-1">Up to 3 properties</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-brand-border">
              {/* Location */}
              <tr className={highlightDifferences ? 'bg-amber-50/40' : ''}>
                <td className="p-4 font-bold text-brand-navy">Location & Corridor</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-navy font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      {p.location}
                    </span>
                    <span className="text-[11px] text-brand-secondary block">{p.corridor}</span>
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Price Per Cent */}
              <tr>
                <td className="p-4 font-bold text-brand-navy">Price / Cent</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-primary font-black text-sm">
                    ₹{p.pricePerCent.toFixed(2)} Lakhs
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Total Area */}
              <tr>
                <td className="p-4 font-bold text-brand-navy">Total Land Area</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-navy font-bold">
                    {p.areaCents} Cents ({p.areaSqFt} Sq.Ft)
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Approvals */}
              <tr className="bg-brand-botanical/20">
                <td className="p-4 font-bold text-brand-navy">Legal Approvals</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-darkgreen font-semibold space-y-1">
                    <div className="flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-foliage" />
                      DTCP #{p.dtcpNumber}
                    </div>
                    <div className="text-[10px] text-brand-secondary">RERA: {p.reraNumber}</div>
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Facing */}
              <tr>
                <td className="p-4 font-bold text-brand-navy">Vaastu Facing</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-navy font-medium flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-brand-primary" />
                    {p.facing} Facing
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Road Access */}
              <tr>
                <td className="p-4 font-bold text-brand-navy">Internal Road Width</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-navy font-bold">
                    {p.roadWidthFt} Feet Blacktop Tar Road
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Distance to IT Park */}
              <tr className={highlightDifferences ? 'bg-amber-50/40' : ''}>
                <td className="p-4 font-bold text-brand-navy">Distance to CHIL SEZ IT Park</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-brand-navy font-bold">
                    {p.distanceToITParkKm} KM
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Water & Power */}
              <tr>
                <td className="p-4 font-bold text-brand-navy">Water & Power</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-xs text-brand-secondary">
                    <div>{p.waterSupply}</div>
                    <div className="text-[10px] text-brand-secondary/80">{p.electricity}</div>
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>

              {/* Action row */}
              <tr className="bg-brand-cloudwhite">
                <td className="p-4 font-bold text-brand-navy">Detailed Page</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-4">
                    <Link
                      href={`/properties/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-primary font-bold hover:underline"
                    >
                      <span>View Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
                {selectedProperties.length < 3 && <td />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
