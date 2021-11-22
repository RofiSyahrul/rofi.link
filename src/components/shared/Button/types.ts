import { BuildButtonClassNameParam } from '@/utils/class-name/types';

type BaseButtonProps = BuildButtonClassNameParam & {
  isLoading?: boolean;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonProps;
