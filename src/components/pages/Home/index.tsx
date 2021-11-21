import Layout from '@/components/shared/Layout';

import ShortenerForm from './ShortenerForm';

export default function HomePage() {
  return (
    <Layout className='items-center justify-center'>
      <ShortenerForm />
    </Layout>
  );
}
