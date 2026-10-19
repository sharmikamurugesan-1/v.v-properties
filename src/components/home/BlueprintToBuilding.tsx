"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, ChevronRight } from "lucide-react";

interface StageInfo {
  step: string;
  timecode: string;
  title: string;
  subtitle: string;
  caption: string;
  image: string;
}

const STAGES: StageInfo[] = [
  {
    step: "01",
    timecode: "00:01",
    title: "One Line. An Entire Home.",
    subtitle: "Isometric Blueprint & Boundary Line",
    caption:
      "Demarcated plot boundary, statutory sanctions, and isometric infrastructure alignment across the development.",
    image: "/images/construction/stage-1.png",
  },
  {
    step: "02",
    timecode: "00:02",
    title: "Your Journey Starts Here",
    subtitle: "Structural Plinth & Exterior Foundation",
    caption:
      "Engineered plinth foundation, subterranean utility connections, and reinforced structural columns.",
    image: "/images/construction/stage-2.png",
  },
  {
    step: "03",
    timecode: "00:03",
    title: "Grand Architectural Portal",
    subtitle: "Facade, Cantilevers & Glass Envelope",
    caption:
      "Cantilevered floor slabs, expansive architectural glass envelopes, and exterior weatherproofing.",
    image: "/images/construction/stage-3.png",
  },
  {
    step: "04",
    timecode: "00:04",
    title: "Space Follows The Journey",
    subtitle: "Illuminated Sanctum & Final Handover",
    caption:
      "Completed perimeter access, warm illumination, curated interior landscaping, and immediate title handover.",
    image: "/images/construction/stage-4.png",
  },
];

