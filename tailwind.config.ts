import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    screens: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },
    extend: {
      keyframes: {
    shimmer: {
      "0%": { backgroundPosition: "-1000px 0" },
      "100%": { backgroundPosition: "1000px 0" },
    },
  },
  animation: {
    shimmer: "shimmer 2s infinite linear",
  },
   fontFamily: {
        'galleds-stars': ['var(--font-galleds-stars)'],
      },

      colors: {
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        dark: "var(--color-dark)",
        "dark-grey": "var(--color-dark-grey)",
        border: "var(--color-border)",
        badge: "var(--color-badge)",
        "text-Paragraph": "var(--color-text-Paragraph)",
        "border-darker": "var(--color-border-darker)",
        "text-darker": "var(--color-text-darker)",
        "filter-border": "var(--color-filter-border)",
      },
      fontSize: {
        "2xs": "0.75rem",
        xs: "0.875rem",
        sm: "1rem",
        base: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem", 
        "40xl":"2.5rem",
        "22xl":"1.375rem",
        "2xl": "1.875rem",
        "3xl": "2.25rem",
        "4xl": "3rem",
        "5xl": "4rem",
        "6xl": "5rem",
        "7xl": "6rem",

      },
    },
  },
  plugins: [],
};

export default config;
