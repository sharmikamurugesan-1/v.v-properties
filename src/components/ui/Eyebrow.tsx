import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light' | 'accent';
}

export function Eyebrow({ children, className = '', theme = 'light' }: EyebrowProps) {
  const themeClasses = {
    light: 'text-muted',
    dark: 'text-ivory/70',
    accent: 'text-accent'
  }[theme];

  return (
    <span
      className={`text-xs font-sans uppercase tracking-[0.18em] font-medium block mb-3 ${themeClasses} ${className}`}
    >
      {children}
    </span>
  );
}

export default Eyebrow;
