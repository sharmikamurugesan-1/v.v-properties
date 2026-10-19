import React from 'react';

interface DividerProps {
  className?: string;
  theme?: 'stone' | 'ink';
}

export function Divider({ className = '', theme = 'stone' }: DividerProps) {
  const color = theme === 'stone' ? 'border-stone' : 'border-ink/10';
  return <hr className={`w-full border-t ${color} my-8 md:my-12 ${className}`} />;
}

export default Divider;
