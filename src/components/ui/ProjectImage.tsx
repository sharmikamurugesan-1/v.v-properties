"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt: string;
  isRender?: boolean;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'wide' | '16/10' | '16/9';
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProjectImage({
  src,
  alt,
  isRender = true,
  aspectRatio = 'video',
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const aspectClasses: Record<string, string> = {
    video: 'aspect-[16/10]',
    '16/10': 'aspect-[16/10]',
    '16/9': 'aspect-[16/9]',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
  };

  const selectedAspect = aspectClasses[aspectRatio] || 'aspect-[16/10]';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-stone/20 ${selectedAspect} min-h-[240px] md:min-h-[320px] ${className}`}
    >
      <Image
        src={hasError ? '/images/hero.jpg' : imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        onError={() => {
          setHasError(true);
          setImgSrc('/images/hero.jpg');
        }}
        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
      />
      {isRender && (
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="inline-block px-2.5 py-1 text-[11px] font-sans font-medium text-ivory bg-ink/80 backdrop-blur-md rounded-full border border-ivory/15 shadow-sm">
            Visual reference
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectImage;
