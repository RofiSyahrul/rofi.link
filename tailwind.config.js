/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  ...(process.env.NODE_ENV === 'production' && { mode: 'jit' }),
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
