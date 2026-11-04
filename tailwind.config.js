/** @type {import('tailwindcss').Config} */
module.exports = {
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
        sun: '#FFC857',
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
