"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SignatureResidenceProps {
  hasVillaImage?: boolean;
}

export function SignatureResidence({ hasVillaImage = true }: SignatureResidenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card || typeof window === "undefined") return;

    // Only enable tilt on desktop devices with fine pointers that support hover,
    // and when user does NOT prefer reduced motion
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || prefersReducedMotion) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;

    const updateTilt = () => {
      // Smooth interpolation without React state
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

      // Continue animation loop while hovering or until returned close to 0
      if (
        isHovering ||
        Math.abs(currentRotateX) > 0.05 ||
        Math.abs(currentRotateY) > 0.05
      ) {
        rafIdRef.current = requestAnimationFrame(updateTilt);
      } else {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
        rafIdRef.current = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Limit rotation strictly to ±4 degrees
      targetRotateX = -y * 8; // Max 4 deg
      targetRotateY = x * 8;  // Max 4 deg
      isHovering = true;

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateTilt);
      }
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-label="Signature Residence Concept"
      className="w-full bg-ivory py-16 md:py-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* 3D Perspective Viewport Container */}
        <div
          ref={containerRef}
          style={{ perspective: "1200px" }}
          className="relative w-full h-[min(90svh,820px)] min-h-[520px] rounded-3xl overflow-hidden cursor-default bg-stone/20"
        >
          {/* Transforming Image Layer */}
          <div
            ref={cardRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-full h-full transition-transform duration-100 ease-out"
          >
            {hasVillaImage && !imgError ? (
              <Image
                src="/images/villa.jpg"
                alt="Signature residence luxury villa in Coimbatore"
                fill
                sizes="100vw"
                loading="lazy"
                onError={() => setImgError(true)}
                className="object-cover object-center"
              />
            ) : (
              /* Refined CSS/SVG Twilight Villa Placeholder Fallback */
              <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] via-[#1B3354] to-[#0A1828] flex items-center justify-center relative overflow-hidden">
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full opacity-35"
                  aria-hidden="true"
                >
                  <line x1="100" y1="420" x2="700" y2="420" stroke="#B08D57" strokeWidth="1" />
                  <polygon points="180,420 180,240 620,240 620,420" fill="none" stroke="#E6E1D6" strokeWidth="1.5" />
                  <line x1="280" y1="240" x2="280" y2="420" stroke="#E6E1D6" strokeWidth="1" />
                  <line x1="480" y1="240" x2="480" y2="420" stroke="#E6E1D6" strokeWidth="1" />
                  <polygon points="150,240 400,160 650,240" fill="none" stroke="#B08D57" strokeWidth="1.5" />
                </svg>
              </div>
            )}

            {/* Soft Inner Vignette for Depth Feel (Plain CSS, no heavy blur) */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Bottom-Left Compact Overlay */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-lg z-10 text-ivory text-left pointer-events-none">
              <span className="text-xs uppercase tracking-wider text-accent font-sans font-medium block mb-2">
                Conceptual view
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory leading-tight mb-2">
                Designed for how you live
              </h2>
              <p className="text-sm md:text-base text-ivory/80 font-light leading-relaxed mb-4">
                Thoughtfully proportioned spaces that welcome morning light and quiet evenings.
              </p>
              <span className="text-[11px] font-sans text-ivory/50 block">
                Artist&apos;s impression
              </span>
            </div>
          </div>
        </div>

        {/* One Text Link Below */}
        <div className="mt-8 text-left">
          <Link
            href="#featured-projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors underline underline-offset-8"
          >
            <span>Explore projects</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignatureResidence;
