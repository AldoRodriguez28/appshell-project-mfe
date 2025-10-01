/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff'
        },
        accent: '#f97316',
        surface: '#f3f4f6'
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif']
      }
    }
  },
  darkMode: 'class',
  plugins: []
};
