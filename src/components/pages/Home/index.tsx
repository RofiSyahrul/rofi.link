import config from '@/config';

export default function HomePage() {
  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <h1>{config.manifest.description}</h1>
    </main>
  );
}
