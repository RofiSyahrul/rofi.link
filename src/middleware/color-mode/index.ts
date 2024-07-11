import type { AstroCookies, MiddlewareHandler } from 'astro';
import { z } from 'astro/zod';

const colorModeSchema = z.enum(['dark', 'light']);

export type ColorMode = z.infer<typeof colorModeSchema>;

class ColorModeManager {
  readonly #cookieKey = 'rofi.link-color-mode';
  readonly #cookies: AstroCookies;

  constructor(cookies: AstroCookies) {
    this.#cookies = cookies;
  }

  get #cookieValue() {
    const colorModeCookie = this.#cookies.get(this.#cookieKey);
    const { data } = colorModeSchema.safeParse(
      colorModeCookie?.value,
    );
    return data;
  }

  hasCookieValue() {
    return Boolean(this.#cookieValue);
  }

  get colorMode() {
    return this.#cookieValue ?? 'light';
  }

  toggle() {
    const current = this.colorMode;
    const next: typeof current =
      current === 'dark' ? 'light' : 'dark';

    this.#cookies.set(this.#cookieKey, next, {
      httpOnly: true,
      maxAge: 31_536_000,
      path: '/',
      sameSite: 'lax',
      secure:
        import.meta.env.PROD &&
        import.meta.env.SITE.startsWith('https://'),
    });

    return next;
  }
}

export type { ColorModeManager };

export const injectColorModeManager: MiddlewareHandler = (
  ctx,
  next,
) => {
  ctx.locals.colorModeManager = new ColorModeManager(ctx.cookies);
  return next();
};
