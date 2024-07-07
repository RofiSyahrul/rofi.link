import { readFile } from 'node:fs/promises';
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

async function constructEnvSchema() {
  const defaultOGLogoBase64Src = await getDefaultOGLogoBase64Src();
  const defaultAppName = titleCase(pkg.name);

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
    OG_LOGO_BASE_64_SRC: envField.string({
      access: 'public',
      context: 'server',
      default: defaultOGLogoBase64Src,
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
