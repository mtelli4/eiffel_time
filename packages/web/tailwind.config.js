/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{html,js,ts,tsx}',
    '../../shared/**/*.{html,js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E3494',
        secondary: '#D9D9D9',
        background: '#ECF0F1',
      },
    },
  },
  plugins: [],
}
