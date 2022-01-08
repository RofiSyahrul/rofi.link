import type { Mode, Size, Variant } from '@/types/style';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  variant?: Variant;
  size?: Size;
  mode?: Mode;
};
