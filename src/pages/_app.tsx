import { useState } from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { NextRouter } from 'next/dist/client/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

type AppProps = {
  pageProps: AppPageProps;
  Component: NextComponentType<NextPageContext, any, AppPageProps>;
  router: NextRouter;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
