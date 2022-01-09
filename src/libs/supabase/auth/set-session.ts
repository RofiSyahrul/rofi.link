import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../_base';

export function setSession(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
