import config from '@/config';

import { supabase } from '../_base';

export async function loginWithGoogle() {
  const response = await supabase.auth.signIn(
    { provider: 'google' },
    { redirectTo: `${config.appURL}/p/callback` }
  );
  return response;
}
