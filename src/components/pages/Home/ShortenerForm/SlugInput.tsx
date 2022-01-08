import type {
  ChangeEvent } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

import Input from '@/components/shared/Input';

import type { InputFieldProps, InputFieldRefAttribute } from './types';

const SlugInput = memo(forwardRef<InputFieldRefAttribute, InputFieldProps>(({
  onValidationDone
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [slug, setSlug] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.trim().replace(/\s+/g, '-');
    if (sanitizedValue.length > 50) return;

    setSlug(sanitizedValue);

    const isValid = !!sanitizedValue && !/[^\w-]/.test(sanitizedValue);
    setHasError(!isValid);
    onValidationDone(isValid);
  }, [onValidationDone]);

  useImperativeHandle(ref, () => ({
    ...inputRef.current,
    setValue: setSlug
  }), []);

  return (
    <Input
      ref={inputRef}
      id='slug'
      name='slug'
      label='Singkatnya'
      placeholder='slug'
      prefixNode='rofi.link/'
      supportText='Karakter yang diperbolehkan: huruf, angka, - dan _. Maks 50 karakter'
      autoComplete='off'
      value={slug}
      onChange={handleChange}
      hasError={hasError}
    />
  );
}));

export default SlugInput;
