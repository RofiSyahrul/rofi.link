import clsx from 'clsx';

import { Size } from '@/types/style';

import { IconProps } from './types';

const viewBoxMapping: Record<Size, string> = {
  small: '0 0 16 16',
  medium: '0 0 20 20',
  large: '0 0 24 24'
};

export function buildSVGProps({
  mode = 'solid',
  size = 'medium',
  variant = 'primary'
}: IconProps): React.SVGProps<SVGSVGElement> {
  const className = clsx(mode, size, variant);

  return {
    className,
    viewBox: viewBoxMapping[size],
    xmlns: 'http://www.w3.org/2000/svg'
  };
}
