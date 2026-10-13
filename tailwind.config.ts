import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05060d",
        surface: "#0b0d1a",
        brand: { DEFAULT: "#7c5cff", cyan: "#22d3ee", pink: "#f472b6" },
      },
      fontFamily: {
        sans: ["'Inter Variable'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk Variable'", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        shine: { to: { backgroundPosition: "200% center" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        gridDrift: { to: { backgroundPosition: "56px 56px" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        marquee: "marquee 30s linear infinite",
        spinSlow: "spinSlow 14s linear infinite",
        gridDrift: "gridDrift 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
