/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-background-color)",
      },
      fontFamily: {
        SpaceGrotesk: ["var(--font-SpaceGrotesk)", ...defaultTheme.fontFamily.sans],
      },
    },
    
  },
  plugins: [],
};
