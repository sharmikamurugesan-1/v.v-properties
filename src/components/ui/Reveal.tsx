"use client";

import React from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${delay * 1000}ms` } : undefined}
      className={`reveal-item ${direction === 'none' ? 'reveal-none' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default Reveal;
