import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useMutation } from 'react-query';

import Layout from '@/components/shared/Layout';
import Spinner from '@/components/shared/Spinner';
import {
  setSessionToServer,
  setSessionToServerKey
} from '@/services/api/auth/set-session-to-server';

export default function CallbackPage() {
  const isMutatedRef = useRef(false);
  const { replace } = useRouter();

  const { mutate } = useMutation({
    mutationFn: setSessionToServer,
    mutationKey: setSessionToServerKey,
    onSuccess() {
      replace({ pathname: '/' });
    }
  });

  useEffect(() => {
    if (isMutatedRef.current) return;

    const { hash } = window.location;
    if (!hash) return;

    const urlObj = new URL(`https://example.com?${hash.slice(1)}`);
    const accessToken = urlObj.searchParams.get('access_token') || '';

    mutate({
      access_token: accessToken,
      token_type: '',
      user: null
    });

    isMutatedRef.current = true;
  }, [mutate]);

  return (
    <Layout className='justify-center items-center layout-full' hideUserInfo>
      <Spinner mode='text' style={{ width: '10rem', height: '10rem' }} />
    </Layout>
  );
}
