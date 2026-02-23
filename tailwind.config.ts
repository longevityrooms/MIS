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
        forest: {
          DEFAULT: "#2F4F4F",
          light: "#3a6363",
          dark: "#1a3333",
          muted: "#4d7c7c",
        },
        bronze: {
          DEFAULT: "#B87333",
          light: "#c98840",
          dark: "#8B5A2B",
        },
        cream: {
          DEFAULT: "#F5E6D3",
          light: "#faf4ec",
          dark: "#ede0cc",
        },
        "text-dark": "#1a3333",
        "text-mid": "#2F4F4F",
        "text-light": "#6b8f8f",
        "text-muted": "#9ab0b0",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Lato", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'glass-sm': '0 2px 12px rgba(47,79,79,0.12), 0 1px 3px rgba(0,0,0,0.08)',
        'glass-md': '0 8px 32px rgba(47,79,79,0.18), 0 2px 8px rgba(0,0,0,0.1)',
        'glass-lg': '0 20px 60px rgba(47,79,79,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        'glass-xl': '0 40px 100px rgba(47,79,79,0.28), 0 8px 30px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
