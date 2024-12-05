/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      },
      fontSize: {
        'heading-l': ['20px', '1.25rem'], // Bold | DM Sans
        'heading-m': ['16px', '1rem'], // Medium | DM Sans
        'body-l': ['14px', '0.875rem'], // Bold, Medium | DM Sans
        'body-m': ['12px', '0.75rem'], // Medium | DM Sans
        caption: ['8px', '0.5rem'] // Medium | DM Sans
      },
      colors: {
        black: '#191B1F',
        dark: '#2A2D32',
        whiteCream: '#FEF7EE',
        gray: '#7E878D',
        darkLight: '#3A3E44',
        red: '#DD524C',
        lightRed: '#F6CCCB',
        blue: '#3662E3',
        blue2: '#70A3F3',
        lightBlue: '#DEE9FC',
        gold: '#C18D30',
        yellow: '#F3CE49',
        lightYellow: '#FDF9C9',
        green: '#4CA154',
        lightGreen: '#E2FBE8',
        violet: '#B787F5'
      }
    }
  },
  plugins: []
};
