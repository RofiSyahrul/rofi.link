import type { GetServerSideProps } from 'next';

import { getUrlBySlug } from '@/libs/supabase/url/get-by-slug';
import { increaseUrlHitById } from '@/libs/supabase/url/increase-hit';

type Params = {
  slug: string;
};

export default function SlugPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}, Params> = async ({ params }) => {
  const { slug } = params || {};
  if (!slug) return { notFound: true };

  const data = await getUrlBySlug(slug);
  if (!data || !data.actualUrl) return { notFound: true };

  await increaseUrlHitById(data.id, data.hit);

  return {
    redirect: {
      permanent: false,
      destination: data.actualUrl
    }
  };
};
