import clsx from 'clsx';

import { IconProps } from './types';

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
    viewBox: '0 0 20 20',
    xmlns: 'http://www.w3.org/2000/svg',
    ...props
  };
}
