import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Quiet-Luxury Design System Palette
        ink: {
          DEFAULT: "#0B1F3A", // Primary deep navy
          soft: "#1B3354",    // Supporting soft navy
        },
        ivory: "#F7F4EE",     // Warm paper canvas background
        paper: "#FFFFFF",     // Pure crisp white
        stone: {
          DEFAULT: "#E6E1D6", // 1px hairline dividers
          light: "#EFECE6",
        },
        muted: "#5B6577",     // Secondary text (passes 4.5:1 contrast on ivory)
        accent: {
          DEFAULT: "#B08D57", // Muted champagne gold
          hover: "#997843",
          light: "#F5EFE6",
        },
        success: "#2F6F4F",   // "Available" status only
        danger: "#9B2C2C",    // Errors only

        // Legacy compatibility mappings
        brand: {
          midnight: "#0B1F3A",
          navy: "#0B1F3A",
          royal: "#1B3354",
          electric: "#B08D57",
          sky: "#39A8F4",
          softblue: "#A9D8F7",
          ice: "#EAF4FF",
          pale: "#D6E9FF",
          steel: "#5B6577",
          bluegray: "#E3ECF5",
          
          purewhite: "#FFFFFF",
          warmwhite: "#F7F4EE",
          cloudwhite: "#F7F4EE",
          coolwhite: "#F1F6FB",
          softwhite: "#F7F4EE",
          
          darkgreen: "#2F6F4F",
          foliage: "#2F6F4F",
          botanical: "#E3EFE8",
          
          text: "#0B1F3A",
          neutral: "#0B1F3A",
          subtext: "#5B6577",
          muted: "#5B6577",
          border: "#E6E1D6",
          divider: "#E6E1D6",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "Plus Jakarta Sans", "sans-serif"],
        tamil: ["var(--font-tamil)", "Noto Sans Tamil", "sans-serif"],
      },
      fontSize: {
        // Fluid typography clamp definitions
        'display': 'clamp(3.5rem, 6vw, 6rem)',    // 56px - 96px
        'h2-fluid': 'clamp(2.25rem, 4vw, 3.5rem)', // 36px - 56px
        'h3-fluid': 'clamp(1.5rem, 2.5vw, 2rem)',  // 24px - 32px
      },
      maxWidth: {
        'site': '1280px',
      },
      borderRadius: {
        'button': '9999px', // Unified rounded-full for buttons
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(11, 31, 58, 0.04)',
        'elevated': '0 10px 30px -10px rgba(11, 31, 58, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
