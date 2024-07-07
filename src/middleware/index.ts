import { defineMiddleware, sequence } from 'astro:middleware';
import dotenv from 'dotenv';

import { initLocalsHandler } from './locals';
import { userAgentHandler } from './user-agent';

dotenv.config();

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
  initLocalsHandler,
  userAgentHandler,
);

export const onRequest = defineMiddleware((ctx, next) => {
  if (isIgnored(ctx.url.pathname)) return next();
  return middlewareHandler(ctx, next);
});
