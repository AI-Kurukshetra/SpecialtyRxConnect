import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        line: "#e2e8f0",
        brand: {
          DEFAULT: "#0f172a",
          soft: "#334155",
          accent: "#2563eb"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        panel:
          "0 20px 45px rgba(15, 23, 42, 0.08), 0 6px 18px rgba(15, 23, 42, 0.04)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
