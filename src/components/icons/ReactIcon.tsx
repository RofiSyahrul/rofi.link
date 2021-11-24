import { IconProps } from './base/types';
import { buildSVGProps } from './base/utils';

export default function ReactIcon(props: IconProps) {
  const svgProps = buildSVGProps({ viewBox: '-11.5 -10.23174 23 20.46348', ...props });

  return (
    <svg {...svgProps}>
      <title>React Logo</title>
      <circle cx='0' cy='0' r='2.05' className='fill-primary-dim dark:fill-primary-bright' />
      <g className='stroke-primary-dim dark:stroke-primary-bright' strokeWidth='1' fill='none'>
        <ellipse rx='11' ry='4.2' />
        <ellipse rx='11' ry='4.2' transform='rotate(60)' />
        <ellipse rx='11' ry='4.2' transform='rotate(120)' />
      </g>
    </svg>
  );
}
