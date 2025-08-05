/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF6B35',
        'orange-light': '#FF8A65',
        'orange-dark': '#E55A2B',
      }
    },
  },
  plugins: [],
} 