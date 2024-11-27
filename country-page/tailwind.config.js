/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif']
      },
      colors: {
        'primary-black': '#1B1D1F',
        'secondary-black': '#282B30',
        'primary-blue': '#4E80EE',
        'primary-gray': '#6C727F',
        'primary-white': '#D2D5DA'
      },
      backgroundImage: {
        'hero-pattern': "url('@assets/hero-image-wr.jpg')"
      },
      content: {
        'done-round': "url('@assets/Done_round.svg')"
      }
    }
  },
  plugins: []
};
