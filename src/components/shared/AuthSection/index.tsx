import dynamic from 'next/dynamic';

import { useAuth } from '@/context/auth';

const GoogleLogin = dynamic(() => import('@/components/shared/GoogleLogin'), { ssr: true });
const UserInfo = dynamic(() => import('@/components/shared/UserInfo'), { ssr: true });

export default function AuthSection() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <UserInfo />;

  return <GoogleLogin />;
}
