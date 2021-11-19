import { IconProps } from './base/types';
import { buildSVGProps } from './base/utils';

export default function MoonIcon(props: IconProps) {
  return (
    <svg {...buildSVGProps(props)}>
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
    </svg>
  );
}
