import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ["var(--font-cabinet)", "sans-serif"],
        array: ["var(--font-array)", "sans-serif"],
        sans: ["var(--font-cabinet)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
