/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-html/html',
    'stylelint-config-html/astro',
    'stylelint-config-html/svelte',
    'stylelint-config-prettier-scss',
  ],

  ignorePatterns: [
    '**/.astro/',
    '**/dist/',
    '**/node_modules',
    '**/public',
  ],

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind', 'layer'],
      },
    ],
    'custom-media-pattern': [
      '^([a-z][a-z0-9]*)((-|_|__)[a-z0-9]+)*$',
      {
        message: 'Expected custom media query name to be kebab-case',
      },
    ],
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)((-|_|__)[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case',
      },
    ],
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)((-|_|__)[a-z0-9]+)*$',
      {
        message: 'Expected keyframe name to be kebab-case',
      },
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)((-|_|__)[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)((-|_|__)[a-z0-9]+)*$',
      {
        message: 'Expected id selector to be kebab-case',
      },
    ],
    'block-no-empty': true,
    'media-feature-range-notation': 'prefix',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'unit-allowed-list': [
      'em',
      'rem',
      'ms',
      's',
      'px',
      '%',
      'deg',
      'fr',
      'vh',
      'vw',
      'svh',
      'svw',
    ],
  },
};
