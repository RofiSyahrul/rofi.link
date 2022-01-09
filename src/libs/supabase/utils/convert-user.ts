import type { User as SupabaseUser } from '@supabase/supabase-js';

import type { User } from '@/types/user';

export function convertUserFromSupabase(user: SupabaseUser | null): User | null {
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
}
