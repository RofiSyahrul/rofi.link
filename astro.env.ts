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
    SITE_URL: envField.string({
      access: 'public',
      context: 'server',
      url: true,
    }),
  },
};
