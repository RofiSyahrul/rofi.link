import type { MiddlewareHandler } from 'astro';

export const initLocalsHandler: MiddlewareHandler = (
  { locals },
  next,
) => {
  locals.isMobile = false;
  return next();
};
