/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        playfair: ['Playfair Display', 'serif']
      },
      backgroundColor: {
        darkBlue: '#0E1325',
        grayBlue: '#394150'
      },
      backgroundImage: {
        headerImage: "url('@/assets/hero-image.png')",
        headerImageLG: "url('@/assets/hero-image-lg.png')",
        headerImageXL: "url('@/assets/hero-image-xl.png')"
      },
      textColor: {
        grayBlue: '#394150',
        white: '#E5E7EB',
        darkBlue: '#0E1325'
      },
      borderColor: {
        gray: '#394150'
      }
    }
  },
  plugins: []
};
