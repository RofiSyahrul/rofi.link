import 'dotenv/config';

import type { AstroUserConfig } from 'astro';
import { envField } from 'astro/config';

type Env = Required<AstroUserConfig>['experimental']['env'];

export const env: Env = {
  schema: {
    DATABASE_URL: envField.string({
      access: 'secret',
      context: 'server',
      url: true,
    }),
    DATABASE_URL_NON_POOLING: envField.string({
      access: 'secret',
      context: 'server',
      url: true,
    }),
    GOOGLE_AUTH_CLIENT_ID: envField.string({
      access: 'public',
      context: 'server',
      endsWith: '.apps.googleusercontent.com',
    }),
    GOOGLE_AUTH_CLIENT_SECRET: envField.string({
      access: 'secret',
      context: 'server',
    }),
    SHORTENED_URL_MANAGER_COOKIE_KEY: envField.string({
      access: 'secret',
      context: 'server',
      max: 24,
    }),
    SITE_URL: envField.string({
      access: 'public',
      context: 'server',
      url: true,
    }),
    USER_SESSION_COOKIE_KEY: envField.string({
      access: 'secret',
      context: 'server',
      max: 24,
    }),
  },
};
