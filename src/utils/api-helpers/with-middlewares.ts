import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getUser } from '@/libs/supabase/auth/get-user';
import parse from '@/utils/helpers/parse';

import sendError from './send-error';
import type { ApiRequest } from './types';

async function getUserId(req: NextApiRequest) {
  try {
    const user = await getUser(req);
    return user?.id ?? '';
  } catch {
    return '';
  }
}

export default function withMiddleware<ReqBody = any, ResData = any>(
  handler: (req: ApiRequest<ReqBody>, res: NextApiResponse<ResData>) => any
): NextApiHandler {
  return async (req, res) => {
    try {
      const userId = await getUserId(req);
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
