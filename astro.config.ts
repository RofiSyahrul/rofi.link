import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

import { env } from './astro.env';
import {
  assetsHashing,
  envInjector,
  globalInjector,
  serviceWorker,
} from './integrations';

const isVercel = process.env.DEPLOYMENT_PLATFORM === 'vercel';
const isSWEnabled = process.env.SW_ENABLED === 'true' || isVercel;

// https://astro.build/config
export default defineConfig({
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: process.env.DEV_TOOLBAR === 'true',
  },
  experimental: {
    env,
  },
  integrations: [
    svelte(),
    tailwind(),
    assetsHashing(),
    envInjector(),
    globalInjector(),
    serviceWorker({ enabled: isSWEnabled }),
  ],
  output: 'server',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  scopedStyleStrategy: 'class',
  server: {
    headers: {
      ...(!isVercel && {
        'Referrer-Policy': 'no-referrer-when-downgrade',
      }),
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '$lib/styles/mixins.scss';`,
        },
      },
    },
  },
});
