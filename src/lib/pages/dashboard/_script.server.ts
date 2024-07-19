import type { CurrentUser } from '$/env';

import type { GetServerResponse } from '$lib/types/general';
import { homepagePath } from '$lib/utils/url';

export interface DashboardProps {
  currentUser: CurrentUser;
}

export const getServerResponse: GetServerResponse<DashboardProps> = ({
  locals,
  redirect,
}) => {
  const { currentUser } = locals.session;

  if (!currentUser) return redirect(homepagePath());

  return {
    props: {
      currentUser,
    },
  };
};