export function BlueprintToBuilding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  // Check if a real video file exists at /video/construction.mp4
  useEffect(() => {
    fetch("/video/construction.mp4", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setHasVideo(true);
      })
      .catch(() => setHasVideo(false));
  }, []);

  // Detect reduced motion preferences
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
  }, []);

  // GSAP ScrollTrigger timeline for desktop scroll scrub
  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined" || window.innerWidth < 1024) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length < 4) return;

      // Pinned scroll-scrub timeline with short, snappy range (850px instead of 2600px)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=850",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const stageIndex = Math.min(Math.floor(p * 4), 3);
            setActiveStage(stageIndex);

            // Sync video currentTime if video element is active
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = p * videoRef.current.duration;
            }
          },
        },
      });

      // Slide 0 is initially full opacity
      gsap.set(slides[0], { opacity: 1, scale: 1 });
      gsap.set(slides.slice(1), { opacity: 0, scale: 1.04 });

      // Cross-dissolve transitions between the 4 photos
      // Stage 1 -> Stage 2
      tl.to(slides[1], { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" }, 0.25);
      tl.to(slides[0], { opacity: 0.2, scale: 1.05, duration: 1, ease: "power2.inOut" }, 0.25);

      // Stage 2 -> Stage 3
      tl.to(slides[2], { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" }, 1.25);
      tl.to(slides[1], { opacity: 0.2, scale: 1.05, duration: 1, ease: "power2.inOut" }, 1.25);

      // Stage 3 -> Stage 4
      tl.to(slides[3], { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" }, 2.25);
      tl.to(slides[2], { opacity: 0.2, scale: 1.05, duration: 1, ease: "power2.inOut" }, 2.25);
    }, container);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Auto-play timer when user hits Play button
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStageClick = (idx: number) => {
    setActiveStage(idx);
    setIsPlaying(false);

    if (!isReducedMotion && containerRef.current && window.innerWidth >= 1024) {
      const scrollStart = containerRef.current.offsetTop;
      const targetY = scrollStart + (idx / (STAGES.length - 1)) * 800;
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
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B08D57 1px, transparent 1px), linear-gradient(to bottom, #B08D57 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Top Header Spacing */}
      <div className="relative z-10 px-6 lg:px-12 pt-24 md:pt-28 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-accent text-xs font-mono uppercase tracking-widest font-semibold">
              Signature Construction Process
            </span>
            <span className="text-ivory/30 text-xs">&bull;</span>
            <span className="text-[11px] font-mono text-ivory/70 bg-paper/10 px-2.5 py-0.5 rounded-full border border-stone/20">
              Cinematic Reel &bull; 4 Stages
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl text-ivory font-light tracking-tight">
            One Line. An Entire Home.
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden md:block text-xs md:text-sm text-ivory/70 max-w-xs font-light leading-relaxed">
            Scroll or play to travel from isometric blueprint to fully realized luxury villa.
          </p>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30 transition text-xs font-mono font-medium"
            aria-label={isPlaying ? "Pause cinematic time-lapse" : "Play cinematic time-lapse"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? "Pause Reel" : "Play Reel"}</span>
          </button>
        </div>
      </div>

      {/* Center Cinematic Viewport (Occupies >= 70% viewport height on desktop) */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-3 md:p-6 min-h-[66vh]">
        {hasVideo ? (
          <div className="w-full max-w-5xl aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-stone/20 shadow-2xl bg-black">
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
            ref={viewportRef}
            className="w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] max-h-[720px] relative rounded-2xl md:rounded-3xl overflow-hidden border border-stone/20 shadow-2xl bg-black"
          >
            {/* 4 Stacked Photo Stages */}
            {STAGES.map((stage, idx) => {
              const isCurrent = activeStage === idx;
              return (
                <div
                  key={stage.step}
                  ref={(el) => {
                    slideRefs.current[idx] = el;
                  }}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    // On desktop when GSAP controls opacity, we rely on GSAP styles;
                    // On mobile or when auto-playing outside scroll, fallback classes guarantee visibility
                    isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center transform scale-100 transition-transform duration-1000"
                    sizes="(max-width: 1024px) 100vw, 1200px"
                  />

                  {/* Subtle cinematic gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Stage Watermark / Title Overlay */}
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[11px] text-accent tracking-wider font-semibold uppercase">
                      Stage {stage.step}
                    </span>
                    <span className="text-white/30 text-xs">&bull;</span>
                    <span className="text-[11px] text-ivory/90 font-medium font-serif">
                      {stage.subtitle}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 md:top-8 md:right-8 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[11px] text-ivory/70">
                    {stage.timecode} / 00:04
                  </div>
                </div>
              );
            })}

            {/* Video-style Progress Scrub Bar at Bottom of Viewport */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 z-20">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{
                  width: `${((activeStage + 1) / STAGES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Interface: Left Caption Card + Slim 4-Step Rail */}
      <div className="relative z-10 px-6 lg:px-12 pb-6 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Compact bottom-left caption card */}
        <div className="bg-paper/10 backdrop-blur-md border border-stone/20 p-5 rounded-2xl max-w-lg shadow-lg">
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
        <div className="flex items-center gap-2">
          {STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => handleStageClick(idx)}
              aria-label={`Select stage ${s.step}: ${s.title}`}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 focus:outline-none ${
                activeStage === idx
                  ? "bg-accent/25 border-accent text-accent shadow-sm"
                  : "bg-paper/5 border-stone/20 text-ivory/60 hover:border-stone/40 hover:text-ivory"
              }`}
            >
              <span className="font-mono text-[11px] font-semibold">{s.step}</span>
              <span className="hidden sm:inline text-xs font-serif truncate max-w-[100px]">
                {s.title.split(".")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile-Friendly Stage Cards (Visible on small screens) */}
      <div className="lg:hidden px-6 pb-12 pt-2 space-y-3">
        <div className="text-xs font-mono text-accent uppercase tracking-widest flex items-center justify-between">
          <span>Explore All 4 Stages</span>
          <ChevronRight className="w-3.5 h-3.5 text-accent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STAGES.map((s, i) => (
            <button
              key={s.step}
              type="button"
              onClick={() => handleStageClick(i)}
              className={`p-4 rounded-xl border text-left transition-colors ${
                activeStage === i
                  ? "bg-paper/15 border-accent text-ivory"
                  : "bg-paper/5 border-stone/20 text-ivory/70 hover:bg-paper/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-accent text-xs">STAGE {s.step}</span>
                <span className="font-mono text-[10px] text-ivory/40">{s.timecode}</span>
              </div>
              <div className="font-serif text-sm font-medium text-ivory">{s.title}</div>
              <p className="text-xs text-ivory/60 mt-1 leading-relaxed line-clamp-2">{s.caption}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlueprintToBuilding;
