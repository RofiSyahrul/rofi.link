import type { NextApiRequest, NextApiResponse } from 'next';

import HTTPMethod from '@/constants/http-method';
import StatusCode from '@/constants/status-code';
import { loginWithGoogle } from '@/libs/supabase.server';
import sendMethodNotAllowed from '@/utils/api-helpers/method-not-allowed';

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const response = await loginWithGoogle();
  return res.status(StatusCode.OK).json(response);
}

export default async function handleGoogleLogin(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HTTPMethod.POST:
      return handlePOST(req, res);
    default:
      return sendMethodNotAllowed(res);
  }
}
