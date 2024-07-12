import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import { envField } from 'astro/config';

import pkg from '../../package.json';

function titleCase(value: string) {
  return value
    .replaceAll(/\W+/g, ' ')
    .replaceAll(/(^|\s)\w/g, matched => matched.toUpperCase());
}

async function getDefaultOGLogoBase64Src() {
  const logoPath = fileURLToPath(
    new URL(
      '../../public/icons/android-chrome-192x192.png',
      import.meta.url,
    ),
  );
  const logoBase64 = await readFile(logoPath, 'base64');
  return `data:image/png;base64,${logoBase64}`;
}

async function getReservedSlugs() {
  const pagesDirPath = fileURLToPath(
    new URL('../../src/pages', import.meta.url),
  );

  const pagesDirContents = await readdir(pagesDirPath, {
    recursive: false,
    withFileTypes: false,
  });

  const reservedSlugs: string[] = ['_actions', '_image'];
  for (const name of pagesDirContents) {
    reservedSlugs.push(name.replace(/\.(astro|ts|js)$/, ''));
  }

  return reservedSlugs;
}

async function constructEnvSchema() {
  const defaultAppName = titleCase(pkg.name);

  const [defaultOGLogoBase64Src, reservedSlugs] = await Promise.all([
    getDefaultOGLogoBase64Src(),
    getReservedSlugs(),
  ]);

  return {
    APP_DESC: envField.string({
      access: 'public',
      context: 'server',
      default: pkg.description,
    }),
    APP_NAME: envField.string({
      access: 'public',
      context: 'server',
      default: defaultAppName,
    }),
    APP_NAME_SHORT: envField.string({
      access: 'public',
      context: 'server',
      default: defaultAppName,
    }),
    APP_VERSION: envField.string({
      access: 'public',
      context: 'server',
      default: pkg.version,
    }),
    AUTHOR_NAME: envField.string({
      access: 'public',
      context: 'server',
      default: pkg.author.name,
    }),
    AUTHOR_URL: envField.string({
      access: 'public',
      context: 'server',
      default: pkg.author.url,
    }),
    OG_LOGO_BASE_64_SRC: envField.string({
      access: 'public',
      context: 'server',
      default: defaultOGLogoBase64Src,
    }),
    RESERVED_SLUG: envField.string({
      access: 'public',
      context: 'server',
      default: reservedSlugs.join(','),
    }),
  };
}

export function envInjector(): AstroIntegration {
  return {
    name: 'env-injector',
    hooks: {
      'astro:config:setup': async ({ updateConfig }) => {
        const envSchema = await constructEnvSchema();
        updateConfig({
          experimental: {
            env: {
              schema: envSchema,
            },
          },
        });
      },
    },
  };
}
