import React from 'react';
import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt: string;
  isRender?: boolean;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'wide';
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
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ProjectImageProps) {
  const aspectClasses = {
    video: 'aspect-[16/10]',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square'
  }[aspectRatio];

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-stone/30 ${aspectClasses} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
      />
      {isRender && (
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="inline-block px-2.5 py-1 text-[12px] font-sans font-medium text-ivory bg-ink/75 backdrop-blur-sm rounded-full border border-ivory/15">
            Artist&apos;s impression
          </span>
        </div>
      )}
    </div>
  );
}

export default ProjectImage;
