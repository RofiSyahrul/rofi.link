import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './styles.module.css';
import { SpinnerProps } from './types';

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(({
  className,
  variant = 'primary',
  size = 'medium',
  mode = 'solid',
  ...props
}, ref) => {
  const spinnerClassName = clsx(
    styles.spinner,
    variant,
    mode,
    size,
    className
  );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      {...props}
      ref={ref}
      className={spinnerClassName}
    >
      <circle cx='50' cy='50' r='40' />
    </svg>
  );
});

export default Spinner;
