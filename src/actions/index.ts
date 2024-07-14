import { toggleColorMode } from './color-mode';
import { signIn, signOut } from './session';
import { shortenNewURL } from './url';

export const server = {
  shortenNewURL,
  signIn,
  signOut,
  toggleColorMode,
};
