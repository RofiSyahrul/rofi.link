import {
  nextServerUrlPrefixRegex,
  initialOfQsOrHashRegex,
  nextServerPathnameSuffixRegex
} from '@/utils/regex/urlRegex';

export function normalizeUrl(url: string = ''): string {
  const normedUrl = url.replace(nextServerUrlPrefixRegex, '/');
  const [pathname] = normedUrl.split(initialOfQsOrHashRegex);
  const normedPathname = pathname.replace(nextServerPathnameSuffixRegex, '');
  return normedUrl.replace(pathname, normedPathname);
}
