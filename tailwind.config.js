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
        stone: {
          850: '#211e1c',
          925: '#141211',
        },
        akira: {
          DEFAULT: '#BC002D',
          light: '#D93848',
          dark: '#8B0000',
        },
        'manga-yellow': '#F59E0B',
      },
      fontFamily: {
        kanji: ['var(--font-kanji)', '"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
        ui: ['var(--font-ui)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        washi: 'var(--card-shadow)',
        hanko: '0 0 0 3px var(--color-torii), 0 4px 12px rgba(188, 0, 45, 0.3)',
        manga: '2px 2px 0px rgba(45, 38, 30, 0.5), 0 3px 10px -2px rgba(45, 38, 30, 0.1)',
        'manga-sm': '1.5px 1.5px 0px rgba(45, 38, 30, 0.45)',
        'manga-lg': '3px 3px 0px rgba(45, 38, 30, 0.5), 0 6px 18px -3px rgba(45, 38, 30, 0.12)',
        'manga-xl': '4px 4px 0px rgba(45, 38, 30, 0.55), 0 8px 24px -4px rgba(45, 38, 30, 0.15)',
        'manga-red': '2px 2px 0px #BC002D',
        'manga-yellow': '2px 2px 0px #C27803',
        'manga-dark': '2px 2px 0px rgba(255, 255, 255, 0.25)',
        'manga-dark-lg': '3px 3px 0px rgba(255, 255, 255, 0.3)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        karuta: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
