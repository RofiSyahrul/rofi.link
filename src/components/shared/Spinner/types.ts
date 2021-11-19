import { Mode, Size, Variant } from '@/types/style';

export type SpinnerProps = React.SVGAttributes<SVGSVGElement> & {
  variant?: Variant;
  size?: Size;
  mode?: Mode;
};
