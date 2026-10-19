'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, MapPin, ShieldCheck, ArrowRight, 
  Calendar, CheckCircle2, Sparkles 
} from 'lucide-react';
import { PROJECTS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function ProjectsPage() {
  const { openSiteVisitModal } = useApp();

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-2">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Projects</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-1">
                MASTER COMMUNITIES
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
                Architectural Developments
              </h1>
              <p className="text-sm text-brand-secondary mt-2 max-w-2xl leading-relaxed">
                Strategically planned residential plotted layouts and villa enclaves across Coimbatore’s high-growth IT and highway corridors.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3.5 py-1.5 bg-brand-ice text-brand-navy font-bold rounded-lg border border-brand-softblue/30 font-mono">
                {PROJECTS.length} ACTIVE DEVELOPMENTS
              </span>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => {
            const isAlternate = idx % 2 === 1;
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 hover:border-brand-softblue transition-all"
              >
                {/* Visual Image */}
                <div className={`lg:col-span-6 relative aspect-[16/10] rounded-lg overflow-hidden bg-brand-ice border border-brand-border/60 ${
                  isAlternate ? 'lg:order-2' : ''
                }`}>
                  <Image
                    src={project.bannerImage}
                    alt={project.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-brand-midnight/90 backdrop-blur-md text-white text-xs font-mono font-bold rounded-md border border-white/10">
                      {project.totalPlots} TOTAL PLOTS
                    </span>
                    <span className="px-3 py-1 bg-brand-darkgreen text-white text-xs font-bold rounded-md">
                      {project.availablePlotsCount} Available Now
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-5 ${isAlternate ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary mb-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location} • {project.corridor}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
                      {project.name}
                    </h2>

                    <p className="text-xs font-medium text-brand-secondary mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                    {project.overview}
                  </p>

                  {/* Highlights pills */}
                  <div className="space-y-2">
                    {project.keyFeatures.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-brand-navy font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-brand-secondary block">Price Starting At</span>
                      <strong className="text-2xl font-black text-brand-navy">
                        ₹{project.priceStartingPerCent.toFixed(2)} L <span className="text-xs font-normal text-brand-secondary">/ Cent</span>
                      </strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openSiteVisitModal(project.name)}
                        className="py-2.5 px-4 bg-brand-primary hover:bg-brand-royal text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        Site Visit
                      </button>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="py-2.5 px-4 border border-brand-border hover:border-brand-primary text-brand-navy rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <span>Explore Master Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
