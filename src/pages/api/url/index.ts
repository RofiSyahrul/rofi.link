import type { NextApiResponse } from 'next';

import HTTPMethod from '@/constants/http-method';
import StatusCode from '@/constants/status-code';
import { getUrlsByUserId } from '@/libs/supabase/url/get-list-by-user';
import { shortenNewUrl } from '@/libs/supabase/url/new';
import type { ShortenNewUrlParam } from '@/types/url';
import ApiError from '@/utils/api-helpers/api-error';
import sendMethodNotAllowed from '@/utils/api-helpers/method-not-allowed';
import sendError from '@/utils/api-helpers/send-error';
import sendOK from '@/utils/api-helpers/send-ok';
import type { ApiRequest } from '@/utils/api-helpers/types';
import withMiddleware from '@/utils/api-helpers/with-middlewares';

async function handlePOST(req: ApiRequest<ShortenNewUrlParam>, res: NextApiResponse) {
  try {
    const { body, user } = req;
    if (!body.slug || !body.actualUrl) {
      throw new ApiError('`slug` and `actualUrl` are required');
    }

    await shortenNewUrl({
      actualUrl: body.actualUrl,
      slug: body.slug,
      userId: user.id
    });

    return sendOK(res);
  } catch (error) {
    return sendError(res, error);
  }
}

async function getMyURLs(req: ApiRequest, res: NextApiResponse) {
  try {
    const { user } = req;
    const myURLs = await getUrlsByUserId(user.id);
    return res.status(StatusCode.OK).json(myURLs);
  } catch (error) {
    return sendError(res, error);
  }
}

const apiURLHandler = withMiddleware((req, res) => {
  switch (req.method) {
    case HTTPMethod.GET:
      return getMyURLs(req, res);
    case HTTPMethod.POST:
      return handlePOST(req, res);
    default:
      return sendMethodNotAllowed(res);
  }
});

export default apiURLHandler;
