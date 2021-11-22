const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  darkMode: 'class',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils/class-name/*.ts'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      neutral: {
        dim0: colors.blueGray[900],
        bright0: colors.blueGray[100],
        dim: colors.blueGray[800],
        bright: colors.blueGray[200],
        dim1: colors.blueGray[700],
        bright1: colors.blueGray[300],
        dim2: colors.blueGray[600],
        bright2: colors.blueGray[400]
      },
      primary: {
        dim: colors.sky[800],
        bright: colors.sky[200]
      },
      secondary: {
        dim: colors.emerald[600],
        bright: colors.lime[200]
      },
      danger: {
        dim: colors.red[700],
        bright: colors.red[200],
        dim1: colors.red[600],
        bright1: colors.red[300]
      }
    },
    fill: (theme) => theme('colors')
  },
  variants: {
    extend: {
      fill: ['dark']
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      /** @type {Record<string, React.CSSProperties>} */
      const newUtilities = {
        '.placeholder': {
          color: colors.blueGray[700]
        },
        '.placeholder-dark': {
          color: colors.blueGray[300]
        },
        '.placeholder-labeled-not-focus': {
          visibility: 'hidden'
        },
        '.placeholder-focus': {
          visibility: 'visible'
        }
      };

      addUtilities(newUtilities);
    })
  ]
};
