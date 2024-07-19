import 'dotenv/config';

import { defineMiddleware, sequence } from 'astro:middleware';

import { injectColorModeManager } from './color-mode';
import { languageHandler } from './lang';
import { injectLogger } from './logger';
import { sessionInjectorAndHandler } from './session';
import { userAgentHandler } from './user-agent';

const IGNORED_PATHNAMES = new Set([
  '/browserconfig.xml',
  '/en/manifest.json',
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
  sessionInjectorAndHandler,
  languageHandler,
);

export const onRequest = defineMiddleware((ctx, next) => {
  if (isIgnored(ctx.url.pathname)) return next();

  ctx.locals.isErrorPage = false;
  return middlewareHandler(ctx, next);
});
