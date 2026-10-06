import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004930",
          50: "#e8f2ee",
          100: "#c7ded5",
          200: "#99b6ac",
          300: "#6a9c8d",
          400: "#3d7f6c",
          500: "#004930",
          600: "#003f29",
          700: "#003220",
          800: "#002416",
          900: "#00180d",
        },
        gold: {
          DEFAULT: "#E8AF30",
          light: "#F5C75E",
          dark: "#C68E15",
        },
        accent: {
          DEFAULT: "#E8AF30",
          hover: "#d49d24",
        },
        dark: {
          DEFAULT: "#181818",
          secondary: "#232323",
          light: "#333333",
        },
        muted: {
          DEFAULT: "#6b7280",
          light: "#9ca3af",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8f9fa",
          accent: "#f4f7f5",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        heading: ["'Manrope'", "sans-serif"],
        handwriting: ["'Covered By Your Grace'", "cursive"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        bounceSlow: "bounceSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
