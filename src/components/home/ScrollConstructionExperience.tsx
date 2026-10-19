'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, RotateCcw, Maximize2, Compass, Sparkles, Eye } from 'lucide-react';

interface Stage {
  id: number;
  number: string;
  stageLabel: string;
  title: string;
  oneLine: string;
  panX: number; // percentage offset
  panY: number;
  zoom: number; // scale
}

const STAGES: Stage[] = [
  {
    id: 1,
    number: '01',
    stageLabel: 'STAGE 01',
    title: 'Site Plan & Cantilever Plinth',
    oneLine: 'Demarcated terrain contours, reinforced foundation, and blacktop approach avenue.',
    panX: -5,
    panY: 8,
    zoom: 1.05,
  },
  {
    id: 2,
    number: '02',
    stageLabel: 'STAGE 02',
    title: 'Reinforced Cantilever Structure',
    oneLine: 'M25 post-tension concrete frame with dramatic suspended upper living volume.',
    panX: -12,
    panY: -5,
    zoom: 1.25,
  },
  {
    id: 3,
    number: '03',
    stageLabel: 'STAGE 03',
    title: 'Curtain Glazing & Interior Illumination',
    oneLine: 'Floor-to-ceiling acoustic glass panels, warm linear recessed lighting, and timber louvers.',
    panX: 10,
    panY: -10,
    zoom: 1.35,
  },
  {
    id: 4,
    number: '04',
    stageLabel: 'STAGE 04',
    title: 'Illuminated Infinity Pool & Residence',
    oneLine: 'Turnkey luxury residence with crystal cantilever pool, teak sun-deck, and native landscape.',
    panX: 6,
    panY: 10,
    zoom: 1.2,
  },
];

const HOTSPOTS = [
  {
    id: 'pool',
    title: 'Cantilever Infinity Pool',
    description: 'Heated underwater LED illumination with transparent acrylic edge',
    top: '64%',
    left: '58%',
    stageIndex: 3,
  },
  {
    id: 'glazing',
    title: 'Double-Height Glass Suite',
    description: 'Low-E acoustic insulated curtain wall with interior dusk chandeliers',
    top: '38%',
    left: '32%',
    stageIndex: 2,
  },
  {
    id: 'lounge',
    title: 'Sunken Outdoor Lounge',
    description: 'Integrated teak seating deck and recessed architectural step lights',
    top: '56%',
    left: '68%',
    stageIndex: 3,
  },
];

