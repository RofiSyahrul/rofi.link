import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import astroParser from 'astro-eslint-parser';
import eslintPluginImport from 'eslint-plugin-import';
import importAlias from 'eslint-plugin-import-alias';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/.astro/',
      '**/dist',
      '**/node_modules',
      '**/public',
      'src/lib/types/schema.ts',
    ],
  },

  ...fixupConfigRules(
    compat.extends(
      'plugin:prettier/recommended',
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:astro/recommended',
      'plugin:svelte/recommended',
      'plugin:unicorn/all',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ),
  ),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          arrowFunctions: true,
          jsx: true,
        },

        extraFileExtensions: ['.svelte'],
        parser: '@typescript-eslint/parser',
        project: 'tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(eslintPluginImport),
      'import-alias': importAlias,
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/unbound-method': 0,
      'import-alias/import-alias': [
        'error',
        {
          relativeDepth: 1,
        },
      ],
      'import/default': 0,
      'import/namespace': 0,
      'import/no-dynamic-require': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': [
        'error',
        {
          amd: true,
          commonjs: true,
          ignore: [String.raw`\.astro$`, 'astro:*'],
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: '{$**,$/**}',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['svelte'],
        },
      ],
      'import/prefer-default-export': 0,
      'no-console': 'warn',
      'no-unused-vars': 0,
      'unicorn/no-keyword-prefix': 0,
      'unicorn/no-null': 0,
      'unicorn/no-useless-switch-case': 0,
      'unicorn/no-useless-undefined': 0,
      'unicorn/prevent-abbreviations': 0,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.js', '.mjs', '.cjs'],
          moduleDirectory: ['node_modules', 'src/'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      svelte: {
        ignoreWarnings: [
          '@typescript-eslint/no-unsafe-assignment',
          '@typescript-eslint/no-unsafe-member-access',
        ],
      },
    },
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/no-base-to-string': 0,
      '@typescript-eslint/no-redundant-type-constituents': 0,
      '@typescript-eslint/no-unnecessary-type-assertion': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      'unicorn/prefer-module': 0,
    },
  },

  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/no-base-to-string': 0,
      '@typescript-eslint/no-redundant-type-constituents': 0,
      '@typescript-eslint/no-unnecessary-type-assertion': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      'import/no-duplicates': 0,
    },
  },

  {
    files: ['**/*.cjs', '**/*.mjs', '**/*.js'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
    },
  },

  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 0,
    },
  },

  {
    files: ['integrations/**/*.ts'],
    rules: {
      'import-alias/import-alias': 0,
    },
  },
];
