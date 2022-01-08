import { useCallback } from 'react';

import { useMutation } from 'react-query';

import { GoogleIconDark, GoogleIconLight } from '@/components/icons';
import { useColorModeValue } from '@/context/color-mode';
import { loginWithGoogle, loginWithGoogleKey } from '@/libs/api/auth/google-login';

import Button from '../Button';
import styles from './styles.module.css';

export default function GoogleLogin() {
  const Icon = useColorModeValue(GoogleIconLight, GoogleIconDark);

  const { mutate, isLoading } = useMutation({
    mutationFn: loginWithGoogle,
    mutationKey: loginWithGoogleKey,
    onSuccess({ url }) {
      if (!url) return;
      window.location.href = url;
    }
  });

  const handleClick = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      size='small'
      mode={null}
      variant={null}
      className={styles.googleLogin}
    >
      <Icon style={{ width: 48, height: 48 }} />
      Masuk dengan Google
    </Button>
  );
}
