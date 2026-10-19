'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12 to +12 degrees)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    // Dynamic light sheen position
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/20 bg-[#071b35] shadow-2xl select-none group cursor-crosshair perspective-[1200px]"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Spatial Tilting Container */}
      <div
        className="relative w-full h-full transition-transform ease-out will-change-transform"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transitionDuration: isHovered ? '120ms' : '600ms',
        }}
      >
        {/* Real Luxury Villa Image (Replaced First Image by Second Image) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-villa.png"
            alt="V.V Properties Architectural Residence — Coimbatore"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Subtle Architectural Tint & Contrast Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071b35]/90 via-transparent to-[#071b35]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[#071b35]/15 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Dynamic Light Sheen / Glass Reflection following cursor */}
        {!isReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 70%)`,
            }}
          />
        )}

        {/* CAD Grid Crosshairs at 4 Corners */}
        <div className="absolute top-2 left-2 text-[#39a8f4]/60 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute top-2 right-2 text-[#39a8f4]/60 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute bottom-2 left-2 text-[#39a8f4]/60 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute bottom-2 right-2 text-[#39a8f4]/60 font-mono text-xs pointer-events-none">+</div>

        {/* Subtle CAD Blueprint Horizon Lines */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#39a8f4]/15 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#39a8f4]/15 pointer-events-none" />

        {/* Top-Left CAD Coordinates & Scale */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#39a8f4] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-bold drop-shadow-md">
              11.0168° N, 76.9558° E &bull; COIMBATORE
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#a9d8f7] block mt-0.5 tracking-wider drop-shadow-sm">
            CAD SCALE 1:100 &bull; ARCHITECTURAL ELEVATION
          </span>
        </div>

        {/* Top-Right 3D Spatial Badge */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded bg-[#071b35]/90 border border-white/20 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            3D SPATIAL VIEW
          </span>
        </div>

        {/* Center Spatial Depth Crosshair (appears on hover) */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <div className="w-16 h-16 rounded-full border border-[#39a8f4]/40 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#39a8f4]" />
          </div>
        </div>

        {/* Bottom Architectural Info Badges */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex items-center justify-between">
          <div className="bg-[#071b35]/95 border border-white/20 rounded-lg px-3 py-1.5 text-[11px] font-medium text-white shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39a8f4]" />
            <span>
              <strong className="text-[#39a8f4] font-semibold">Move cursor</strong> to inspect spatial depth
            </span>
          </div>
          <div className="bg-[#071b35]/95 border border-white/20 rounded-lg px-3 py-1.5 text-[10px] font-mono text-[#a9d8f7] hidden sm:block shadow-lg">
            DTCP & TNRERA APPROVED MATRIX
          </div>
        </div>
      </div>
    </div>
  );
}
