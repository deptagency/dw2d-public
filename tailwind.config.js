/** @type {import('tailwindcss').Config} */

// const generateColorClass = (variable) => {
//   return ({ opacityValue }) =>
//     opacityValue ? `rgba(var(--${variable}), ${opacityValue})` : `rgb(var(--${variable}))`
// }

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // colors: {
      //   baseDark: generateColorClass('baseDark'),
      // },
    },
  },
  plugins: [],
}
