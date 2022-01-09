import type { UrlModel } from '@/types/url';

import { supabase } from '../_base';
import { logError } from '../utils/log-error';
import { URL_TABLE, urlColumns } from './config';

export async function increaseUrlHitById(id: string, previousHit: number) {
  try {
    const { error } = await supabase
      .from<UrlModel>(URL_TABLE)
      .update({ hit: previousHit + 1 })
      .eq(urlColumns.id, id);

    if (error) throw error as unknown;
  } catch (err) {
    logError('increaseUrlHitById', err);
  }
}
