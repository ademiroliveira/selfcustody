/** @type {import('tailwindcss').Config} */
// Tailwind v4 configuration is handled via global.css (@import 'tailwindcss' / @import 'uniwind').
// This file is kept for tooling compatibility but is not actively used by Uniwind.
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
