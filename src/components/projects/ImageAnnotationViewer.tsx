'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Info, CheckCircle2, X, Sparkles, Layers } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
}

interface ImageAnnotationViewerProps {
  imageSrc: string;
  imageAlt: string;
  hotspots?: Hotspot[];
}

const DEFAULT_HOTSPOTS: Hotspot[] = [
  {
    id: 'road',
    x: 48,
    y: 65,
    title: '40ft Blacktop Main Arterial Road',
    subtitle: 'IRC Heavy-Duty Specification',
    detail: 'Engineered with bitumen compaction designed for heavy transit, complete with concrete kerbing and stormwater drainage channels on both flanks.',
    badge: 'Infrastructure'
  },
  {
    id: 'water',
    x: 22,
    y: 42,
    title: 'Underground Potable Water Line',
    subtitle: 'Direct Individual Supply',
    detail: 'Pre-laid subterranean CPVC feeder pipes terminating at each individual plot boundary with dedicated shut-off valves and water meters.',
    badge: 'Utilities'
  },
  {
    id: 'lighting',
    x: 75,
    y: 38,
    title: 'LED Perimeter Illumination Grid',
    subtitle: 'Energy-Efficient Smart Lights',
    detail: 'Centrally synchronized twilight sensors with auto-dimming and dedicated transformer line to prevent neighborhood voltage fluctuations.',
    badge: 'Civic'
  },
  {
    id: 'vastu',
    x: 62,
    y: 78,
    title: 'Vastu-Compliant North/East Plots',
    subtitle: 'Strict Traditional Alignment',
    detail: 'All demarcated plots adhere strictly to traditional cardinal orientations with clear geometric diagonals and square boundary ratios.',
    badge: 'Compliance'
  }
];

export default function ImageAnnotationViewer({
  imageSrc,
  imageAlt,
  hotspots = DEFAULT_HOTSPOTS
}: ImageAnnotationViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-electric block">
            Interactive Site Inspection
          </span>
          <h3 className="text-lg font-bold text-brand-navy">
            Demarcated Infrastructure Hotspots
          </h3>
        </div>
        <span className="text-xs text-brand-subtext flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-brand-electric" />
          Click pulsing pins to inspect specifications
        </span>
      </div>

      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-brand-border bg-brand-midnight shadow-architectural group">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Ambient Dark Gradient for Hotspot Contrast */}
        <div className="absolute inset-0 bg-brand-midnight/25 pointer-events-none" />

        {/* Interactive Hotspot Pins */}
        {hotspots.map((hs) => {
          const isSelected = activeHotspot?.id === hs.id;

          return (
            <div
              key={hs.id}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(isSelected ? null : hs)}
                aria-label={`Inspect ${hs.title}`}
                className="relative group/pin focus:outline-none"
              >
                {/* Ping ring */}
                <span className="absolute -inset-2 rounded-full bg-brand-electric/40 animate-ping opacity-75" />
                
                {/* Pin core */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white text-brand-navy scale-125 ring-4 ring-brand-electric' 
                    : 'bg-brand-electric text-white hover:scale-110 hover:bg-brand-royal'
                }`}>
                  <Layers className="w-4 h-4" />
                </div>

                {/* Subtle title pill on hover */}
                <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-midnight/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-md border border-white/10 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                  {hs.title}
                </span>
              </button>
            </div>
          );
        })}

        {/* Active Hotspot Modal / Overlay Drawer */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md rounded-xl p-5 border border-brand-border shadow-2xl z-30 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-brand-ice text-brand-electric text-[9px] font-extrabold uppercase tracking-wider font-mono">
                  {activeHotspot.badge}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-brand-navy mt-1">
                  {activeHotspot.title}
                </h4>
                <p className="text-[11px] font-medium text-brand-subtext">
                  {activeHotspot.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1 rounded-full text-brand-subtext hover:text-brand-navy hover:bg-brand-cloudwhite"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-brand-navy/90 mt-3 leading-relaxed border-t border-brand-divider pt-2.5">
              {activeHotspot.detail}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-brand-darkgreen font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-foliage" />
              <span>Physically Demarcated & Ground-Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
