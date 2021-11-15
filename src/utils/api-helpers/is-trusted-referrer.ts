import { URL } from 'url';

import { NextApiRequest } from 'next';

import config from '@/config';

export default function isTrustedReferer(req: NextApiRequest): boolean {
  const { referer } = req.headers;
  if (!referer) return false;

  const url = new URL(referer);
  return url.origin === config.appURL;
}
