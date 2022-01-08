import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

import { createClient } from '@supabase/supabase-js';

import config from '@/config';
import serverConfig from '@/server-config';
import type { User } from '@/types/user';

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

export async function getUser(req: GetServerSidePropsContext['req']): Promise<User | null> {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (!user) return null;
    return {
      avatarURL: user.user_metadata?.avatar_url ?? null,
      confirmedAt: user.confirmed_at ?? '',
      createdAt: user.created_at ?? '',
      email: user.email ?? '',
      fullName: user.user_metadata?.full_name ?? null,
      id: user.id ?? '',
      lastSignInAt: user.last_sign_in_at ?? ''
    };
  } catch {
    return null;
  }
}
