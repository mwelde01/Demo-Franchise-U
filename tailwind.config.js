/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AD0000',
        black: '#000000',
        white: '#FFFFFF',
        secondary: '#8B9DA1',
        accent: '#FEBE10',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
