import type { NextApiRequest, NextApiResponse } from 'next';

import { createClient } from '@supabase/supabase-js';

import config from '@/config';
import serverConfig from '@/server-config';

const supabase = createClient(serverConfig.supabase.projectURL, serverConfig.supabase.anonKey);

export async function loginWithGoogle() {
  const response = await supabase.auth.signIn(
    { provider: 'google' },
    { redirectTo: `${config.appURL}/callback` }
  );
  return response;
}

export function setSession(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
