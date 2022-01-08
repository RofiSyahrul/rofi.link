import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useMutation } from 'react-query';

import { useAuth } from '@/context/auth';
import { logout, logoutKey } from '@/libs/api/auth/logout';

import Anchor from '../Anchor';
import Button from '../Button';
import styles from './styles.module.css';

export default function UserInfo() {
  const { user } = useAuth();
  const { replace, pathname, query } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    mutationKey: logoutKey,
    onSuccess() {
      replace({ pathname, query });
    }
  });

  const handleLogout = useCallback(() => {
    mutate();
  }, [mutate]);

  if (!user) return null;

  return (
    <div className='flex gap-2 items-center'>
      {user.avatarURL && (
        <Image
          alt={`Photo of ${user.fullName}`}
          src={user.avatarURL}
          width={40}
          height={40}
          className='rounded-full'
        />
      )}
      <div className={styles.accountWrapper}>
        <Anchor href='/dashboard' className={styles.accountName} style={{ height: 'unset' }}>
          {user.fullName || user.email}
        </Anchor>
        <Button
          variant='danger'
          className='w-full'
          disabled={isLoading}
          onClick={handleLogout}
          style={{ height: 'unset' }}
        >
          Keluar
        </Button>
      </div>
    </div>
  );
}
