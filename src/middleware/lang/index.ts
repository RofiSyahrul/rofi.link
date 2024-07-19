import type { MiddlewareHandler } from 'astro';
import { actions } from 'astro:actions';

import StatusCode from '$lib/constants/status-code';
import { localizePathname } from '$lib/utils/url';

export const languageHandler: MiddlewareHandler = async (
  ctx,
  next,
) => {
  const response = await next();

  const switchLangResult = ctx.getActionResult(actions.switchLang);
  if (switchLangResult?.data) {
    const { lang } = switchLangResult.data;
    const { hash, pathname, search } = ctx.url;
    const localizedPathname = localizePathname(pathname, lang);
    return ctx.redirect(
      localizedPathname + search + hash,
      StatusCode.Found,
    );
  }

  return response;
};
