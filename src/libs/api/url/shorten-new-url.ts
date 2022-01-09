import type { ShortenNewUrlParam } from '@/types/url';

import { api } from '../_base';

export async function shortenNewURL(param: ShortenNewUrlParam) {
  const result = await api.post('/api/url', JSON.stringify(param));
  return result;
}

export const shortenNewURLKey = 'shorten-new-URL';