export default function ScrollConstructionExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timecodeSeconds, setTimecodeSeconds] = useState(14);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) setIsPlaying(false);
    }
  }, []);

  // Pause when off-screen or tab hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        const rect = container.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Timecode counter simulation
  useEffect(() => {
    if (!isPlaying || !isVisible || isReducedMotion) return;

    const timer = setInterval(() => {
      setTimecodeSeconds((prev) => (prev >= 600 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isVisible, isReducedMotion]);

  // Automatic slow video drone drift between milestones if playing
  useEffect(() => {
    if (!isPlaying || !isVisible || isReducedMotion) return;

    const driftInterval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 8000);

    return () => clearInterval(driftInterval);
  }, [isPlaying, isVisible, isReducedMotion]);

  const currentStage = STAGES[activeStageIndex];

  const formatTimecode = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `00:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleStageSelect = (idx: number) => {
    setActiveStageIndex(idx);
    setActiveHotspot(null);
  };

  const resetDroneView = () => {
    setActiveStageIndex(0);
    setActiveHotspot(null);
  };

  return (
    <section
      ref={containerRef}
      id="construction-experience"
      className="relative w-full bg-[#071322] text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39A8F4] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#39A8F4] font-bold">
                CINEMATIC ARCHITECTURAL TIME-LAPSE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              From Blueprint Foundation to Completed Villa
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Play / Pause Video Controls */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0E243F] hover:bg-[#15345B] border border-white/20 text-xs font-sans font-medium text-white transition-all flex items-center gap-2 shadow-sm"
              aria-label={isPlaying ? 'Pause video drift' : 'Play video drift'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#39A8F4]" /> : <Play className="w-3.5 h-3.5 text-[#39A8F4]" />}
              <span>{isPlaying ? 'Pause Drone Reel' : 'Resume Drone Reel'}</span>
            </button>

            <button
              onClick={resetDroneView}
              className="p-1.5 rounded-lg bg-[#0E243F] hover:bg-[#15345B] border border-white/20 text-white/80 hover:text-white transition-all"
              title="Reset Drone Camera"
              aria-label="Reset Camera"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Frame Viewport */}
        <div className="relative w-full h-[520px] sm:h-[640px] lg:h-[720px] rounded-2xl overflow-hidden border border-white/20 bg-[#040C16] shadow-2xl group">
          
          {/* Animated Video Image Container with Smooth Drone Drift */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out will-change-transform"
            style={{
              transform: isReducedMotion
                ? 'none'
                : `translate3d(${currentStage.panX}%, ${currentStage.panY}%, 0) scale(${currentStage.zoom})`,
            }}
          >
            <Image
              src="/images/night-pool-villa.jpg"
              alt="Conceptual Luxury Architectural Villa with Infinity Pool at Dusk"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={`object-cover object-center ${
                isPlaying && isVisible && !isReducedMotion ? 'animate-cinematicDrift' : ''
              }`}
            />

            {/* Simulated Water Shimmer Mask over Swimming Pool area */}
            <div
              className="absolute pointer-events-none opacity-40 mix-blend-screen"
              style={{
                top: '52%',
                left: '42%',
                width: '34%',
                height: '24%',
                background:
                  'radial-gradient(ellipse at center, rgba(57, 168, 244, 0.45) 0%, rgba(30, 90, 160, 0.1) 70%, transparent)',
                animation: isPlaying && isVisible && !isReducedMotion ? 'waterShimmer 4s ease-in-out infinite alternate' : 'none',
              }}
            />

            {/* Subtle warm interior lighting glow breathing effect */}
            <div
              className="absolute pointer-events-none opacity-25 mix-blend-screen"
              style={{
                top: '28%',
                left: '18%',
                width: '45%',
                height: '40%',
                background:
                  'radial-gradient(circle at center, rgba(255, 180, 80, 0.3) 0%, transparent 65%)',
                animation: isPlaying && isVisible && !isReducedMotion ? 'interiorGlow 6s ease-in-out infinite alternate' : 'none',
              }}
            />
          </div>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

          {/* Top Video HUD Information Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Left: REC Indicator & Specs */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/60 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">
                  REC &bull; 4K UHD 60FPS
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-black/60 border border-white/15 px-3 py-1.5 rounded-full text-[10px] font-mono text-[#39A8F4]">
                <Compass className="w-3 h-3" />
                <span>11.0168° N, 76.9558° E</span>
              </div>
            </div>

            {/* Right: Running Timecode */}
            <div className="bg-black/60 border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-mono text-white/90">
              <span className="text-[#39A8F4]">{formatTimecode(timecodeSeconds)}</span>
              <span className="text-white/40"> / 00:10:00</span>
            </div>
          </div>

          {/* Interactive Hotspot Pins on the Building */}
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/spot"
              onClick={() => {
                setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                handleStageSelect(spot.stageIndex);
              }}
            >
              {/* Outer pulsing ring */}
              <div className="relative flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-[#39A8F4]/30 animate-ping absolute" />
                <span className="w-4 h-4 rounded-full bg-[#0E2A4F] border-2 border-[#39A8F4] flex items-center justify-center text-[9px] font-bold text-white shadow-lg">
                  +
                </span>
              </div>

              {/* Tooltip Card on Hover or Active */}
              <div
                className={`absolute left-6 top-1/2 -translate-y-1/2 w-64 bg-[#071B35]/95 border border-white/20 rounded-xl p-3 shadow-2xl transition-all duration-300 pointer-events-none ${
                  activeHotspot === spot.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover/spot:opacity-100 group-hover/spot:scale-100'
                }`}
              >
                <span className="text-[9px] font-mono text-[#39A8F4] uppercase font-bold block">
                  ARCHITECTURAL FEATURE
                </span>
                <h5 className="text-xs font-serif font-bold text-white mt-0.5">{spot.title}</h5>
                <p className="text-[11px] text-white/80 mt-1 leading-snug">{spot.description}</p>
              </div>
            </div>
          ))}

          {/* Bottom Left: Stage Caption Card */}
          <div className="absolute bottom-20 sm:bottom-24 left-4 sm:left-8 z-20 max-w-md pointer-events-auto">
            <div className="bg-[#071B35]/95 border border-white/20 rounded-xl p-5 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-[#39A8F4] uppercase tracking-widest font-bold">
                  {currentStage.stageLabel}
                </span>
                <span className="text-white/30 text-xs">&bull;</span>
                <span className="text-[10px] font-mono text-white/60">TIMELAPSE SEQUENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
                {currentStage.title}
              </h3>
              <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-sans">
                {currentStage.oneLine}
              </p>
            </div>
          </div>

          {/* Bottom Center: Stage Selector & Video Scrubber Bar */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#071B35]/95 border border-white/15 px-4 sm:px-6 py-3 rounded-2xl shadow-xl">
            
            {/* Stage Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-[#071322] font-bold shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{stage.number}</span>
                    <span className="hidden md:inline">{stage.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Video Scrubber Timeline Progress Indicator */}
            <div className="w-full sm:w-48 flex items-center gap-2 text-[10px] font-mono text-white/60">
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#39A8F4] transition-all duration-500 ease-out"
                  style={{ width: `${((activeStageIndex + 1) / STAGES.length) * 100}%` }}
                />
              </div>
              <span className="text-white font-semibold">
                {activeStageIndex + 1}/{STAGES.length}
              </span>
            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes cinematicDrift {
          from {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.04);
          }
          to {
            filter: brightness(1);
          }
        }
        @keyframes waterShimmer {
          from {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          to {
            opacity: 0.55;
            transform: scale(1.05) rotate(1deg);
          }
        }
        @keyframes interiorGlow {
          from {
            opacity: 0.2;
          }
          to {
            opacity: 0.38;
          }
        }
      `}</style>
    </section>
  );
}
