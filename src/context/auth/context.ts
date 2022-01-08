import { createContext, useContext } from 'react';

import type { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
  user: null
});

export function useAuth() {
  const authContext = useContext(AuthContext);
  return { ...authContext, isLoggedIn: !!authContext?.user };
}
