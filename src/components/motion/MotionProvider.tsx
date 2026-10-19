'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Mark JS as ready on <html> for progressive enhancement
    document.documentElement.classList.add('js-ready');

    // 2. Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Global defaults
      gsap.defaults({
        ease: 'power3.out',
        duration: 1.0
      });
    }

    const checkAndInitLenis = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop && !prefersReduced) {
        if (!lenisRef.current) {
          const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2
          });

          lenisRef.current = lenis;

          lenis.on('scroll', ScrollTrigger.update);

          const tickerCb = (time: number) => {
            lenis.raf(time * 1000);
          };

          gsap.ticker.add(tickerCb);
          gsap.ticker.lagSmoothing(0);
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
      }
    };

    checkAndInitLenis();

    const handleResize = () => {
      checkAndInitLenis();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Refresh after fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
