/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0fa3b1',
        secondary: '#f7a072',
        primaryLight: '#B5E2FA',
        secondaryLight: '#EDDEA4',
        neutral: '#F9F7F3',
      },
    },
  },
  plugins: [],
}

