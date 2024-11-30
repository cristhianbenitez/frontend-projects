/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      },
      colors: {
        primary: '#6466e9',
        dark: '#141718',
        'dark-alt': '#242627',
        'gray-900': '#353839',
        'gray-400': '#b3b7b9',
        'gray-600': '#6d7275',
        white: '#f6fcfd'
      },
      backgroundImage: {
        'hero-image-sc': "url('/hero-image-sc.jpg')"
      }
    }
  },
  plugins: []
};
