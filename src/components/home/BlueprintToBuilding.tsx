"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STAGES = [
  {
    step: "01",
    title: "Layout & approvals",
    caption: "Demarcated plot boundary, statutory sanctions, and infrastructure alignment across the development.",
  },
  {
    step: "02",
    title: "Foundation & structure",
    caption: "Engineered plinth foundation, subterranean utility connections, and reinforced structural columns.",
  },
  {
    step: "03",
    title: "Facade & finishing",
    caption: "Cantilevered floor slabs, expansive architectural glass envelopes, and exterior weatherproofing.",
  },
  {
    step: "04",
    title: "Ready to build",
    caption: "Completed perimeter access, warm illumination, curated landscaping, and immediate title handover.",
  },
];

export function BlueprintToBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  // Check if /public/video/construction.mp4 is available
  useEffect(() => {
    fetch("/video/construction.mp4", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setHasVideo(true);
      })
      .catch(() => setHasVideo(false));
  }, []);

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
      // Single consolidated timeline for performance (Task 1 & Task 2)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Sync active stage indicator (0 to 3)
            const stageIndex = Math.min(Math.floor(p * 4), 3);
            setActiveStage(stageIndex);

            // If video fallback is available, sync video playback time
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = p * videoRef.current.duration;
            }
          },
        },
      });

      // 1. Plot & golden guide line draws
      tl.fromTo(
        "#iso-plot-line",
        { strokeDashoffset: 1400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.2, ease: "power1.inOut" }
      );
      tl.fromTo(
        "#iso-golden-path",
        { strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
        "<0.3"
      );

      // 2. Foundation rises
      tl.fromTo(
        "#iso-foundation",
        { opacity: 0, y: 35, scaleY: 0.2, transformOrigin: "bottom center" },
        { opacity: 1, y: 0, scaleY: 1, duration: 1.4, ease: "power2.out" }
      );

      // 3. Structural columns grow
      tl.fromTo(
        "#iso-columns",
        { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
        { opacity: 1, scaleY: 1, duration: 1.2, ease: "power2.out" },
        "<0.4"
      );

      // 4. Floor slabs assemble
      tl.fromTo(
        "#iso-slabs",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
        "<0.3"
      );

      // 5. Facade & glass panels slide into place
      tl.fromTo(
        "#iso-facade",
        { opacity: 0, x: -30, y: 15 },
        { opacity: 1, x: 0, y: 0, duration: 1.5, ease: "power2.out" },
        "<0.2"
      );

      // 6. Roof & cantilever balcony details
      tl.fromTo(
        "#iso-roof",
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "<0.3"
      );

      // 7. Warm windows illuminate & landscape lines emerge with gentle camera zoom
      tl.fromTo(
        "#iso-lights",
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: "power1.in" },
        "<0.2"
      );
      tl.fromTo(
        "#iso-landscaping",
        { opacity: 0, scale: 0.8, transformOrigin: "center bottom" },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "<0.1"
      );
      tl.to(
        graphicWrapRef.current,
        { scale: 1.04, duration: 1.5, ease: "power1.inOut" },
        "<"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleStageClick = (idx: number) => {
    setActiveStage(idx);
    if (!isReducedMotion && containerRef.current && window.innerWidth >= 1024) {
      const scrollStart = containerRef.current.offsetTop;
      const targetY = scrollStart + (idx / (STAGES.length - 1)) * 2600;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const currentStage = STAGES[activeStage];

  return (
    <section
      ref={containerRef}
      aria-label="Signature Architectural Construction Time-lapse"
      className="relative bg-gradient-to-b from-[#071324] via-[#0B1F3A] to-[#060F1D] text-ivory min-h-screen flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Subtle sparse architectural line guides (No heavy backdrop-filter / dense grid) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B08D57 1px, transparent 1px), linear-gradient(to bottom, #B08D57 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Top Header Spacing (Accounts for fixed header) */}
      <div className="relative z-10 px-6 lg:px-12 pt-24 md:pt-28 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-accent text-xs font-mono uppercase tracking-widest font-semibold">
              Signature Construction Process
            </span>
            <span className="text-ivory/30 text-xs">&bull;</span>
            <span className="text-[11px] font-mono text-ivory/60 bg-paper/10 px-2.5 py-0.5 rounded-full border border-stone/20">
              Conceptual illustration
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl text-ivory font-light tracking-tight">
            One Line. An Entire Home.
          </h2>
        </div>

        <p className="text-xs md:text-sm text-ivory/70 max-w-sm font-light leading-relaxed">
          Scroll to explore the systematic architectural assembly of our premium residences.
        </p>
      </div>

      {/* Center Viewport: Detailed Isometric Architectural Scene (Occupies >= 70% viewport height) */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-2 md:p-6 min-h-[68vh]">
        {hasVideo ? (
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-stone/20 shadow-2xl bg-black">
            <video
              ref={videoRef}
              src="/video/construction.mp4"
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            ref={graphicWrapRef}
            className="w-full max-w-5xl h-[66vh] max-h-[720px] relative flex items-center justify-center will-change-transform"
          >
            <svg
              viewBox="0 0 1000 680"
              className="w-full h-full drop-shadow-xl"
              aria-label="Isometric architectural construction time-lapse visualization"
            >
              <defs>
                {/* Clean gradients without expensive blur filters */}
                <linearGradient id="isoGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#93C5FD" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#1E3A8A" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="isoStone" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#F8FAFC" />
                  <stop offset="1" stopColor="#CBD5E1" />
                </linearGradient>
                <linearGradient id="isoGoldGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#B08D57" />
                </linearGradient>
                <linearGradient id="isoDarkWall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1E293B" />
                  <stop offset="1" stopColor="#0F172A" />
                </linearGradient>
              </defs>

              {/* STAGE 1: Isometric Blueprint Grid & Golden Guide Path */}
              <g id="iso-blueprint-plane">
                {/* Ground grid lines in isometric 30-degree perspective */}
                <path
                  d="M100 480 L500 250 L900 480 L500 710 Z"
                  fill="rgba(15, 23, 42, 0.4)"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Secondary blueprint guide intervals */}
                <line x1="200" y1="420" x2="600" y2="650" stroke="#1E293B" strokeWidth="1" />
                <line x1="300" y1="365" x2="700" y2="595" stroke="#1E293B" strokeWidth="1" />
                <line x1="400" y1="310" x2="800" y2="540" stroke="#1E293B" strokeWidth="1" />
                <line x1="800" y1="420" x2="400" y2="650" stroke="#1E293B" strokeWidth="1" />
                <line x1="700" y1="365" x2="300" y2="595" stroke="#1E293B" strokeWidth="1" />
              </g>

              {/* Isometric Plot Outline */}
              <polygon
                id="iso-plot-line"
                points="220,470 500,310 780,470 500,630"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeDasharray="1400"
                strokeDashoffset="0"
                opacity="1"
              />

              {/* Signature Golden Pathway Trace (inspired by reference "ONE LINE. AN ENTIRE HOME.") */}
              <path
                id="iso-golden-path"
                d="M500 660 L500 580 L440 545 L440 480 L490 450 L520 468"
                fill="none"
                stroke="url(#isoGoldGlow)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="600"
                strokeDashoffset="0"
                className="drop-shadow-md"
              />

              {/* STAGE 2: Foundation Plinth & Podiums */}
              <g id="iso-foundation">
                {/* Main Ground Concrete Slab */}
                <polygon points="260,460 500,320 740,460 500,600" fill="#334155" stroke="#475569" strokeWidth="1" />
                {/* Plinth Thickness Edges */}
                <polygon points="260,460 500,600 500,618 260,478" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                <polygon points="500,600 740,460 740,478 500,618" fill="#0F172A" stroke="#334155" strokeWidth="1" />
              </g>

              {/* STAGE 3: Structural Columns & Load-Bearing Cores */}
              <g id="iso-columns">
                {/* Left Columns */}
                <polygon points="320,440 334,432 334,310 320,318" fill="#64748B" />
                <polygon points="334,432 344,438 344,316 334,310" fill="#475569" />

                {/* Center Rear Columns */}
                <polygon points="495,345 507,338 507,220 495,227" fill="#64748B" />
                <polygon points="507,338 517,344 517,226 507,220" fill="#475569" />

                {/* Right Columns */}
                <polygon points="670,440 684,432 684,310 670,318" fill="#64748B" />
                <polygon points="684,432 694,438 694,316 684,310" fill="#475569" />

                {/* Front Portico Pillar */}
                <polygon points="430,510 442,503 442,390 430,397" fill="#94A3B8" />
                <polygon points="442,503 452,509 452,396 442,390" fill="#64748B" />
              </g>

              {/* STAGE 4: Floor Slabs & Cantilever Decks */}
              <g id="iso-slabs">
                {/* First Floor Cantilever Slab */}
                <polygon points="280,380 500,250 720,380 500,510" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                <polygon points="280,380 500,510 500,522 280,392" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                <polygon points="500,510 720,380 720,392 500,522" fill="#64748B" stroke="#475569" strokeWidth="1" />
              </g>

              {/* STAGE 5: Enclosure, Masonry Walls & Architectural Glass */}
              <g id="iso-facade">
                {/* Ground Floor Living Room Glass Wall */}
                <polygon points="340,430 480,350 480,450 340,530" fill="url(#isoGlass)" stroke="#60A5FA" strokeWidth="1" />
                <line x1="410" y1="390" x2="410" y2="490" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />

                {/* Ground Floor Main Entrance Door in Warm Navy/Gold */}
                <polygon points="510,470 550,447 550,535 510,558" fill="#0B132B" stroke="#B08D57" strokeWidth="1.5" />

                {/* Upper Floor Master Suite Volume (White Stucco Box) */}
                <polygon points="310,340 470,248 470,360 310,452" fill="url(#isoStone)" stroke="#94A3B8" strokeWidth="1" />
                <polygon points="470,248 680,370 680,480 470,360" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />

                {/* Upper Floor Ribbon Glass Window */}
                <polygon points="330,360 450,290 450,335 330,405" fill="url(#isoGlass)" stroke="#93C5FD" strokeWidth="1" />
                <line x1="390" y1="325" x2="390" y2="370" stroke="#BFDBFE" strokeWidth="1" opacity="0.6" />

                {/* Right Terrace Sliding Glass Wall */}
                <polygon points="490,345 640,430 640,450 490,365" fill="url(#isoGlass)" opacity="0.85" />
              </g>

              {/* STAGE 6: Cantilever Roof, Balcony Pergola & Parapet */}
              <g id="iso-roof">
                {/* Main Upper Roof Overhang */}
                <polygon points="290,290 470,185 690,310 510,415" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                <polygon points="290,290 510,415 510,425 290,300" fill="#94A3B8" />
                <polygon points="510,415 690,310 690,320 510,425" fill="#64748B" />

                {/* Architectural Louvered Pergola on Right Deck */}
                <line x1="530" y1="360" x2="650" y2="430" stroke="#B08D57" strokeWidth="2.5" />
                <line x1="545" y1="350" x2="665" y2="420" stroke="#B08D57" strokeWidth="2.5" />
                <line x1="560" y1="340" x2="680" y2="410" stroke="#B08D57" strokeWidth="2.5" />

                {/* Sleek Minimalist Glass Balcony Railing */}
                <polygon points="480,400 660,504 660,518 480,414" fill="rgba(147, 197, 253, 0.3)" stroke="#93C5FD" strokeWidth="1" />
              </g>

              {/* STAGE 7: Warm Illumination & Landscaping Environment */}
              <g id="iso-lights">
                {/* Warm Amber Interior Glow within Glass Apertures */}
                <polygon points="345,435 475,358 475,445 345,522" fill="#FEF3C7" opacity="0.22" />
                <polygon points="335,365 445,298 445,330 335,398" fill="#FDE68A" opacity="0.3" />
                {/* Golden Welcome Entry Light */}
                <circle cx="510" cy="465" r="4" fill="#FBBF24" />
                <circle cx="510" cy="465" r="14" fill="#F59E0B" opacity="0.25" />
              </g>

              <g id="iso-landscaping">
                {/* Architectural Garden Pavers */}
                <polygon points="410,570 435,555 450,564 425,579" fill="#475569" stroke="#64748B" strokeWidth="0.5" />
                <polygon points="440,588 465,573 480,582 455,597" fill="#475569" stroke="#64748B" strokeWidth="0.5" />

                {/* Left Landscaping Foliage Tree */}
                <circle cx="250" cy="440" r="26" fill="#064E3B" opacity="0.85" />
                <circle cx="265" cy="425" r="22" fill="#047857" opacity="0.9" />
                <polygon points="255,440 260,440 258,490 257,490" fill="#78350F" />

                {/* Right Landscaping Foliage Tree */}
                <circle cx="730" cy="430" r="28" fill="#064E3B" opacity="0.85" />
                <circle cx="715" cy="415" r="24" fill="#047857" opacity="0.9" />
                <polygon points="723,430 728,430 726,485 725,485" fill="#78350F" />

                {/* Native Shrub Hedgerow */}
                <ellipse cx="610" cy="510" rx="20" ry="10" fill="#059669" opacity="0.8" />
                <ellipse cx="370" cy="530" rx="22" ry="11" fill="#059669" opacity="0.8" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Bottom Interface: Left Caption Card + Slim 4-Step Rail */}
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

        {/* 4 Clickable Progress Step Buttons */}
        <div className="flex items-center gap-2.5">
          {STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => handleStageClick(idx)}
              aria-label={`Select stage ${s.step}: ${s.title}`}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                activeStage === idx
                  ? "w-14 bg-accent shadow-sm"
                  : "w-7 bg-stone/30 hover:bg-stone/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Accessible Mobile & Reduced-Motion Fallback (Task 2) */}
      <div className="lg:hidden px-6 pb-12 pt-4 space-y-4">
        <div className="text-xs font-mono text-accent uppercase tracking-widest">
          Development Stages Overview
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STAGES.map((s, i) => (
            <div
              key={s.step}
              onClick={() => setActiveStage(i)}
              className={`p-4 rounded-xl border transition-colors ${
                activeStage === i
                  ? "bg-paper/15 border-accent text-ivory"
                  : "bg-paper/5 border-stone/20 text-ivory/70"
              }`}
            >
              <div className="font-mono text-accent text-xs mb-1">STAGE {s.step}</div>
              <div className="font-serif text-sm font-medium text-ivory">{s.title}</div>
              <p className="text-xs text-ivory/60 mt-1 leading-relaxed">{s.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlueprintToBuilding;
