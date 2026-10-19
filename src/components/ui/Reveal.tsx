'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: direction === 'up' ? 28 : 0
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`reveal-init ${className}`}>
      {children}
    </div>
  );
}

export default Reveal;
