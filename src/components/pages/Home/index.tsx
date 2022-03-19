import Head from 'next/head';

import AuthSection from '@/components/shared/AuthSection';
import Layout from '@/components/shared/Layout';

import schema from './schema';
import ShortenerForm from './ShortenerForm';

const additionalHeader = <AuthSection />;

export default function HomePage() {
  return (
    <Layout className='items-center justify-center' additionalHeader={additionalHeader}>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ShortenerForm />
    </Layout>
  );
}
