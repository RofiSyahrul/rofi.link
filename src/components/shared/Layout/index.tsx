import clsx from 'clsx';

import Footer from './Footer';
import Meta from './Meta';
import styles from './styles.module.css';
import SwitchModeButton from './SwitchModeButton';
import { LayoutProps } from './types';

export default function Layout({
  children,
  className = '',
  description,
  image,
  keyword,
  title,
  url
}: LayoutProps) {
  return (
    <>
      <Meta
        description={description}
        image={image}
        keyword={keyword}
        title={title}
        url={url}
      />
      <header className={styles.header}>
        <div />
        <div>
          <SwitchModeButton />
        </div>
      </header>
      <main className={clsx(styles.main, className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
