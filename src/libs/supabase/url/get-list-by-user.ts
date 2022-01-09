import { DEFAULT_LIMIT } from '@/constants/pagination';
import type { MetaData, GetUrlByUserIdReturn, UrlModel, Url } from '@/types/url';

import { supabase } from '../_base';
import { logError } from '../utils/log-error';
import { urlColumns, URL_TABLE } from './config';

const defaultMeta: MetaData = {
  page: 1,
  pageSize: DEFAULT_LIMIT,
  totalData: 0
};

const defaultGetUrlsByUserIdReturn: GetUrlByUserIdReturn = {
  data: [],
  meta: defaultMeta
};

export async function getUrlsByUserId(userId: string, page = 1): Promise<GetUrlByUserIdReturn> {
  if (!userId) return defaultGetUrlsByUserIdReturn;

  const column = [
    urlColumns.id,
    urlColumns.actualUrl,
    urlColumns.slug,
    urlColumns.hit,
    urlColumns.createdAt,
    urlColumns.updatedAt
  ].join(',');

  const { error: countError, count } = await supabase
    .from<UrlModel>(URL_TABLE)
    .select(column, { count: 'exact', head: true })
    .is(urlColumns.deletedAt, null)
    .eq(urlColumns.userId, userId);

  if (countError || !count) {
    if (countError) logError('counter getUrlsByUserId', countError);
    return defaultGetUrlsByUserIdReturn;
  }

  const { data, error } = await supabase
    .from<UrlModel>(URL_TABLE)
    .select(column)
    .is(urlColumns.deletedAt, null)
    .eq(urlColumns.userId, userId)
    .range((page - 1) * DEFAULT_LIMIT, page * DEFAULT_LIMIT - 1);

  if (error || !Array.isArray(data)) {
    if (error) logError('getUrlsByUserId', error);
    return defaultGetUrlsByUserIdReturn;
  }

  const mappedData = data.map<Url>((urlItem) => ({
    actualUrl: urlItem.actual_url,
    createdAt: urlItem.created_at,
    hit: urlItem.hit,
    id: urlItem.id,
    slug: urlItem.slug,
    updatedAt: urlItem.updated_at
  }));

  return {
    data: mappedData,
    meta: {
      page,
      pageSize: DEFAULT_LIMIT,
      totalData: count
    }
  };
}
