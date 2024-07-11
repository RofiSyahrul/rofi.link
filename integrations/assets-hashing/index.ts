import type { AstroConfig, AstroIntegration } from 'astro';

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
          return;
        }

        viteRollupOutput.chunkFileNames = `${assetsDirectory}/js/c.[hash].js`;
        viteRollupOutput.entryFileNames = `${assetsDirectory}/js/_e.[hash].js`;
      },
    },
  };
}
