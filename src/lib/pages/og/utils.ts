import { OG_LOGO_BASE_64_SRC } from 'astro:env/server';

export function generateBgImage() {
  const rgb = '7,89,133';
  const totalGradient = 4;

  const alphaDecrement = 1 / totalGradient;
  const stopPositionIncrement = Math.floor(100 / totalGradient);

  let alpha = 1;
  let stopPosition = stopPositionIncrement;

  const colorStops = Array.from({ length: totalGradient }, () => {
    const colorStop = `rgba(${rgb},${alpha}) ${stopPosition}%`;
    alpha -= alphaDecrement;
    stopPosition += stopPositionIncrement;
    return colorStop;
  });

  return `linear-gradient(0deg, ${colorStops.join(', ')})`;
}

export function renderLogo() {
  return {
    type: 'img',
    props: {
      height: 128,
      width: 128,
      src: OG_LOGO_BASE_64_SRC,
      style: {
        position: 'absolute',
        right: '12px',
        top: '12px',
        borderRadius: '50%',
        boxShadow: '0px 6px 24px -6px rgba(0, 0, 0, 0.24)',
      },
    },
  };
}

export function renderContent(title: string, description: string) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '100%',
      },
      children: [
        {
          type: 'div',
          props: {
            children: title,
            style: {
              fontSize: '6em',
              fontWeight: 700,
              lineHeight: 1,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineClamp: 2,
            },
          },
        },
        description && {
          type: 'div',
          props: {
            children: description,
            style: {
              fontSize: '2.25em',
              lineHeight: 1,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineClamp: 3,
            },
          },
        },
      ],
    },
  };
}
