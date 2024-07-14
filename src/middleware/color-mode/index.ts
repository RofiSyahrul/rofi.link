import type { AstroCookies, MiddlewareHandler } from 'astro';
import { z } from 'astro/zod';

import { COOKIES_SET_OPTIONS } from '../constants';

const colorModeSchema = z.enum(['dark', 'light']);

export type ColorMode = z.infer<typeof colorModeSchema>;

class ColorModeManager {
  readonly #cookieKey = 'rofi.link-color-mode';
  readonly #cookies: AstroCookies;

  #colorMode: ColorMode | undefined;

  constructor(cookies: AstroCookies) {
    this.#cookies = cookies;
  }

  public get colorMode() {
    if (this.#colorMode) return this.#colorMode;

    const colorModeCookie = this.#cookies.get(this.#cookieKey);
    const { data } = colorModeSchema.safeParse(
      colorModeCookie?.value,
    );

    this.#colorMode = data ?? 'light';

    return this.#colorMode;
  }

  public toggle() {
    this.#colorMode = this.colorMode === 'dark' ? 'light' : 'dark';

    this.#cookies.set(
      this.#cookieKey,
      this.#colorMode,
      COOKIES_SET_OPTIONS,
    );

    return this;
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
