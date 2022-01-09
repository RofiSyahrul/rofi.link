import { createClient } from '@supabase/supabase-js';

import serverConfig from '@/server-config';

export const supabase = createClient(
  serverConfig.supabase.projectURL,
  serverConfig.supabase.anonKey
);
