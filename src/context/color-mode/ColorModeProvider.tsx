import { useCallback, useEffect, useMemo, useState } from 'react';

import { ColorModeContext } from './context';
import type { ColorModeContextType, ColorModeProviderProps } from './types';
import { cookieStorageManager } from './utils';

export default function ColorModeProvider({
  initialColorMode = 'light',
  cookies = '',
  children
}: ColorModeProviderProps) {
  const [colorMode, rawSetColorMode] = useState(
    cookieStorageManager.get(initialColorMode, cookies)
  );

  const setColorMode = useCallback<ColorModeContextType['setColorMode']>((valueOrCb) => {
    if (typeof valueOrCb === 'function') {
      rawSetColorMode((prevColorMode) => {
        const newColorMode = valueOrCb(prevColorMode);
        cookieStorageManager.set(newColorMode);
        return newColorMode;
      });
      return;
    }

    cookieStorageManager.set(valueOrCb);
    rawSetColorMode(valueOrCb);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode((prevColorMode) => prevColorMode === 'dark' ? 'light' : 'dark');
  }, [setColorMode]);

  const contextValue = useMemo<ColorModeContextType>(() => ({
    colorMode,
    setColorMode,
    toggleColorMode
  }), [colorMode, setColorMode, toggleColorMode]);

  useEffect(() => {
    if (!cookies) {
      rawSetColorMode(
        cookieStorageManager.get(undefined, document.cookie)
      );
    }
  }, [cookies]);

  useEffect(() => {
    const isDark = colorMode === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
    </ColorModeContext.Provider>
  );
}
