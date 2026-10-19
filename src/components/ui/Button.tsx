import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  href?: string;
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  href,
  arrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 min-h-[44px] min-w-[44px] group focus-visible:outline-none';

  const variants = {
    primary:
      'bg-ink text-ivory rounded-full px-7 py-3 hover:bg-ink-soft hover:shadow-subtle active:scale-[0.98]',
    secondary:
      'text-ink hover:text-accent relative pb-1 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300',
    outline:
      'border border-ink/20 text-ink rounded-full px-7 py-3 hover:border-ink hover:bg-ink/5 active:scale-[0.98]',
    accent:
      'bg-accent text-paper rounded-full px-7 py-3 hover:bg-accent-hover hover:shadow-subtle active:scale-[0.98]'
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variants} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variants} ${className}`} {...props}>
      {content}
    </button>
  );
}

export default Button;
