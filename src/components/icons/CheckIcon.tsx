import { singleLine } from '@/utils/string-helpers';

import { IconProps } from './base/types';
import { buildSVGProps } from './base/utils';

export default function CheckIcon(props: IconProps) {
  const svgProps = buildSVGProps(props);

  return (
    <svg {...svgProps}>
      <path
        fillRule='evenodd'
        d={singleLine`M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9
        10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z`}
        clipRule='evenodd'
      />
    </svg>
  );
}
