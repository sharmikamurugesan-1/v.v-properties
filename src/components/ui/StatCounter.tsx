'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className = ''
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(obj.val));
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`text-left ${className}`}>
      <span className="font-serif text-3xl sm:text-4xl text-ink font-normal block">
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs font-sans uppercase tracking-[0.15em] text-muted block mt-1">
        {label}
      </span>
    </div>
  );
}

export default StatCounter;
