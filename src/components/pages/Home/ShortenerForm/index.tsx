import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { useMutation } from 'react-query';

import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';
import { shortenNewURL, shortenNewURLKey } from '@/libs/api/url/shorten-new-url';
import type { ShortenNewUrlParam } from '@/types/url';

import ActualURLInput from './ActualURLInput';
import AlertSuccessContent from './AlertSuccessContent';
import SlugInput from './SlugInput';
import styles from './styles.module.css';
import type { AlertState, InputFieldRefAttribute, InputFieldValidateHandler } from './types';

const initialAlertState: AlertState = {
  visible: false,
  status: 'info',
  content: ''
};

const ShortenerForm = memo(() => {
  const [isActualURLValid, setIsActualURLValid] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(false);
  const [alert, setAlert] = useState(initialAlertState);

  const actualURLInputRef = useRef<InputFieldRefAttribute>(null);
  const slugInputRef = useRef<InputFieldRefAttribute>(null);

  const { mutate, isLoading } = useMutation<any, Error, ShortenNewUrlParam>({
    mutationKey: shortenNewURLKey,
    mutationFn: shortenNewURL,
    onSuccess(_, variables) {
      slugInputRef.current?.setValue('');
      setIsSlugValid(false);

      actualURLInputRef.current?.setValue('');
      actualURLInputRef.current?.focus?.();
      setIsActualURLValid(false);

      setAlert({
        status: 'success',
        visible: true,
        content: <AlertSuccessContent slug={variables.slug} />
      });
    },
    onError(error, variables) {
      slugInputRef.current?.setValue('');
      slugInputRef.current?.focus?.();
      setIsSlugValid(false);

      let { message = '' } = error || {};
      if (message.includes('already exists')) {
        message = `${variables.slug} sudah digunakan`;
      }

      setAlert({
        status: 'error',
        visible: true,
        content: (
          <div className={styles.alertContent}>
            <span>
              {message}
            </span>
          </div>
        )
      });
    }
  });

  const isDisabledSubmit = useMemo(
    () => isLoading || !isActualURLValid || !isSlugValid,
    [isLoading, isActualURLValid, isSlugValid]
  );

  const handleValidationActualURLDone = useCallback<InputFieldValidateHandler>((isValid) => {
    setIsActualURLValid(isValid);
  }, []);

  const handleValidationSlugDone = useCallback<InputFieldValidateHandler>((isValid) => {
    setIsSlugValid(isValid);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabledSubmit) return;

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as unknown as ShortenNewUrlParam;
    mutate(formData);
  }, [mutate, isDisabledSubmit]);

  const handleCloseAlert = useCallback(() => {
    setAlert(initialAlertState);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <ActualURLInput ref={actualURLInputRef} onValidationDone={handleValidationActualURLDone} />
      <SlugInput ref={slugInputRef} onValidationDone={handleValidationSlugDone} />
      <Alert
        className='mb-3'
        status={alert.status}
        visible={alert.visible}
        onClose={handleCloseAlert}
        showCloseButton
      >
        {alert.content}
      </Alert>
      <Button
        type='submit'
        disabled={isDisabledSubmit}
        isLoading={isLoading}
        isFullWidth
      >
        Singkat
      </Button>
    </form>
  );
});

export default ShortenerForm;
