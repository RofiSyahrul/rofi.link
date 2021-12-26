import { Mode, Size, Variant } from '@/types/style';

export type BuildButtonClassNameParam = {
  className?: string;
  isFullWidth?: boolean;
  mode?: Mode | null;
  size?: Size;
  variant?: Variant | null;
};
