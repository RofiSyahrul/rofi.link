import type {
  GetServerSidePropsContext as _GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext as _GetStaticPropsContext,
  GetStaticPropsResult
} from 'next';

import { QueryClient } from 'react-query';

export type GetServerSidePropsContext = _GetServerSidePropsContext & {
  pathname: string;
  queryClient: QueryClient;
};

export type GetServerSidePropsCallback<P = {}> = (
  ctx: GetServerSidePropsContext
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export type GetStaticPropsContext = _GetStaticPropsContext & {
  queryClient: QueryClient;
};

export type GetStaticPropsCallback<P = {}> = (
  ctx: GetStaticPropsContext
) => GetStaticPropsResult<P> | Promise<GetStaticPropsResult<P>>;
