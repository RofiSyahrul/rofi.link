import {
  availableLanguageTags,
  languageTag,
  sourceLanguageTag,
  type AvailableLanguageTag,
} from '$/paraglide/runtime';

type AbsolutePathname = `/${string}`;

const HOMEPAGE_PATH = '/';

const pathnames: Record<
  string,
  Record<AvailableLanguageTag, AbsolutePathname>
> = {
  [HOMEPAGE_PATH]: {
    en: '/en',
    id: HOMEPAGE_PATH,
  },
};

const availableLanguageTagsPathSegmentPattern = new RegExp(
  `^/(${availableLanguageTags.join('|')})($|/)`,
  'g',
);

function unlocalizePathname(pathname: string): string {
  return pathname.replaceAll(
    availableLanguageTagsPathSegmentPattern,
    (...args: string[]) => {
      const slashAfterLanguageTag = args[2];
      if (slashAfterLanguageTag) return slashAfterLanguageTag;
      return '/';
    },
  );
}

export function localizePathname(
  pathname: string,
  tag?: AvailableLanguageTag,
) {
  pathname = unlocalizePathname(pathname);
  tag ??= languageTag();

  const mapping = pathnames[pathname];

  if (mapping) {
    return mapping[tag];
  }

  return tag === sourceLanguageTag ? pathname : `/${tag}${pathname}`;
}

export const homepagePath = () => localizePathname(HOMEPAGE_PATH);
