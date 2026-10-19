import React from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  level?: 'display' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

export function Heading({
  as: Component = 'h2',
  level = 'h2',
  children,
  className = '',
  theme = 'light'
}: HeadingProps) {
  const sizeClasses = {
    display: 'text-display leading-[1.05] tracking-tight',
    h1: 'text-h2-fluid sm:text-display leading-[1.08] tracking-tight',
    h2: 'text-h2-fluid leading-[1.12] tracking-tight',
    h3: 'text-h3-fluid leading-[1.2] tracking-tight'
  }[level];

  const colorClass = theme === 'dark' ? 'text-ivory' : 'text-ink';

  return (
    <Component className={`font-serif font-normal ${sizeClasses} ${colorClass} ${className}`}>
      {children}
    </Component>
  );
}

export default Heading;
