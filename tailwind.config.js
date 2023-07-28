/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        landing: "url('../assets/images/background.png')",
        landingLG: "url('../assets/images/background-lightG.png')",
        banner: "url('../assets/images/banner.jpg')",
      },
    },
  },
  plugins: [],
  darkTheme: "class",
};
