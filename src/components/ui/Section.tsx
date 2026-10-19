import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  theme?: "ivory" | "ink" | "paper";
  background?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Section({
  children,
  className = "",
  id,
  theme,
  background = "ivory",
  padding = "lg",
  ...props
}: SectionProps) {
  const chosenTheme = (theme || background) as "ivory" | "ink" | "paper";

  const themeClasses: Record<string, string> = {
    ivory: "bg-ivory text-ink",
    ink: "bg-ink text-ivory",
    paper: "bg-paper text-ink",
  };

  const paddingClasses = {
    none: "",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-36",
  }[padding];

  return (
    <section
      id={id}
      className={`${paddingClasses} relative overflow-hidden ${themeClasses[chosenTheme] || "bg-ivory text-ink"} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
