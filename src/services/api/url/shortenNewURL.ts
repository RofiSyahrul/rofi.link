import { AddUrlParam } from '@/types/url-model';

import { api } from '../_base';

export async function shortenNewURL(param: AddUrlParam) {
  const result = await api.post('/api/url', JSON.stringify(param));
  return result;
}

export const shortenNewURLKey = 'shorten-new-URL';
