import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './styles.module.css';
import { VisuallyHiddenProps } from './types';

const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(({
  className,
  ...props
}, ref) => {
  return (
    <span {...props} ref={ref} className={clsx(styles.visuallyHidden, className)} />
  );
});

export default VisuallyHidden;
