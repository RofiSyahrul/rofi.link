import { createContext, useContext } from 'react';

import type { ColorModeContextType } from './types';

export const ColorModeContext = createContext({} as ColorModeContextType);

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}

export function useColorModeValue<TLight, TDark>(
  light: TLight,
  dark: TDark
): TLight extends TDark ? TLight : TLight | TDark {
  const { colorMode } = useColorMode();
  return (colorMode === 'dark' ? dark : light) as any;
}
