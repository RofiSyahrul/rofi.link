import clsx from 'clsx';

import Footer from './Footer';
import Meta from './Meta';
import styles from './styles.module.css';
import SwitchModeButton from './SwitchModeButton';
import type { LayoutProps } from './types';

export default function Layout({
  additionalHeader,
  children,
  className = '',
  description,
  image,
  keyword,
  noIndex,
  title,
  url
}: LayoutProps) {
  return (
    <>
      <Meta
        description={description}
        image={image}
        keyword={keyword}
        noIndex={noIndex}
        title={title}
        url={url}
      />
      <header className={styles.header}>
        <SwitchModeButton />
        {additionalHeader}
      </header>
      <main className={clsx(styles.main, className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
