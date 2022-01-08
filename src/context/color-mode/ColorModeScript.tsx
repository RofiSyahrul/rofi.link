import type { ColorMode } from './types';

const setScript = () => {
  let colorMode: ColorMode;

  try {
    const match = document.cookie.match(/(^|\s)rofi.link-color-mode=([^;]+)/);
    if (match && match[2]) colorMode = match[2] as ColorMode;
    else colorMode = 'light';
  } catch {
    colorMode = 'light';
  }

  const root = document.documentElement;
  if (colorMode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const script = `(${String(setScript)})()`;

export default function ColorModeScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}
