/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",  // Ensure it uses class-based toggling
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern-dark': `url("/src/assets/pattern-drak.svg")`,
        'grid-pattern-light': `url("/src/assets/pattern-light.svg")`, 
      },
    },
  },
  plugins: [],
};