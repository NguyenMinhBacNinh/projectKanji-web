/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        torii: {
          DEFAULT: 'var(--color-torii)',
          light: 'var(--color-torii-light)',
          dark: '#991b1b',
          glow: 'rgba(185, 28, 28, 0.25)',
        },
        washi: {
          DEFAULT: 'var(--bg-wood)',
          light: 'var(--bg-card)',
          dark: 'var(--bg-subcard)',
          border: 'var(--border-subtle)',
        },
        sumi: {
          DEFAULT: 'var(--color-sumi)',
          light: '#292524',
          muted: 'var(--color-muted)',
        },
        bamboo: {
          DEFAULT: '#047857',
          light: '#059669',
          bg: '#ecfdf5',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: '#d97706',
          bg: '#fffbeb',
        },
        matcha: {
          DEFAULT: '#059669',
          light: '#10b981',
          dark: '#047857',
        },
      },
      fontFamily: {
        kanji: ['var(--font-kanji)', '"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
        ui: ['var(--font-ui)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        washi: 'var(--card-shadow)',
        hanko: '0 0 0 3px var(--color-torii), 0 4px 12px rgba(185, 28, 28, 0.3)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
        karuta: 'cubic-bezier(0.34, 1.15, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
