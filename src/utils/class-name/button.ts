import clsx from 'clsx';

import { Variant, Size, Mode } from '@/types/style';

import { BuildButtonClassNameParam } from './types';

export const variantMapping: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger'
};

export const modeMapping: Record<Mode, string> = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  text: 'btn-text'
};

export const sizeMapping: Record<Size, string> = {
  small: 'h-8',
  medium: 'h-10',
  large: 'h-12'
};

export function buildButtonClassName({
  className,
  isFullWidth,
  mode = 'solid',
  size = 'medium',
  variant = 'primary'
}: BuildButtonClassNameParam) {
  return clsx(
    'btn',
    variantMapping[variant],
    modeMapping[mode],
    sizeMapping[size],
    isFullWidth ? 'w-full' : '',
    className
  );
}
