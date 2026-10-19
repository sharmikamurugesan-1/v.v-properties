'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Navigation, Building2, GraduationCap, Cross, 
  Plane, Bus, Train, ArrowUpRight, TrendingUp, CheckCircle2, Compass
} from 'lucide-react';
import { LOCATION_HUBS, PROJECTS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function LocationIntelligence() {
  const [selectedHubId, setSelectedHubId] = useState<string>('saravanampatti');
  const { openSiteVisitModal } = useApp();

  const activeHub = LOCATION_HUBS.find((h) => h.id === selectedHubId) || LOCATION_HUBS[0];

  return (
    <div className="w-full text-left">
      {/* Corridor Selector Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {LOCATION_HUBS.map((hub) => {
          const isSelected = hub.id === selectedHubId;
          return (
            <button
              key={hub.id}
              onClick={() => setSelectedHubId(hub.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-brand-navy text-white border-brand-navy shadow-subtle'
                  : 'bg-white text-brand-text border-brand-border hover:border-brand-navy'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-electric' : 'text-brand-subtext'}`} />
              <span>{hub.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                isSelected ? 'bg-white/20 text-white' : 'bg-brand-cloudwhite text-brand-subtext'
              }`}>
                {hub.tamilName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Corridor Profile & Key Drivers */}
        <div className="lg:col-span-5 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 shadow-subtle border border-brand-border flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-botanical text-brand-darkgreen text-[11px] font-bold rounded mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Annual Appreciation: {activeHub.averageAppreciation}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                {activeHub.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-brand-electric mt-0.5">
                {activeHub.tagline}
              </p>
              <p className="text-xs text-brand-subtext leading-relaxed mt-2.5">
                {activeHub.description}
              </p>
            </div>

            {/* Key Growth Drivers */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-subtext mb-2">
                Key Growth & Infrastructure Drivers
              </h4>
              <div className="space-y-1.5">
                {activeHub.keyDrivers.map((driver, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-brand-text font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-foliage flex-shrink-0" />
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Employers */}
            <div className="p-3.5 rounded-xl bg-brand-cloudwhite border border-brand-divider space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-brand-subtext block">
                Major Employers & Campuses
              </span>
              <div className="flex flex-wrap gap-1">
                {activeHub.majorCompanies.map((comp, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white rounded border border-brand-border text-brand-navy font-medium text-[11px]">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-5 border-t border-brand-divider mt-5 flex items-center gap-3">
            <button
              onClick={() => openSiteVisitModal(activeHub.name)}
              className="flex-1 py-2.5 px-4 bg-brand-navy hover:bg-brand-royal text-white font-bold rounded-lg text-xs transition-colors shadow-subtle flex items-center justify-center gap-2"
            >
              <span>Explore Plots in {activeHub.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Distance Matrix */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Corridor Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-subtle border border-brand-border group">
            <Image
              src={activeHub.image}
              alt={activeHub.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/70 via-transparent to-transparent" />
            
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-brand-midnight/80 backdrop-blur-sm text-white text-[10px] font-bold rounded border border-white/10 uppercase tracking-wider">
                Coimbatore Corridor Matrix
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-bold text-brand-ice tracking-wider block">
                Verified Commute Benchmarks
              </span>
              <h4 className="text-base sm:text-lg font-bold">Transit Times from {activeHub.name}</h4>
            </div>
          </div>

          {/* Real Commute Times */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white shadow-subtle border border-brand-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-ice text-brand-electric flex items-center justify-center flex-shrink-0">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Airport</span>
                <strong className="text-xs font-black text-brand-navy">{activeHub.distanceToAirport}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white shadow-subtle border border-brand-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-ice text-brand-electric flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">CHIL SEZ IT Park</span>
                <strong className="text-xs font-black text-brand-navy">{activeHub.distanceToITPark}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white shadow-subtle border border-brand-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-ice text-brand-electric flex items-center justify-center flex-shrink-0">
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Gandhipuram</span>
                <strong className="text-xs font-black text-brand-navy">{activeHub.distanceToGandhipuram}</strong>
              </div>
            </div>
          </div>

          {/* Corridor Link */}
          <div className="bg-white rounded-xl p-3 border border-brand-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-brand-electric" />
              <span className="font-semibold text-brand-navy">
                Looking for DTCP layouts in {activeHub.name}?
              </span>
            </div>
            <Link
              href="/properties"
              className="text-brand-electric font-bold hover:underline flex items-center gap-1"
            >
              <span>View Listings</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
