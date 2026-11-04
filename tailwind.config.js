/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
    './navigation/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F4F7FC',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#4F7CFF',
          dark: '#315BD9',
          soft: '#E9EFFF',
        },
        secondary: '#12213A',
        muted: '#64748B',
        border: '#E2E8F0',
        danger: {
          DEFAULT: '#DC4C64',
          soft: '#FFF0F3',
        },
        warning: {
          DEFAULT: '#D98B00',
          soft: '#FFF6DB',
        },
        sun: '#FFC857',
        'dark-background': '#0B1220',
        'dark-surface': '#152238',
        'dark-primary': '#7EA2FF',
        'dark-primary-dark': '#4F7CFF',
        'dark-primary-soft': '#20345C',
        'dark-secondary': '#F3F6FF',
        'dark-muted': '#9CAAC2',
        'dark-border': '#283A56',
        'dark-danger': '#FF7A90',
        'dark-danger-soft': '#3A1F2A',
        'dark-warning': '#FFC857',
        'dark-warning-soft': '#3B3018',
      },
      spacing: {
        inner: '1.25rem',
        section: '3.75rem',
        'content-bottom': '2.5rem',
      },
      borderRadius: {
        card: '1.75rem',
        control: '1rem',
      },
    },
  },
  plugins: [],
};
