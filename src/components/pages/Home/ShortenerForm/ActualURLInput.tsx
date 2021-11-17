import { ChangeEvent, memo, useCallback, useState } from 'react';

import Input from '@/components/shared/Input';

import { InputFieldProps } from './types';

const initialSupportText = 'Tautan harus valid';
const supportTextValidURL = 'Tautan valid';
const supportTextInvalidURL = 'Tautan harus dimulai dengan http:// atau https://';

const ActualURLInput = memo(({
  onValidationDone
}: InputFieldProps) => {
  const [actualURL, setActualURL] = useState('');
  const [hasError, setHasError] = useState(false);
  const [supportText, setSupportText] = useState(initialSupportText);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setActualURL(value);

    const isValid = value.startsWith('http://') || value.startsWith('https://');
    setHasError(!isValid);
    onValidationDone(isValid);
    setSupportText(isValid ? supportTextValidURL : supportTextInvalidURL);
  }, [onValidationDone]);

  return (
    <Input
      type='url'
      id='actualURL'
      name='actualURL'
      label='Tautan asli'
      placeholder='Tautan yang akan disingkat'
      supportText={supportText}
      autoComplete='off'
      autoFocus
      value={actualURL}
      onChange={handleChange}
      hasError={hasError}
    />
  );
});

export default ActualURLInput;
