import type { AstroConfig, AstroIntegration } from 'astro';

interface PreRenderedChunk {
  name: string;
}

function generateServerChunkFileNames(chunk: PreRenderedChunk) {
  const { name } = chunk;
  const extension = '.js';

  const prefix = 'chunks/';
  if (name === 'astro') return prefix + '_astro' + extension;

  const suffix = '[hash]' + extension;
  if (name.startsWith('pages/')) return prefix + 'pages/' + suffix;
  return prefix + suffix;
}

export function assetsHashing(): AstroIntegration {
  let astroConfig: AstroConfig;

  return {
    name: 'assets-hashing',
    hooks: {
      'astro:config:done': ({ config }) => {
        astroConfig = config;
      },

      'astro:build:setup': ({ target, vite }) => {
        let viteRollupOutput = (vite.build!.rollupOptions!.output ??=
          {});

        if (Array.isArray(viteRollupOutput)) {
          viteRollupOutput = viteRollupOutput[0];
        }

        const assetsDirectory = astroConfig.build.assets;
        viteRollupOutput.assetFileNames = `${assetsDirectory}/[ext]/[hash].[ext]`;

        if (target === 'server') {
          viteRollupOutput.chunkFileNames =
            generateServerChunkFileNames;
          return;
        }

        viteRollupOutput.chunkFileNames = `${assetsDirectory}/js/chunk.[hash].js`;
        viteRollupOutput.entryFileNames = `${assetsDirectory}/js/_entry.[hash].js`;
      },
    },
  };
}
