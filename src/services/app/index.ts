import type { GetServerSideProps, GetStaticProps } from 'next';

import { dehydrate, QueryClient } from 'react-query';

import { initialOfQsOrHashRegex } from '@/utils/regex/urlRegex';

import type {
  GetServerSidePropsCallback,
  GetServerSidePropsContext,
  GetStaticPropsCallback,
  GetStaticPropsContext
} from './types';
import { normalizeUrl } from './utils';

const defaultCallback: any = () => ({ props: {} });

function getServerSideProps<P = {}>(
  callback: GetServerSidePropsCallback<P> = defaultCallback
): GetServerSideProps<AppPageProps<P>> {
  return async (ctx) => {
    const { req } = ctx;
    const context = ctx as GetServerSidePropsContext;

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
        cookies: req.headers.cookie ?? '',
        dehydratedState: dehydrate(context.queryClient)
      }
    };
  };
}

function getStaticProps<P = {}>(
  callback: GetStaticPropsCallback = defaultCallback
): GetStaticProps<AppPageProps<P>> {
  return async (ctx) => {
    const context = ctx as GetStaticPropsContext;

    const queryClient = new QueryClient();
    context.queryClient = queryClient;

    const result = await callback(context);
    const { props, ...rest } = result as any;

    return {
      ...rest,
      props: {
        ...props,
        dehydratedState: dehydrate(context.queryClient)
      }
    };
  };
}

const app = {
  defaultCallback,
  getServerSideProps,
  getStaticProps
};

export default app;
