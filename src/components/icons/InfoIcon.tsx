import { singleLine } from '@/utils/string-helpers';

import type { IconProps } from './base/types';
import { buildSVGProps } from './base/utils';

export default function InfoIcon(props: IconProps) {
  const svgProps = buildSVGProps(props);

  return (
    <svg {...svgProps}>
      <path
        fillRule='evenodd'
        d={singleLine`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012
        0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z`}
        clipRule='evenodd'
      />
    </svg>
  );
}
