import { NextComponentType, NextPageContext } from 'next';
import { NextRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { memo, useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
import config from '@/config';
import { ColorModeProvider } from '@/context/color-mode';

type AppProps = {
  pageProps: AppPageProps;
  Component: NextComponentType<NextPageContext, any, AppPageProps>;
  router: NextRouter;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

const appleIconSizes = ['152', '144', '120', '114', '76', '72', '60', '57'];
const msImageSizes = Object.keys(config.manifest.icon.msTile);

const AppHeadContent = memo(() => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
      {appleIconSizes.map((size) => (
        <link
          key={size}
          rel='apple-touch-icon'
          sizes={`${size}x${size}`}
          href={`/icons/apple-touch-icon-${size}x${size}.png`}
        />
      ))}
      <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='192x192' href='/icons/android-chrome-192x192.png' />
      <link rel='icon' type='image/png' sizes='384x384' href='/icons/android-chrome-384x384.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
      <link rel='manifest' href='/manifest.json' />
      <link
        rel='mask-icon'
        href='/icons/safari-pinned-tab.svg'
        color={config.manifest.themeColor}
      />
      <link rel='icon' href='/favicon.ico' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <meta name='apple-mobile-web-app-title' content={APP_NAME} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='application-name' content={APP_NAME} />
      <meta name='msapplication-navbutton-color' content={config.manifest.themeColor} />
      <meta name='msapplication-TileColor' content={config.manifest.backgroundColor} />
      <meta name='msapplication-starturl' content='/' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content={config.manifest.themeColor} />
      {msImageSizes.map((size) => (
        <meta key={size} name='msapplication-TileImage' content={`/icons/mstile-${size}.png`} />
      ))}
    </Head>
  );
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <AppHeadContent />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ColorModeProvider cookies={pageProps.cookies}>
            <Component {...pageProps} />
          </ColorModeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
