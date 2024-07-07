import type { GetServerResponse } from '$lib/types/general';
import { notFound } from '$lib/utils/response';

export interface HomeProps {
  createdBy: string;
}

export const getServerResponse: GetServerResponse<
  HomeProps
> = async ({ url }) => {
  if (url.searchParams.get('notFound')) {
    return notFound;
  }

  await new Promise<void>(resolve => setTimeout(resolve, 50));

  return {
    props: {
      createdBy: 'Rofi',
    },
  };
};
