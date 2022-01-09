import type { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from 'react-query';

import {
  nextServerUrlPrefixRegex,
  initialOfQsOrHashRegex,
  nextServerPathnameSuffixRegex
} from '@/utils/regex/urlRegex';

import { getUser } from './supabase/auth/get-user';
import type { GetServerSidePropsCallback, GetServerSidePropsContext } from './types';

function normalizeUrl(url: string = ''): string {
  const normedUrl = url.replace(nextServerUrlPrefixRegex, '/');
  const [pathname] = normedUrl.split(initialOfQsOrHashRegex);
  const normedPathname = pathname.replace(nextServerPathnameSuffixRegex, '');
  return normedUrl.replace(pathname, normedPathname);
}

const defaultCallback: any = () => ({ props: {} });

export function baseGetServerSideProps<P = {}>(
  callback: GetServerSidePropsCallback<P> = defaultCallback
): GetServerSideProps<AppPageProps<P>> {
  return async (ctx) => {
    const { req } = ctx;
    const context = ctx as GetServerSidePropsContext;

    const user = await getUser(req);

    const queryClient = new QueryClient();
    context.queryClient = queryClient;

    const finalUrl = normalizeUrl(req.url);
    context.req.url = finalUrl;
    context.pathname = finalUrl.split(initialOfQsOrHashRegex)[0] || '';

    const result = await callback(context);
    const { props, ...rest } = result as any;

    return {
      ...rest,
      props: {
        ...props,
        user,
        cookies: req.headers.cookie ?? '',
        dehydratedState: dehydrate(context.queryClient)
      }
    };
  };
}
