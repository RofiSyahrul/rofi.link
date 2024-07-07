import type { CurrentUser } from '$/env';

import { HOMEPAGE_PATH } from '$lib/constants/internal-urls';
import type { GetServerResponse } from '$lib/types/general';

export interface DashboardProps {
  currentUser: CurrentUser;
}

export const getServerResponse: GetServerResponse<DashboardProps> = ({
  locals,
  redirect,
}) => {
  const { currentUser } = locals.session;

  if (!currentUser) return redirect(HOMEPAGE_PATH);

  return {
    props: {
      currentUser,
    },
  };
};
