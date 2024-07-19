import { toggleColorMode } from './color-mode';
import { switchLang } from './lang';
import { signIn, signOut } from './session';
import { shortenNewURL } from './url';

export const server = {
  shortenNewURL,
  signIn,
  signOut,
  switchLang,
  toggleColorMode,
};
