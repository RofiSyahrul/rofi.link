import AuthSection from '@/components/shared/AuthSection';
import Layout from '@/components/shared/Layout';

import ShortenerForm from './ShortenerForm';

const additionalHeader = <AuthSection />;

export default function HomePage() {
  return (
    <Layout className='items-center justify-center' additionalHeader={additionalHeader}>
      <ShortenerForm />
    </Layout>
  );
}
