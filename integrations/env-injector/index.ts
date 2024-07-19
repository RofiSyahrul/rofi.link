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

  const publicDirPath = fileURLToPath(
    new URL('../../public', import.meta.url),
  );

  const [pagesDirContents, publicDirContents] = await Promise.all([
    readdir(pagesDirPath, {
      recursive: false,
      withFileTypes: false,
    }),
    readdir(publicDirPath, {
      recursive: false,
      withFileTypes: false,
    }),
  ]);

  const pagesAndPublicDirContents = [
    ...pagesDirContents,
    ...publicDirContents,
  ];

  const reservedSlugs: string[] = ['_actions', '_astro', '_image'];
  for (const name of pagesAndPublicDirContents) {
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

  const SITE_URL = new URL(process.env.SITE_URL!);

  const isGoogleAuthEnabled =
    SITE_URL.hostname === 'localhost' ||
    SITE_URL.hostname === 'rofi.link';

  return {
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
    IS_GOOGLE_AUTH_ENABLED: envField.boolean({
      access: 'public',
      context: 'server',
      default: isGoogleAuthEnabled,
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
