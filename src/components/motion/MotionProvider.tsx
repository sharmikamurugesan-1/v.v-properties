"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerCbRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // 1. Mark progressive enhancement
    document.documentElement.classList.add("js-ready");

    if (typeof window === "undefined") return;

    // 2. Register ScrollTrigger once
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
      ease: "power2.out",
      duration: 0.8,
    });

    const initLenis = () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isDesktop = window.innerWidth >= 1024;

      if (!isDesktop || prefersReduced) {
        if (lenisRef.current) {
          if (tickerCbRef.current) gsap.ticker.remove(tickerCbRef.current);
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
        return;
      }

      if (!lenisRef.current) {
        // High-performance snappy Lenis configuration (no dragging lag)
        const lenis = new Lenis({
          duration: 0.6,
          wheelMultiplier: 1.2,
          touchMultiplier: 0, // Disabled on touch
          infinite: false,
          syncTouch: false,
        });

        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        const tickerCb = (time: number) => {
          lenis.raf(time * 1000);
        };
        tickerCbRef.current = tickerCb;
        gsap.ticker.add(tickerCb);
      }
    };

    initLenis();

    // Pause animation/scrolling when tab is hidden to save battery & CPU
    const handleVisibilityChange = () => {
      if (!lenisRef.current) return;
      if (document.hidden) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initLenis();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
      if (tickerCbRef.current) {
        gsap.ticker.remove(tickerCbRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
