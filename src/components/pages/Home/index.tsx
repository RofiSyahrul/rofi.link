import Meta from '@/components/shared/Meta';

import ShortenerForm from './ShortenerForm';

export default function HomePage() {
  return (
    <main className='w-screen h-screen flex items-center justify-center flex-col'>
      <Meta />
      <ShortenerForm />
    </main>
  );
}
