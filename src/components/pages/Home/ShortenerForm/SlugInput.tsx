import { ChangeEvent, memo, useCallback, useState } from 'react';

import Input from '@/components/shared/Input';

import { InputFieldProps } from './types';

const SlugInput = memo(({
  onValidationDone
}: InputFieldProps) => {
  const [slug, setSlug] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.trim().replace(/\s+/g, '-');
    setSlug(sanitizedValue);

    const isValid = !!sanitizedValue && !/[^\w-]/.test(sanitizedValue);
    setHasError(!isValid);
    onValidationDone(isValid);
  }, [onValidationDone]);

  return (
    <Input
      id='slug'
      name='slug'
      label='Singkatnya'
      placeholder='slug'
      prefixNode='rofi.link/'
      supportText='Karakter yang diperbolehkan: huruf, angka, - dan _'
      autoComplete='off'
      value={slug}
      onChange={handleChange}
      hasError={hasError}
    />
  );
});

export default SlugInput;
