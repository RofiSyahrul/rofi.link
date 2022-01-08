import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import StatusCode from '@/constants/status-code';
import { serverAuth } from '@/services/firebase/server';
import parse from '@/utils/helpers/parse';

import ApiError from './api-error';
import sendError from './send-error';
import type { ApiRequest } from './types';

async function verifyAuth(req: NextApiRequest) {
  try {
    const { authorization } = req.headers;
    const decoded = await serverAuth.decode(authorization ?? '');
    return decoded.uid;
  } catch {
    throw new ApiError('Unauthorized', StatusCode.Unauthorized);
  }
}

export default function withMiddleware<ReqBody = any, ResData = any>(
  handler: (req: ApiRequest<ReqBody>, res: NextApiResponse<ResData>) => any
): NextApiHandler {
  return async (req, res) => {
    try {
      const userId = await verifyAuth(req);
      const newReq: ApiRequest<ReqBody> = req as any;
      newReq.user = { id: userId };

      if (req.body) {
        const parsedBody = parse<ReqBody>(req.body);
        if (parsedBody) newReq.body = parsedBody;
      }

      await handler(newReq, res);
    } catch (error) {
      sendError(res, error);
    }
  };
}
