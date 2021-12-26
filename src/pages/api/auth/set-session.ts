import { NextApiRequest, NextApiResponse } from 'next';

import HTTPMethod from '@/constants/http-method';
import { setSession } from '@/libs/supabase.server';
import sendMethodNotAllowed from '@/utils/api-helpers/method-not-allowed';

export default function setSessionHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HTTPMethod.POST: {
      setSession(req, res);
      break;
    }
    default: {
      sendMethodNotAllowed(res);
    }
  }
}
