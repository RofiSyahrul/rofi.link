import { forwardRef } from 'react';

import { buildButtonClassName } from '@/utils/class-name/button';

import Spinner from '../Spinner';
import { ButtonProps } from './types';

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
  const buttonClassName = buildButtonClassName({
    className,
    isFullWidth,
    mode,
    size,
    variant
  });

  return (
    <button {...props} ref={ref} className={buttonClassName}>
      {isLoading && <Spinner variant={variant} size={size} />}
      {children}
    </button>
  );
});

export default Button;
