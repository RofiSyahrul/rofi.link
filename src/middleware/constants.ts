import type { AstroCookieSetOptions } from 'astro';

export const COOKIES_SET_OPTIONS: AstroCookieSetOptions = {
  httpOnly: true,
  maxAge: 31_536_000,
  path: '/',
  sameSite: 'lax',
  secure:
    import.meta.env.PROD &&
    import.meta.env.SITE.startsWith('https://'),
};
