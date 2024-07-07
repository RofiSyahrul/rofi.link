import type { MiddlewareHandler } from 'astro';
import { UAParser } from 'ua-parser-js';

const MOBILE_DEVICE_TYPES = new Set([
  UAParser.DEVICE.MOBILE,
  UAParser.DEVICE.EMBEDDED,
  UAParser.DEVICE.WEARABLE,
  UAParser.DEVICE.CONSOLE,
]);

export const userAgentHandler: MiddlewareHandler = (
  { locals, request },
  next,
) => {
  const userAgent = request.headers.get('user-agent') ?? '';
  const parsed = UAParser(userAgent);

  locals.isMobile = MOBILE_DEVICE_TYPES.has(parsed?.device?.type);

  return next();
};
