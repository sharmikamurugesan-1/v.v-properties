"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STAGES = [
  {
    step: "01",
    title: "Cadastral Survey & Title Clearance",
    caption: "Sub-division survey, boundary demarcation, and statutory parent-deed title verification.",
  },
  {
    step: "02",
    title: "Plinth & Underground Infrastructure",
    caption: "Deep subterranean utility ducts, storm-water drainage networks, and asphalt road sub-bases.",
  },
  {
    step: "03",
    title: "Structural Envelope & Avenue Networks",
    caption: "Blacktop internal avenues, street electrification poles, and perimeter masonry boundary walls.",
  },
  {
    step: "04",
    title: "Turnkey Landscaping & Registration",
    caption: "Native flora landscaping, water connection manifolds, and prompt individual sub-registrar registration.",
  },
];

export function BlueprintToBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    if (mq.matches || window.innerWidth < 1024) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=2400",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const stageIndex = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);
          setActiveStage(stageIndex);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleStageSelect = (index: number) => {
    setActiveStage(index);
    if (!isReducedMotion && containerRef.current && window.innerWidth >= 1024) {
      const scrollY = containerRef.current.offsetTop + (index / (STAGES.length - 1)) * 2000;
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

  const currentStage = STAGES[activeStage];

  return (
    <div
      ref={containerRef}
      className="relative bg-ink text-ivory min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Background technical grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(to right, #B08D57 1px, transparent 1px), linear-gradient(to bottom, #B08D57 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
        aria-hidden="true"
      />

      {/* Top Bar / Header within pinned section */}
      <div className="relative z-10 px-6 lg:px-12 pt-8 md:pt-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/10 pb-6">
        <div>
          <span className="text-accent text-xs font-mono uppercase tracking-widest">
            Engineering Precision
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-ivory font-light mt-1">
            From Cadastral Survey to Ready Homestead
          </h2>
        </div>
        <p className="text-xs md:text-sm text-ivory/60 max-w-sm font-light">
          Scroll through the four systematic stages of V.V Properties land development in Coimbatore.
        </p>
      </div>

      {/* Centerpiece: Inline SVG Architectural Illustration (At least 70% viewport height focus) */}
      <div
        ref={graphicRef}
        className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-4xl max-h-[62vh] aspect-[16/10] relative flex items-center justify-center">
          <svg
            viewBox="0 0 1000 625"
            className="w-full h-full drop-shadow-2xl select-none"
            aria-label="Architectural developmental progression from blueprint to finished estate"
          >
            <defs>
              <linearGradient id="blueprintGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#B08D57" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="warmSun" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFECC0" stopOpacity="0.3" />
                <stop offset="1" stopColor="#1E293B" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base ground plane */}
            <line x1="80" y1="520" x2="920" y2="520" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

            {/* STAGE 1: Blueprint Layer (Survey & Dimensions) */}
            <g
              id="stage-blueprint"
              className="transition-opacity duration-700 ease-out"
              style={{ opacity: activeStage >= 0 ? 1 : 0.2 }}
            >
              {/* Plot boundary wireframes */}
              <rect x="220" y="240" width="560" height="280" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6 4" />
              <rect x="300" y="320" width="400" height="200" fill="rgba(59, 130, 246, 0.04)" stroke="#93C5FD" strokeWidth="1" />
              
              {/* Technical dimension markers */}
              <line x1="220" y1="210" x2="780" y2="210" stroke="#94A3B8" strokeWidth="1" />
              <line x1="220" y1="200" x2="220" y2="220" stroke="#94A3B8" strokeWidth="1" />
              <line x1="780" y1="200" x2="780" y2="220" stroke="#94A3B8" strokeWidth="1" />
              <text x="500" y="202" fill="#94A3B8" fontSize="12" fontFamily="monospace" textAnchor="middle">
                FRONTAGE: 56.0 FT (VERIFIED SURVEY)
              </text>

              <line x1="190" y1="240" x2="190" y2="520" stroke="#94A3B8" strokeWidth="1" />
              <line x1="180" y1="240" x2="200" y2="240" stroke="#94A3B8" strokeWidth="1" />
              <line x1="180" y1="520" x2="200" y2="520" stroke="#94A3B8" strokeWidth="1" />
              <text x="180" y="380" fill="#94A3B8" fontSize="12" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 180 380)">
                DEPTH: 40.0 FT
              </text>
            </g>

            {/* STAGE 2: Infrastructure & Slabs */}
            <g
              id="stage-structure"
              className="transition-opacity duration-700 ease-out"
              style={{ opacity: activeStage >= 1 ? 1 : 0.08 }}
            >
              {/* Plinth beam & foundation concrete */}
              <rect x="250" y="490" width="500" height="30" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
              
              {/* Column footings */}
              <rect x="280" y="340" width="18" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              <rect x="420" y="340" width="18" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              <rect x="560" y="340" width="18" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
              <rect x="700" y="340" width="18" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />

              {/* Underground drainage & storm pipe ducts */}
              <path d="M100 540 L900 540" stroke="#B08D57" strokeWidth="3" strokeDasharray="8 4" opacity="0.6" />
              <circle cx="160" cy="540" r="10" fill="none" stroke="#B08D57" strokeWidth="2" />
              <circle cx="840" cy="540" r="10" fill="none" stroke="#B08D57" strokeWidth="2" />
            </g>

            {/* STAGE 3: Enclosure, Facade & Blacktop */}
            <g
              id="stage-facade"
              className="transition-opacity duration-700 ease-out"
              style={{ opacity: activeStage >= 2 ? 1 : 0.05 }}
            >
              {/* First-floor cantilever volume */}
              <rect x="260" y="270" width="340" height="150" fill="#1E293B" stroke="#B08D57" strokeWidth="1.5" />
              
              {/* Architectural glazing aperture */}
              <rect x="290" y="290" width="140" height="110" fill="#0F172A" stroke="#93C5FD" strokeWidth="1" opacity="0.9" />
              <line x1="360" y1="290" x2="360" y2="400" stroke="#93C5FD" strokeWidth="0.75" />
              
              {/* Entrance portal */}
              <rect x="620" y="350" width="70" height="140" fill="#0B132B" stroke="#B08D57" strokeWidth="1" />

              {/* Internal avenue road */}
              <polygon points="120,530 880,530 940,610 60,610" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              <line x1="500" y1="540" x2="500" y2="600" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="12 12" />
            </g>

            {/* STAGE 4: Landscaping, Lighting & Finished Residence */}
            <g
              id="stage-finished"
              className="transition-opacity duration-700 ease-out"
              style={{ opacity: activeStage >= 3 ? 1 : 0.03 }}
            >
              {/* Warm interior lighting glow */}
              <circle cx="360" cy="340" r="45" fill="url(#warmSun)" />
              <rect x="295" y="295" width="130" height="100" fill="#FEF3C7" opacity="0.15" />

              {/* Paver walkway */}
              <path d="M620,490 L690,490 L710,540 L600,540 Z" fill="#334155" opacity="0.8" />

              {/* Native trees & greenery foliage */}
              {/* Left foliage */}
              <circle cx="210" cy="460" r="32" fill="#064E3B" opacity="0.7" />
              <circle cx="230" cy="430" r="28" fill="#047857" opacity="0.8" />
              <line x1="220" y1="460" x2="220" y2="520" stroke="#78350F" strokeWidth="4" />

              {/* Right foliage */}
              <circle cx="790" cy="450" r="36" fill="#064E3B" opacity="0.7" />
              <circle cx="770" cy="420" r="30" fill="#047857" opacity="0.8" />
              <line x1="780" y1="450" x2="780" y2="520" stroke="#78350F" strokeWidth="4" />

              {/* Modern avenue street solar light */}
              <line x1="140" y1="380" x2="140" y2="530" stroke="#E2E8F0" strokeWidth="2" />
              <path d="M140,380 L165,370" stroke="#E2E8F0" strokeWidth="2" />
              <circle cx="165" cy="372" r="4" fill="#FBBF24" />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Interface: Left Caption Card + Slim Bottom Progress Rail */}
      <div className="relative z-10 px-6 lg:px-12 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Compact bottom-left caption card */}
        <div className="bg-paper/10 backdrop-blur-md border border-stone/20 p-5 rounded-2xl max-w-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-accent text-xs font-semibold">
              STAGE {currentStage.step} / 04
            </span>
            <span className="text-stone/40 text-xs">|</span>
            <h4 className="font-serif text-base text-ivory font-normal">
              {currentStage.title}
            </h4>
          </div>
          <p className="text-xs text-ivory/80 leading-relaxed font-light">
            {currentStage.caption}
          </p>
        </div>

        {/* Slim Stage Selector / Progress Rail */}
        <div className="flex items-center gap-2">
          {STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => handleStageSelect(idx)}
              aria-label={`Select stage ${s.step}: ${s.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStage === idx
                  ? "w-12 bg-accent shadow-sm"
                  : "w-6 bg-stone/30 hover:bg-stone/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
