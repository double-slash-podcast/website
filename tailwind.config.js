/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        darkPurple: '#3C0C55'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slideLeft1':'slideLeft1 40s linear infinite',
        'slideLeft2':'slideLeft2 40s linear infinite',
        'slideRight1':'slideRight1 40s linear infinite',
        'slideRight2':'slideRight2 40s linear infinite',
      },
      keyframes: {
        slideLeft1: {
          '0%':{ transform: 'translateX(0%)'},
          '100%': { transform: 'translateX(-100%)' }
        },
        slideLeft2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideRight1: {
          '0%':{ transform: 'translateX(-100%)'},
          '100%': { transform: 'translateX(0)' }
        },
        slideRight2: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
};
