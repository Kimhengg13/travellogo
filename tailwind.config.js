/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Outfit'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        primary: "#0287a8",
        secondary: "#00c3c7",
        accent: "#f59e0b",
        dark: "#0f172a",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(2, 135, 168, 0.35)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
