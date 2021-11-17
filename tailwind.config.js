const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  ...(process.env.NODE_ENV === 'production' && { mode: 'jit' }),
  darkMode: 'class',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          dim0: colors.gray[800],
          bright0: colors.gray[50],
          dim: colors.gray[700],
          bright: colors.gray[100],
          dim1: colors.gray[600],
          bright1: colors.gray[200],
          dim2: colors.gray[500],
          bright2: colors.gray[300]
        },
        primary: {
          dim: colors.cyan[700],
          bright: colors.cyan[100]
        },
        danger: {
          dim: colors.red[700],
          bright: colors.red[200],
          dim1: colors.red[600],
          bright1: colors.red[300]
        },
        cyan: colors.cyan,
        sky: colors.sky
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(({ addUtilities }) => {
      /** @type {Record<string, React.CSSProperties>} */
      const newUtilities = {
        '.placeholder': {
          color: colors.gray[600]
        },
        '.placeholder-dark': {
          color: colors.gray[300]
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
