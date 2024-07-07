import { client } from './client';
import { withSoftDelete } from './extensions/with-soft-delete';
import { withUtils } from './extensions/with-utils';

export const prisma = client
  .$extends(withUtils)
  .$extends(withSoftDelete);
