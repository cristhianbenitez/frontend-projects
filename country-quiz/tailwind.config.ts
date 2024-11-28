import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        dark: 'var(--dark)',
        cream: 'var(--cream)',
        blue: 'var(--blue)',
        red: 'var(--red)',
        gray: 'var(--gray)'
      },
      backgroundImage: {
        backgroundPattern: "url('/images/bg.jpg')"
      }
    }
  },
  plugins: []
} satisfies Config;
