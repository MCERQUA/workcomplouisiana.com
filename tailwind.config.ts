import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Terracotta Clay
        clay: {
          DEFAULT: "#9C3F24",
          dark: "#7E3119",
          light: "#AE5230",
          "50": "#FCF4F0",
          "100": "#F7E5DC",
          "200": "#EECBB9",
          "300": "#E0A98B",
          "400": "#C46B42",
          "500": "#AE5230",
          "600": "#9C3F24",
          "700": "#7E3119",
          "800": "#55200F",
          "900": "#331309",
        },
        // Accent — Natural Green
        sage: {
          DEFAULT: "#3D7A4F",
          dark: "#2E5C3B",
          light: "#5A9A6C",
        },
        // Accent — Gold
        gold: {
          DEFAULT: "#C8A227",
          dark: "#8A6910",
          light: "#E0BF5A",
        },
        // Neutrals
        espresso: "#1C1512",
        cocoa: "#3A2A20",
        mocha: "#7C6659",
        adobe: "#E2D3C6",
        cream: "#FDF8F4",
        sand: "#F5EAE0",
      },
      backgroundImage: {
        "clay-gradient": "linear-gradient(135deg, #7E3119 0%, #9C3F24 100%)",
        "warm-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, #F5EAE0 0%, #FDF8F4 100%)",
        "gold-gradient": "linear-gradient(135deg, #C8A227 0%, #E0BF5A 100%)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(92,45,24,0.07), 0 1px 2px rgba(92,45,24,0.05)",
        "card-hover": "0 8px 24px rgba(92,45,24,0.13), 0 2px 6px rgba(92,45,24,0.08)",
        warm: "0 6px 18px rgba(92,45,24,0.12), 0 2px 6px rgba(92,45,24,0.08)",
        "warm-lg": "0 16px 48px rgba(92,45,24,0.16), 0 4px 12px rgba(92,45,24,0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
