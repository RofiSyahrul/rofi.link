import type { GetUrlBySlugReturn, UrlModel } from '@/types/url';

import { supabase } from '../_base';
import { logError } from '../utils/log-error';
import { urlColumns, URL_TABLE } from './config';

export async function getUrlBySlug(slug: string): Promise<GetUrlBySlugReturn | null> {
  const column = [urlColumns.id, urlColumns.actualUrl, urlColumns.slug, urlColumns.hit].join(',');

  const { data, error } = await supabase
    .from<UrlModel>(URL_TABLE)
    .select(column)
    .is(urlColumns.deletedAt, null)
    .eq(urlColumns.slug, slug)
    .single();

  if (!data || error) {
    if (error) logError('getUrlBySlug', error);
    return null;
  }

  return {
    actualUrl: data.actual_url,
    hit: data.hit,
    id: data.id,
    slug: data.slug
  };
}
