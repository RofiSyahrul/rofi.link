export type ColorMode = 'light' | 'dark';

export type ColorModeContextType = {
  colorMode: ColorMode;
  toggleColorMode(): void;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
};

export type ColorModeProviderProps = {
  initialColorMode?: ColorMode;
  cookies?: string;
  children: React.ReactNode;
};
