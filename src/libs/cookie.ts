export const createCookieManager = (rawCookie = '') => ({
  get<T extends string>(key: string): T | null {
    if (!rawCookie && typeof document === 'undefined') return null;
    const decodedCookie = decodeURIComponent(rawCookie || document.cookie);
    const match = decodedCookie.match(new RegExp(`(^|\\s)${key}=([^;]+)`));
    if (match && match[2]) return match[2] as T;
    return null;
  },

  set(key: string, value: string, maxAge?: number) {
    if (typeof document === 'undefined' || !key || !value) return;
    let encodedCookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;
    if (typeof maxAge === 'number') {
      encodedCookie += ` max-age=${maxAge};`;
    }
    encodedCookie += ` path=/`;
    document.cookie = encodedCookie;
  }
});

export const cookie = createCookieManager();
