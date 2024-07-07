import astroServiceWorker from 'astrojs-service-worker';
import type { ServiceWorkerConfig } from 'astrojs-service-worker';

export function serviceWorker({
  enabled = false,
}: { enabled?: boolean } = {}) {
  if (!enabled) return null;

  const ONE_DAY = 24 * 60 * 60;

  return astroServiceWorker({
    workbox: {
      globIgnores: ['**/node_modules/**/*', '**/fonts/*'],
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxAgeSeconds: 7 * ONE_DAY,
              maxEntries: 50,
            },
          },
          urlPattern: new RegExp(
            String.raw`^https://(res\.cloudinary\.com/[a-zA-Z0-9_-]+/image/|\w+\.googleusercontent\.com)`,
          ),
        },
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxAgeSeconds: 120 * ONE_DAY,
              maxEntries: 50,
            },
          },
          urlPattern: new RegExp(String.raw`/fonts/.*\.woff2?$`),
        },
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'mp3',
            expiration: {
              maxAgeSeconds: 120 * ONE_DAY,
              maxEntries: 50,
            },
          },
          urlPattern: new RegExp(String.raw`/.*\.mp3$`),
        },
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'googlemaps',
            expiration: {
              maxAgeSeconds: 120 * ONE_DAY,
              maxEntries: 50,
            },
          },
          urlPattern: ({ url }) => {
            if (
              url.origin === 'https://maps.googleapis.com' ||
              url.origin === 'https://maps.gstatic.com'
            ) {
              return true;
            }

            if (url.origin === 'https://www.google.com') {
              return url.pathname.startsWith('/map/embed');
            }

            return false;
          },
        },
        {
          handler: 'NetworkFirst',
          method: 'GET',
          options: {
            cacheName: 'document',
            expiration: {
              maxAgeSeconds: 120 * ONE_DAY,
              maxEntries: 50,
            },
          },
          urlPattern: ({ request }) => {
            const accept = request.headers.get('accept') ?? '';
            return /text\/html/.test(accept);
          },
        },
      ],
    } as ServiceWorkerConfig['workbox'],
  });
}
