import Link from 'next/link';
import { forwardRef } from 'react';

import { buildButtonClassName } from '@/utils/class-name/button';

import type { AnchorProps } from './types';

function isExternalURL(href: AnchorProps['href']): href is string {
  if (typeof href !== 'string') return false;
  return href.startsWith('http://') || href.startsWith('https://');
}

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(({
  children,
  className,
  isFullWidth,
  href,
  mode = 'text',
  size = 'medium',
  variant = 'primary',
  ...props
}, ref) => {
  const anchorClassName = buildButtonClassName({
    className,
    isFullWidth,
    mode,
    size,
    variant
  });

  if (isExternalURL(href)) {
    return (
      <a {...props} ref={ref} href={href} className={anchorClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} passHref>
      <a {...props} ref={ref} className={anchorClassName}>
        {children}
      </a>
    </Link>
  );
});

export default Anchor;
