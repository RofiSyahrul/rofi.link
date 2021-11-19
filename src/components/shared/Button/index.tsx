import { forwardRef } from 'react';

import clsx from 'clsx';

import { Mode, Size, Variant } from '@/types/style';

import Spinner from '../Spinner';
import { ButtonProps } from './types';

const variantMapping: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger'
};

const modeMapping: Record<Mode, string> = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  text: 'btn-text'
};

const sizeMapping: Record<Size, string> = {
  small: 'h-8',
  medium: 'h-10',
  large: 'h-12'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  isFullWidth,
  variant = 'primary',
  size = 'medium',
  mode = 'solid',
  className,
  children,
  ...props
}, ref) => {
  const buttonClassName = clsx(
    'btn',
    variantMapping[variant],
    modeMapping[mode],
    sizeMapping[size],
    isFullWidth ? 'w-full' : '',
    className
  );

  return (
    <button {...props} ref={ref} className={buttonClassName}>
      {isLoading && <Spinner variant={variant} size={size} />}
      {children}
    </button>
  );
});

export default Button;
