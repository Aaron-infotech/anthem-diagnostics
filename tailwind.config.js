/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005BAC',
          dark: '#003E75',
          light: '#3378BE',
        },
        brandOrange: {
          DEFAULT: '#F26522',
          dark: '#D9520F',
          light: '#FF7D42',
        },
        'brandOrange-dark': '#D9520F',
        'brandOrange-light': '#FF7D42',
        accent: '#EAF5FF',
        ink: '#1F2937',
        line: '#D7E6F3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px -6px rgba(0, 91, 172, 0.15)',
        cardHover: '0 16px 40px -8px rgba(0, 91, 172, 0.28)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        countbar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill, 100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        countbar: 'countbar 1.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
