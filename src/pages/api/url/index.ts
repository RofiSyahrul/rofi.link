import type { NextApiResponse } from 'next';

import HTTPMethod from '@/constants/http-method';
import StatusCode from '@/constants/status-code';
import { url } from '@/services/firebase/server';
import type { AddUrlParam } from '@/types/url-model';
import ApiError from '@/utils/api-helpers/api-error';
import sendMethodNotAllowed from '@/utils/api-helpers/method-not-allowed';
import sendError from '@/utils/api-helpers/send-error';
import sendOK from '@/utils/api-helpers/send-ok';
import type { ApiRequest } from '@/utils/api-helpers/types';
import withMiddleware from '@/utils/api-helpers/with-middlewares';

async function handlePOST(req: ApiRequest<AddUrlParam>, res: NextApiResponse) {
  try {
    const { body, user } = req;
    if (!body.slug || !body.actualURL) {
      throw new ApiError('`slug` and `actualURL` are required');
    }

    const isAvailable = await url.isAvailable(body.slug);
    if (!isAvailable) {
      throw new ApiError(`${body.slug} already exists`);
    }

    await url.add({
      ...body,
      user: user.id
    });

    return sendOK(res);
  } catch (error) {
    return sendError(res, error);
  }
}

async function getMyURLs(req: ApiRequest, res: NextApiResponse) {
  try {
    const { user } = req;
    const myURLs = await url.getMyURLs(user.id);
    if (!myURLs) {
      throw new ApiError('Not Found', StatusCode.NotFound);
    }
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
