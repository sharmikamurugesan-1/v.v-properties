import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ children, className = '', size = 'default', ...props }: ContainerProps) {
  const maxWidth = {
    default: 'max-w-[1280px]',
    narrow: 'max-w-[960px]',
    wide: 'max-w-[1440px]'
  }[size];

  return (
    <div className={`mx-auto px-5 md:px-10 w-full ${maxWidth} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Container;
