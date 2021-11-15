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
        cyan: colors.cyan,
        sky: colors.sky
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(({ addComponents }) => {
      /** @type {Record<string, React.CSSProperties>} */
      const placeholders = {
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

      addComponents(placeholders);
    })
  ]
};
