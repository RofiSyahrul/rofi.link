import NextDocument, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

import ColorModeScript from '@/context/color-mode/ColorModeScript';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='id'>
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
