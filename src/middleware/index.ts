import 'dotenv/config';

import { defineMiddleware, sequence } from 'astro:middleware';

import { injectColorModeManager } from './color-mode';
import { injectLogger } from './logger';
import { userAgentHandler } from './user-agent';

const IGNORED_PATHNAMES = new Set([
  '/browserconfig.xml',
  '/manifest.json',
  '/og.png',
]);

const isIgnored = (pathname: string): boolean => {
  return (
    IGNORED_PATHNAMES.has(pathname) || pathname.startsWith('/api/')
  );
};

const middlewareHandler = sequence(
  injectLogger,
  injectColorModeManager,
  userAgentHandler,
);

export const onRequest = defineMiddleware((ctx, next) => {
  if (isIgnored(ctx.url.pathname)) return next();
  return middlewareHandler(ctx, next);
});
