import type { GetServerSideProps } from 'next';

import { url } from '@/services/firebase/server';

type Params = {
  slug: string;
};

export default function SlugPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}, Params> = async ({ params }) => {
  const { slug } = params || {};
  if (!slug) return { notFound: true };

  const data = await url.get(slug);
  if (!data) return { notFound: true };

  await url.update(slug, { hit: data.hit + 1 });

  return {
    redirect: {
      permanent: false,
      destination: data.actualURL
    }
  };
};
