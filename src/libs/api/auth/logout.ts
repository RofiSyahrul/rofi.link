import { api } from '../_base';

export async function logout() {
  const result = await api.post('/api/auth/set-session', JSON.stringify({ event: 'SIGNED_OUT' }));
  return result;
}

export const logoutKey = 'logout';
