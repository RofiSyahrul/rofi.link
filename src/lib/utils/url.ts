import {
  languageTag,
  sourceLanguageTag,
  type AvailableLanguageTag,
} from '$/paraglide/runtime';

export type AbsolutePathname = `/${string}`;

export const HOMEPAGE_PATH = '/';
export const DASHBOARD_PATH = '/p/dashboard';

const pathnames: Record<
  AbsolutePathname,
  Record<AvailableLanguageTag, AbsolutePathname>
> = {
  [HOMEPAGE_PATH]: {
    en: '/en',
    id: HOMEPAGE_PATH,
  },
};

export function localizePathname(
  pathname: AbsolutePathname,
  tag?: AvailableLanguageTag,
) {
  tag ??= languageTag();
  const mapping = pathnames[pathname];

  if (mapping) {
    return mapping[tag];
  }

  return tag === sourceLanguageTag ? pathname : `/${tag}${pathname}`;
}

export const homepagePath = () => localizePathname(HOMEPAGE_PATH);
export const dashboardPath = () => localizePathname(DASHBOARD_PATH);
