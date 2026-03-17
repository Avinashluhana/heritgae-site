/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        heritage: {
          50: '#fdf8f0',
          100: '#f9edd8',
          400: '#d4a05a',
          500: '#c8873a',
          600: '#b5722e',
          700: '#8f5520',
          900: '#3d2008',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
