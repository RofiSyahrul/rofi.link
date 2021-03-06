import type { ShortenNewUrlParam, UrlModel } from '@/types/url';
import ApiError from '@/utils/api-helpers/api-error';

import { supabase } from '../_base';
import { logError } from '../utils/log-error';
import { URL_TABLE } from './config';

const reservedSlugs = ['api', 'p'];

function buildAlreadyExistsError(slug: string) {
  return new ApiError(`${slug} already exists`);
}

export async function shortenNewUrl(param: ShortenNewUrlParam) {
  if (reservedSlugs.includes(param.slug)) {
    throw buildAlreadyExistsError(param.slug);
  }

  const { error } = await supabase.from<UrlModel>(URL_TABLE).insert({
    actual_url: param.actualUrl,
    slug: param.slug,
    ...(param.userId && { user_id: param.userId })
  });

  if (error) {
    if (error.message === 'duplicate key value violates unique constraint "urls_slug_key"') {
      throw buildAlreadyExistsError(param.slug);
    }
    logError('shortenNewUrl', error);
    throw error as unknown;
  }
}
