import { ErrorProps } from 'next/error';
import Head from 'next/head';
import { useMemo } from 'react';

import Anchor from '@/components/shared/Anchor';
import Layout from '@/components/shared/Layout';

import styles from './styles.module.css';

const statusCodeMapping: Record<number, string> = {
  404: 'Halaman Tidak Ditemukan',
  500: 'Internal Server Error'
};

export default function ErrorPage({ statusCode, title }: ErrorProps) {
  const { pageTitle, status } = useMemo(() => ({
    pageTitle: title ?? statusCodeMapping[statusCode] ?? 'Terjadi Kesalahan',
    status: `${statusCode}`.replace(/0/g, '<span>0</span>')
  }), [statusCode, title]);

  return (
    <Layout title={pageTitle} className={styles.container}>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: status }} />
        <h2>{pageTitle}</h2>
      </div>
      <Anchor href='/' mode='solid'>
        Kembali ke beranda
      </Anchor>
    </Layout>
  );
}
