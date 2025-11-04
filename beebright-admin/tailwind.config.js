/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      beeYellow: "#facc15",
      honey: "#fbbf24",
      beeBlack: "#1a1a1a",
    },
  },
},
  plugins: [],
};
