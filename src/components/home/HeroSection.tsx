"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  hasVideo: boolean;
  hasWebm: boolean;
  hasPoster: boolean;
}

export function HeroSection({
  hasVideo,
  hasWebm,
  hasPoster,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do NOT play video when:
    // 1. prefers-reduced-motion
    // 2. navigator.connection.saveData is true
    // 3. viewport < 768px (use poster image only on mobile)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = Boolean(nav.connection?.saveData);

    const isVideoAllowed = hasVideo && !prefersReducedMotion && !isMobile && !isSaveData;
    setCanPlayVideo(isVideoAllowed);

    if (!isVideoAllowed) return;

    // Pause video when hero is out of view (IntersectionObserver)
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Pause video when tab is hidden
    const handleVisibility = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [hasVideo]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0B1F3A] text-ivory select-none"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {canPlayVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero.jpg"
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            {hasWebm && <source src="/video/hero.webm" type="video/webm" />}
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        ) : hasPoster ? (
          <Image
            src="/images/hero.jpg"
            alt="V.V Properties prime residential landscape in Coimbatore"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          /* CSS Twilight Fallback Placeholder */
          <div
            className="w-full h-full bg-gradient-to-b from-[#071324] via-[#0E2748] to-[#08172C]"
            aria-hidden="true"
          />
        )}

        {/* Plain CSS Dark Navy Gradient Overlay (No blur filters) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/55 to-[#0B1F3A]/35 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Typography & Single Primary CTA */}
      <Container className="relative z-10 text-center max-w-4xl pt-16">
        <Eyebrow className="text-accent mb-4">Coimbatore &bull; Tamil Nadu</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-ivory leading-[1.08] mb-6">
          Verified land.
          <br />
          <span className="italic font-normal text-ivory/90">Thoughtfully planned.</span>
        </h1>
        <p className="text-base sm:text-lg text-ivory/80 max-w-xl mx-auto font-light leading-relaxed mb-10">
          Clear-title residential plotted communities across prime growth corridors in Coimbatore. Registered with TNRERA and DTCP.
        </p>

        <div className="flex items-center justify-center">
          <Button href="#featured-projects" variant="primary" size="lg">
            Explore Projects
          </Button>
        </div>
      </Container>

      {/* Subtle Caption Tag in Corner */}
      <div className="absolute bottom-5 right-6 z-10 pointer-events-none text-[11px] font-sans text-ivory/50">
        Artist&apos;s impression
      </div>
    </section>
  );
}

export default HeroSection;
