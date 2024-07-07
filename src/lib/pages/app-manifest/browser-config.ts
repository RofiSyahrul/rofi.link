import appConfig from '$lib/app.config';
import { oneLine } from '$lib/utils/string';

export function getBrowserConfig() {
  const { msTileIcon, themeColor } = appConfig.manifest;
  const browserConfigIcon = Object.entries(msTileIcon)
    .map(
      ([key, value]) =>
        `<${value}${key}logo src="/icons/mstile-${key}.png" />`,
    )
    .join('');

  return new Response(
    oneLine`<?xml version="1.0" encoding="utf-8"?>
      <browserconfig>
        <msapplication>
          <tile>
            ${browserConfigIcon}
            <TileColor>${themeColor}</TileColor>
          </tile>
        </msapplication>
      </browserconfig>
    `,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  );
}
