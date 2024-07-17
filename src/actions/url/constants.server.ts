export const ACTUAL_URL_PATTERN = String.raw`https?:\/\/.+\..+`;
export const ACTUAL_URL_REGEXP = new RegExp(
  `^${ACTUAL_URL_PATTERN}$`,
);

export const SLUG_MIN_LENGTH = 1;
export const SLUG_MAX_LENGTH = 50;
export const SLUG_PATTERN = String.raw`(\w|-){${SLUG_MIN_LENGTH},${SLUG_MAX_LENGTH}}`;
export const SLUG_REGEXP = new RegExp(`^${SLUG_PATTERN}$`);
