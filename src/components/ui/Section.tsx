import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  theme?: 'ivory' | 'ink' | 'paper';
}

export function Section({
  children,
  className = '',
  id,
  theme = 'ivory',
  ...props
}: SectionProps) {
  const themeClasses = {
    ivory: 'bg-ivory text-ink',
    ink: 'bg-ink text-ivory',
    paper: 'bg-paper text-ink'
  }[theme];

  return (
    <section
      id={id}
      className={`py-24 md:py-36 relative overflow-hidden ${themeClasses} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
