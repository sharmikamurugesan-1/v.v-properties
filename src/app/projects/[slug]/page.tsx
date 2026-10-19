'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  MapPin, ShieldCheck, Download, Calendar, Phone, 
  CheckCircle2, ArrowRight, Building2, Trees, Droplets, 
  Zap, Compass, Navigation, Cross, Plane, Sparkles, Layers 
} from 'lucide-react';
import { PROJECTS, COMPANY_INFO } from '@/data/mockData';
import LivePlotExplorer from '@/components/plot-explorer/LivePlotExplorer';
import ImageAnnotationViewer from '@/components/projects/ImageAnnotationViewer';
import ConstructionTimeline from '@/components/projects/ConstructionTimeline';
import ARModelViewer from '@/components/projects/ARModelViewer';
import { useApp } from '@/context/AppContext';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openSiteVisitModal, showToast } = useApp();

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-36 pb-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-brand-navy">Project Not Found</h2>
        <p className="text-sm text-brand-subtext mt-2">The project dossier you requested is unavailable.</p>
        <Link href="/projects" className="mt-4 inline-block px-6 py-2.5 bg-brand-electric text-white font-bold rounded-xl text-xs">
          Browse Active Projects
        </Link>
      </div>
    );
  }

  const handleDownloadBrochure = () => {
    showToast(`Downloading official architectural brochure for ${project.name}...`, 'success');
  };

  return (
    <div className="pt-24 pb-20 bg-brand-warmwhite min-h-screen text-left">
      
      {/* Hero Banner Section */}
      <div className="relative min-h-[52vh] flex items-end pb-12 bg-brand-midnight text-white px-6 lg:px-12 overflow-hidden blueprint-grid-dark">
        <Image
          src={project.bannerImage}
          alt={project.name}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-softblue mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <span>/</span>
            <span className="text-white font-semibold">{project.name.split('—')[0]}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-brand-electric text-white text-xs font-mono font-bold rounded-md">
                  {project.type}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-mono font-bold rounded-md border border-white/20">
                  {project.dtcpNumber}
                </span>
                {project.corporationLimit && (
                  <span className="px-3 py-1 bg-brand-darkgreen text-white text-xs font-bold rounded-md">
                    Coimbatore Corporation Limit
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {project.name}
              </h1>

              <p className="text-sm sm:text-base text-brand-softblue mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-electric flex-shrink-0" />
                <span>{project.location} • {project.corridor}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadBrochure}
                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-brand-electric" />
                <span>Download Brochure</span>
              </button>

              <button
                onClick={() => openSiteVisitModal(project.name)}
                className="px-6 py-3 rounded-lg bg-brand-electric hover:bg-brand-royal text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Tour with Cab</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Dossier */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 space-y-12">
        
        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-subtle">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-steel block">Starting Price</span>
            <strong className="text-xl font-black text-brand-electric">₹{project.priceStartingPerCent} L / Cent</strong>
          </div>
          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-subtle">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-steel block">Development Size</span>
            <strong className="text-xl font-black text-brand-navy">{project.totalAcres} Acres</strong>
          </div>
          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-subtle">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-steel block">Total Plotted Units</span>
            <strong className="text-xl font-black text-brand-navy">{project.totalPlots} Plots</strong>
          </div>
          <div className="bg-white p-5 rounded-lg border border-brand-border shadow-subtle">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-steel block">Bank Loan</span>
            <strong className="text-xl font-black text-brand-darkgreen">85% Approved</strong>
          </div>
        </div>

        {/* Live Plot Explorer Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-subtle">
          <LivePlotExplorer projectTitle={project.name} embedded={true} />
        </div>

        {/* Interactive Image Annotation Hotspots */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-subtle">
          <ImageAnnotationViewer
            imageSrc={project.bannerImage}
            imageAlt={`${project.name} Demarcated Infrastructure`}
          />
        </div>

        {/* 3D Spatial Massing & AR Model Viewer */}
        <ARModelViewer modelTitle={project.name} />

        {/* Construction & Handover Milestones Timeline */}
        <ConstructionTimeline projectName={project.name} />

        {/* Project Overview & Commute Distance Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-subtle space-y-6">
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-2">Master Plan & Location Dynamics</h2>
              <p className="text-xs sm:text-sm text-brand-subtext leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-brand-navy mb-3">
                Key Engineering & Infrastructure Highlights
              </h3>
              <div className="space-y-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-brand-navy font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approvals Box */}
            <div className="p-4 rounded-xl bg-brand-botanical/20 border border-brand-foliage/30 space-y-2">
              <span className="text-xs font-bold text-brand-darkgreen block">Certified Legal Compliance & Approvals:</span>
              <ul className="text-xs text-brand-darkgreen/90 space-y-1">
                {project.approvals.map((app, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-foliage flex-shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Commute Landmarks */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-subtle space-y-4">
            <h3 className="text-lg font-bold text-brand-navy">
              Proximity & Commute Matrix
            </h3>
            <p className="text-xs text-brand-subtext">
              Actual distance and verified travel time from {project.name.split('—')[0]}.
            </p>

            <div className="space-y-3 pt-2">
              {project.distanceHighlights.map((dist, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-brand-cloudwhite border border-brand-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-brand-ice text-brand-electric flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-brand-navy">{dist.landmark}</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-brand-electric block">{dist.distance}</strong>
                    <span className="text-[10px] text-brand-subtext">{dist.travelTime}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => openSiteVisitModal(project.name)}
                className="w-full py-3 bg-brand-navy hover:bg-brand-royal text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-subtle"
              >
                Schedule Free Site Visit with Cab
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
