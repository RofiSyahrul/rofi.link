import { AuthContext } from './context';
import type { AuthProviderProps } from './types';

export default function AuthProvider({ user, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
