import { memo, useCallback, useMemo, useState } from 'react';

import { useMutation } from 'react-query';

import Button from '@/components/shared/Button';
import { shortenNewURL, shortenNewURLKey } from '@/services/api/url/shortenNewURL';
import { AddUrlParam } from '@/types/url-model';

import ActualURLInput from './ActualURLInput';
import SlugInput from './SlugInput';
import { InputFieldValidateHandler } from './types';

const ShortenerForm = memo(() => {
  const [isActualURLValid, setIsActualURLValid] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(false);

  const { mutate, isLoading } = useMutation(shortenNewURLKey, shortenNewURL);

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
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as unknown as AddUrlParam;
    mutate(formData);
  }, [mutate]);

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-lg'>
      <ActualURLInput onValidationDone={handleValidationActualURLDone} />
      <SlugInput onValidationDone={handleValidationSlugDone} />
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
