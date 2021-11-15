import { NextApiHandler, NextApiResponse } from 'next';

import StatusCode from '@/constants/status-code';
import parse from '@/utils/helpers/parse';

import isTrustedReferer from './is-trusted-referrer';
import { ApiRequest } from './types';

export default function withMiddleware<ReqBody = any, ResData = any>(
  handler: (req: ApiRequest<ReqBody>, res: NextApiResponse<ResData>) => any
): NextApiHandler {
  return async (req, res) => {
    const isTrusted = isTrustedReferer(req);
    if (!isTrusted) {
      res.status(StatusCode.Forbidden).json({ error: { message: 'Forbidden' } });
      return;
    }

    if (req.body) {
      const parsedBody = parse(req.body);
      if (parsedBody) req.body = parsedBody;
    }

    await handler(req, res);
  };
}
