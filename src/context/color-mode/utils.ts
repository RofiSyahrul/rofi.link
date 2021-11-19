import { ColorMode } from './types';

const storageKey = 'rofi.link-color-mode';
const oneYearStorageAge = 31536000;

export const cookieStorageManager = {
  get(init?: ColorMode, cookies = '') {
    const match = cookies.match(new RegExp(`(^|\\s)${storageKey}=([^;]+)`));
    if (match && match[2]) return match[2] as ColorMode;
    return init === 'dark' ? 'dark' : 'light';
  },

  set(value: ColorMode) {
    if (typeof document === 'undefined') return;
    document.cookie = `${storageKey}=${value}; max-age=${oneYearStorageAge}; path=/`;
  }
};
