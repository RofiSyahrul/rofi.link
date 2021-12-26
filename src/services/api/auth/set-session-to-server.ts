import type { Session } from '@supabase/supabase-js';

import { api } from '../_base';

export async function setSessionToServer(session: Session) {
  const result = await api.post(
    '/api/auth/set-session',
    JSON.stringify({ event: 'SIGNED_IN', session })
  );
  return result;
}

export const setSessionToServerKey = 'set-session-to-server';
