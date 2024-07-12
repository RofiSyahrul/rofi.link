const twColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const colors = {
  current: 'currentColor',
  danger: {
    bright: twColors.red[200],
    bright1: twColors.red[300],
    dim: twColors.red[900],
    dim1: twColors.red[800],
  },
  inherit: 'inherit',
  neutral: {
    bright: twColors.slate[200],
    bright0: twColors.slate[100],
    bright1: twColors.slate[300],
    bright2: twColors.slate[400],
    dim: twColors.slate[800],
    dim0: twColors.slate[900],
    dim1: twColors.slate[700],
    dim2: twColors.slate[600],
  },
  primary: {
    bright: twColors.sky[200],
    dim: twColors.sky[800],
  },
  secondary: {
    bright: twColors.lime[200],
    dim: twColors.emerald[600],
  },
  transparent: 'transparent',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,svelte}'],
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    plugin(({ addComponents, addUtilities }) => {
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
        '.dark .btn': {
          '&.btn-solid': {
            '&.btn-primary': {
              color: colors.neutral.dim,
              backgroundColor: colors.primary.bright,
            },
            '&.btn-primary-invert': {
              color: colors.neutral.bright0,
              backgroundColor: colors.primary.dim,
            },
            '&.btn-secondary': {
              color: colors.neutral.dim,
              backgroundColor: colors.secondary.bright,
            },
            '&.btn-danger': {
              color: colors.neutral.dim,
              backgroundColor: colors.danger.bright,
            },
          },
          '&.btn-text': {
            '&.btn-primary': {
              color: colors.primary.bright,
            },
            '&.btn-secondary': {
              color: colors.secondary.bright,
            },
            '&.btn-danger': {
              color: colors.danger.bright,
            },
          },
          '&.btn-outline': {
            '&.btn-primary': {
              border: `1px solid ${colors.primary.bright}`,
              color: colors.primary.bright,
            },
            '&.btn-secondary': {
              border: `1px solid ${colors.secondary.bright}`,
              color: colors.secondary.bright,
            },
            '&.btn-danger': {
              border: `1px solid ${colors.danger.bright}`,
              color: colors.danger.bright,
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

      addUtilities({
        '.layout-full': {
          minHeight: 'calc(100vh - 15rem)',
          width: '100%',
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
