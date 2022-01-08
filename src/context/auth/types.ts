import type { ReactNode } from 'react';

import type { User } from '@/types/user';

export type AuthContextType = {
  user: User | null;
};

export interface AuthProviderProps extends AuthContextType {
  children: ReactNode;
}
