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
        // Nidō brand palette
        terracotta: {
          DEFAULT: "#C4622D",
          light: "#D4733E",
          pale: "#FBF0EB",
          dark: "#A85224",
        },
        sage: {
          DEFAULT: "#7C9070",
          light: "#E8EFEA",
          dark: "#5E7154",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          soft: "#3A3A3A",
          muted: "#6B6B6B",
        },
        cream: {
          DEFAULT: "#F7F3EE",
          warm: "#EDE8E1",
          deep: "#DDD7CE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 50%, rgba(196,98,45,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(124,144,112,0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
