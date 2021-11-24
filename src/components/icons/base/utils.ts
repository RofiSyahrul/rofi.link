import clsx from 'clsx';

import { Size } from '@/types/style';

import { IconProps } from './types';

const viewBoxMapping: Record<Size, string> = {
  small: '0 0 16 16',
  medium: '0 0 20 20',
  large: '0 0 24 24'
};

export function buildSVGProps({
  className,
  mode = 'solid',
  size = 'medium',
  variant = 'primary',
  ...props
}: IconProps): React.SVGProps<SVGSVGElement> {
  const mergedClassName = clsx(mode, size, variant, className);

  return {
    className: mergedClassName,
    viewBox: viewBoxMapping[size],
    xmlns: 'http://www.w3.org/2000/svg',
    ...props
  };
}
