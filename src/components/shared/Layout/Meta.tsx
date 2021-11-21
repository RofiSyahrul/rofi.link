import Head from 'next/head';
import { useMemo } from 'react';

import config from '@/config';

import { defaultImage, defaultTitle, metaDescriptionOptimalLength } from './config';
import { MetaProps } from './types';

export default function Meta({
  title = defaultTitle,
  image = defaultImage,
  description = config.manifest.description,
  keyword,
  url = config.appURL
}: MetaProps) {
  const metaTitle = useMemo(() => {
    const pageTitle = title || defaultTitle;
    const suffixedTitle = `${pageTitle} | ${config.appName}`;

    return (
      <>
        <title>{suffixedTitle}</title>
        <meta
          property='og:title'
          content={suffixedTitle}
        />
        <meta
          name='twitter:title'
          content={suffixedTitle}
        />
      </>
    );
  }, [title]);

  const metaURL = useMemo(() => url && (
    <>
      <link
        rel='canonical'
        href={url}
      />
      <meta
        property='og:url'
        content={url}
      />
    </>
  ), [url]);

  const metaDescription = useMemo(() => {
    if (!description) return null;

    const trimmedDescriptionText = description.substring(0, metaDescriptionOptimalLength);
    return trimmedDescriptionText && (
      <>
        <meta
          name='description'
          content={trimmedDescriptionText}
        />
        <meta
          property='og:description'
          content={trimmedDescriptionText}
        />
        <meta
          name='twitter:description'
          content={trimmedDescriptionText}
        />
      </>
    );
  }, [description]);

  const metaImage = useMemo(() => image && (
    <>
      <meta
        property='og:image'
        content={image}
      />
      <meta
        name='twitter:image'
        content={image}
      />
    </>
  ), [image]);

  const metaKeyword = useMemo(() => keyword && (
    <meta name='keywords' content={keyword} />
  ), [keyword]);

  return (
    <Head>
      {metaTitle}
      {metaURL}
      {metaDescription}
      {metaImage}
      {metaKeyword}
    </Head>
  );
}
