/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ojuju: ["Bebas Neue", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      backgroundImage: {
        main: "url('./src/assets/img/festival.jpeg')",
        logo: "url('./src/assets/img/logo.png')",
      },
    },
    plugins: [],
  },
};
