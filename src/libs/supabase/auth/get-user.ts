import type { GetServerSidePropsContext, NextApiRequest } from 'next';

import type { User } from '@/types/user';

import { supabase } from '../_base';
import { convertUserFromSupabase } from '../utils/convert-user';
import { logError } from '../utils/log-error';

export async function getUser(
  req: GetServerSidePropsContext['req'] | NextApiRequest
): Promise<User | null> {
  try {
    if (!req.cookies['sb:token']) return null;
    const { user, error } = await supabase.auth.api.getUserByCookie(req);
    if (error) throw error as unknown;
    return convertUserFromSupabase(user);
  } catch (err) {
    logError('getUser', err);
    return null;
  }
}
