import { oneLine } from '$lib/utils/string';

export const ACTUAL_URL_INVALID_MESSAGE =
  'Tautan harus valid dan dimulai dengan http:// atau https://';

export const SLUG_MIN_LENGTH = 1;
export const SLUG_MAX_LENGTH = 50;
export const SLUG_PATTERN = String.raw`(\w|-){${SLUG_MIN_LENGTH},${SLUG_MAX_LENGTH}}`;
export const SLUG_REGEXP = new RegExp(SLUG_PATTERN);

export const SLUG_HELPER_MESSAGE = oneLine`Karakter yang diperbolehkan:
  huruf, angka, - dan _.
  Maks ${SLUG_MAX_LENGTH} karakter`;
