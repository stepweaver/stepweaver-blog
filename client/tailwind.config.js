/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#FF5200',
        'dark': '#343a40',
        'light': '#f4f4f4',
        'danger': '#f5000c',
        'success': '#28a745',
        'background': '#343a40',
      }
    }
  },
  plugins: [require('daisyui')]
};