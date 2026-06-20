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
        // Primary — Louisiana Purple
        clay: {
          DEFAULT: "#4B2482",
          dark: "#341970",
          light: "#6B3DAB",
          "50": "#F3EEF9",
          "100": "#E0D0F5",
          "200": "#C4A8ED",
          "300": "#A880E4",
          "400": "#8C58DB",
          "500": "#6B3DAB",
          "600": "#4B2482",
          "700": "#341970",
          "800": "#1E0F42",
          "900": "#100821",
        },
        // Accent — Louisiana Gold
        sage: {
          DEFAULT: "#C8A227",
          dark: "#A88118",
          light: "#E0BF5A",
        },
        gold: {
          DEFAULT: "#C8A227",
          dark: "#A88118",
          light: "#E0BF5A",
        },
        // Neutrals
        espresso: "#1A1225",
        cocoa: "#3B2D55",
        mocha: "#7B6B95",
        adobe: "#D4CAE8",
        cream: "#F9F6FF",
        sand: "#EDE8F7",
      },
      backgroundImage: {
        "clay-gradient": "linear-gradient(135deg, #4B2482 0%, #6B3DAB 100%)",
        "warm-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, #EDE8F7 0%, #F9F6FF 100%)",
        "gold-gradient": "linear-gradient(135deg, #C8A227 0%, #E0BF5A 100%)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(75,36,130,0.07), 0 1px 2px rgba(75,36,130,0.05)",
        "card-hover": "0 8px 24px rgba(75,36,130,0.13), 0 2px 6px rgba(75,36,130,0.08)",
        "warm-lg": "0 16px 48px rgba(75,36,130,0.16), 0 4px 12px rgba(75,36,130,0.10)",
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
