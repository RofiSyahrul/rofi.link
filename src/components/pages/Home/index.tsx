import Meta from '@/components/shared/Meta';
import SwitchModeButton from '@/components/shared/SwitchModeButton';

import ShortenerForm from './ShortenerForm';

export default function HomePage() {
  return (
    <main className='w-screen h-screen flex items-center justify-center flex-col px-3'>
      <Meta />
      <div className='fixed top-3 right-3'>
        <SwitchModeButton />
      </div>
      <ShortenerForm />
    </main>
  );
}
