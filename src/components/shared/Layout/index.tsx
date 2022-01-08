import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import clsx from 'clsx';

import { useAuth } from '@/context/auth';

import Footer from './Footer';
import Meta from './Meta';
import styles from './styles.module.css';
import SwitchModeButton from './SwitchModeButton';
import type { LayoutProps } from './types';

const GoogleLogin = dynamic(() => import('../GoogleLogin'), { ssr: true });
const UserInfo = dynamic(() => import('../UserInfo'), { ssr: true });

export default function Layout({
  children,
  className = '',
  description,
  hideUserInfo = false,
  image,
  keyword,
  title,
  url
}: LayoutProps) {
  const { isLoggedIn } = useAuth();

  const authNode = useMemo(() => {
    if (hideUserInfo) return null;
    if (isLoggedIn) return <UserInfo />;
    return <GoogleLogin />;
  }, [hideUserInfo, isLoggedIn]);

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
        <SwitchModeButton />
        {authNode}
      </header>
      <main className={clsx(styles.main, className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
