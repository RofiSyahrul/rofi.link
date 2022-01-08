import { api } from '../_base';

export async function loginWithGoogle() {
  const result = await api.post<{ url?: string }>('/api/auth/google');
  return result;
}

export const loginWithGoogleKey = 'login-with-google';
