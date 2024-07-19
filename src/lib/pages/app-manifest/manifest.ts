import {
  APP_NAME,
  APP_NAME_SHORT,
  APP_VERSION,
} from 'astro:env/server';

import * as m from '$/paraglide/messages';

import appConfig from '$lib/app.config';
import { homepagePath } from '$lib/utils/url';

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
}

function generateManifestIcons(): ManifestIcon[] {
  const icons: ManifestIcon[] = [];

  for (const iconSize of appConfig.manifest.iconSizes) {
    const sizes = `${iconSize}x${iconSize}`;
    const icon: ManifestIcon = {
      src: `/icons/android-chrome-${sizes}.png`,
      sizes,
      type: 'image/png',
    };

    icons.push(icon);
  }

  return icons;
}

export function getManifest() {
  const icons = generateManifestIcons();

  const manifest = {
    name: APP_NAME,
    short_name: APP_NAME_SHORT,
    version: APP_VERSION,
    description: m.app_default_description(),
    background_color: appConfig.manifest.backgroundColor,
    theme_color: appConfig.manifest.themeColor,
    start_url: homepagePath(),
    display: 'standalone',
    scope: homepagePath(),
    icons,
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
