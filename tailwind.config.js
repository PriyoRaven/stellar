/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#f0f4f9",
          200: "#e6eaf1",
          300: "#c4c7c5",
        },
      },
    },
  },
  plugins: [],
};
