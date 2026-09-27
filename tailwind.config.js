/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumiere: {
          dark: '#0a0809',
          charcoal: '#141113',
          panel: '#1a1618',
          ivory: '#fbf7f6',
          cream: '#f9ded8',
          blush: '#f9ded8',
          rosegold: '#e2a89d',
          beige: '#edd3cc',
          muted: '#a89895',
          gold: '#e2a89d',
          champagne: '#e2a89d',
        }
      },
      fontFamily: {
        serif: ['Italiana', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        display: ['Syne', 'Playfair Display', 'sans-serif'],
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.35em',
        'mega': '0.5em',
      }
    },
  },
  plugins: [],
}
