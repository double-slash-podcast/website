/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        darkPurple: '#3C0C55',
        yellowDs: '#FFE40F',
        purpleDs: '#9123CB',
        haiti: '#1A0724',
      },
      fill: {
        yellowDs: '#FFE40F',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'external-link':
          'url(data:image/svg+xml;base64,PHN2ZyBpZD0iZXh0ZXJuYWwiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uIiB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGRhdGEtdi0xMDg5NWM5MT0iIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCA2djJINXYxMWgxMXYtNWgydjZhMSAxIDAgMCAxLTEgMUg0YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAwIDEgMS0xaDZ6bTExLTN2OGgtMlY2LjQxM2wtNy43OTMgNy43OTRsLTEuNDE0LTEuNDE0TDE3LjU4NSA1SDEzVjNoOHoiLz48L3N2Zz4=);',
      },
      fontFamily: {
        brand: ['Mono45', 'Arial', 'sans-serif'],
        headings: ['Dank', 'Arial', 'sans-serif'],
        base: ['Inter', 'Arial', 'sans-serif'],
      },
      animation: {
        slideLeft1: 'slideLeft1 40s linear infinite',
        slideLeft2: 'slideLeft2 40s linear infinite',
        slideRight1: 'slideRight1 40s linear infinite',
        slideRight2: 'slideRight2 40s linear infinite',
      },
      keyframes: {
        slideLeft1: {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-100%)'},
        },
        slideLeft2: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0)'},
        },
        slideRight1: {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(0)'},
        },
        slideRight2: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(100%)'},
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
