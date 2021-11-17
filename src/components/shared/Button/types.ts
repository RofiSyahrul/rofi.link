import { Size, Variant } from '@/types/style';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  isFullWidth?: boolean;
  variant?: Variant;
  size?: Size;
};
