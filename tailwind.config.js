/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        accent: {
          300: '#A855F7', // Bright Lavender
          400: '#7B2FF7', // Rich Violet
          500: '#7B2FF7', // Rich Violet (Primary Accent)
          600: '#9249F7', // Vibrant Middle violet
          700: '#A855F7', // Bright Lavender (End gradient)
          800: '#A855F7', // Bright Lavender (End gradient)
          950: '#1E004B', // Darkest Violet
        }
      }
    },
  },
  plugins: [],
};
