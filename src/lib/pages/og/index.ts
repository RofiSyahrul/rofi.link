import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';
import { APP_DESC, APP_NAME } from 'astro:env/server';

import { generateBgImage, renderContent, renderLogo } from './utils';

export const getOGImage: APIRoute = ({ url }) => {
  let title = url.searchParams.get('t');
  if (!title) {
    title = APP_NAME;
  }

  let description = url.searchParams.get('d');
  if (!description) {
    description = APP_DESC;
  }

  return new ImageResponse({
    type: 'div',
    props: {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '32px',
        backgroundImage: generateBgImage(),
        color: '#fff',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '16px',
      },
      children: [renderLogo(), renderContent(title, description)],
    },
  });
};
