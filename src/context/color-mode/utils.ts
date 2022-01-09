import { cookie, createCookieManager } from '@/libs/cookie';

import type { ColorMode } from './types';

const storageKey = 'rofi.link-color-mode';
const oneYearStorageAge = 31536000;

export const cookieStorageManager = {
  get(init?: ColorMode, cookies = '') {
    const cookieManager = createCookieManager(cookies);
    const result = cookieManager.get<ColorMode>(storageKey);
    if (result) return result;
    return init === 'dark' ? 'dark' : 'light';
  },

  set(value: ColorMode) {
    cookie.set(storageKey, value, oneYearStorageAge);
  }
};
