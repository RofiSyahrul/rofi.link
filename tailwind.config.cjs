const plugin = require('tailwindcss/plugin');

const colors = {
  current: 'currentColor',
  inherit: 'inherit',
  danger: {
    bright: 'var(--color-danger-bright)',
    bright1: 'var(--color-danger-bright1)',
    dim: 'var(--color-danger-dim)',
    dim1: 'var(--color-danger-dim1)',
  },
  neutral: {
    bright: 'var(--color-neutral-bright)',
    bright0: 'var(--color-neutral-bright0)',
    bright1: 'var(--color-neutral-bright1)',
    bright2: 'var(--color-neutral-bright2)',
    dim: 'var(--color-neutral-dim)',
    dim0: 'var(--color-neutral-dim0)',
    dim1: 'var(--color-neutral-dim1)',
    dim2: 'var(--color-neutral-dim2)',
  },
  primary: {
    bright: 'var(--color-primary-bright)',
    dim: 'var(--color-primary-dim)',
  },
  secondary: {
    bright: 'var(--color-secondary-bright)',
    dim: 'var(--color-secondary-dim)',
  },
  transparent: 'transparent',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,svelte}'],
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    plugin(({ addComponents }) => {
      addComponents({
        '.btn': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '0',
          fontWeight: 600,
          fontSize: '1rem',
          lineHeight: '1.5rem',
          border: 'none',
          outline: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '30%',
          },
          '&:hover:not(:disabled), &:focus-visible:not(:disabled)': {
            filter: 'brightness(80%)',
          },
          '&.btn-solid': {
            '&:disabled': {
              opacity: '50%',
            },
            '&.btn-primary': {
              color: colors.neutral.bright,
              backgroundColor: colors.primary.dim,
            },
            '&.btn-primary-invert': {
              color: colors.neutral.dim0,
              backgroundColor: colors.primary.bright,
            },
            '&.btn-secondary': {
              color: colors.neutral.bright,
              backgroundColor: colors.secondary.dim,
            },
            '&.btn-danger': {
              color: colors.neutral.bright,
              backgroundColor: colors.danger.dim,
            },
          },
          '&.btn-text': {
            backgroundColor: colors.transparent,
            '&:hover:not(:disabled)': {
              filter: 'none',
              textDecoration: 'underline',
            },
            '&.btn-primary': {
              color: colors.primary.dim,
            },
            '&.btn-secondary': {
              color: colors.secondary.dim,
            },
            '&.btn-danger': {
              color: colors.danger.dim,
            },
          },
          '&.btn-outline': {
            backgroundColor: colors.transparent,
            '&:hover:not(:disabled), &:focus-visible:not(:disabled)':
              {
                filter: 'opacity(50%)',
              },
            '&.btn-primary': {
              border: `1px solid ${colors.primary.dim}`,
              color: colors.primary.dim,
            },
            '&.btn-secondary': {
              border: `1px solid ${colors.secondary.dim}`,
              color: colors.secondary.dim,
            },
            '&.btn-danger': {
              border: `1px solid ${colors.danger.dim}`,
              color: colors.danger.dim,
            },
          },
        },
        '.visually-hidden': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          padding: '0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          border: '0',
          clip: 'rect(0, 0, 0, 0)',
        },
        '.snackbar-container': {
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: '1',
          maxWidth: 'calc(100% - 32px)',
          overflow: 'hidden',
        },
      });
    }),
  ],
  theme: {
    colors,
    fill: theme => theme('colors'),
    stroke: theme => theme('colors'),
    screens: {
      xxs: '320px',
      xs: '370px',
      sm: '420px',
      md: '540px',
    },
  },
  variants: {
    extend: {
      stroke: ['dark'],
      fill: ['dark'],
    },
  },
};
