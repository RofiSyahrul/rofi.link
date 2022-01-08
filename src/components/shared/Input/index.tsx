import { forwardRef, useCallback, useState } from 'react';

import clsx from 'clsx';

import getDefaultId from '@/utils/helpers/get-default-id';

import styles from './styles.module.css';
import type { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id = getDefaultId(),
  className,
  disabled,
  label,
  hasError,
  supportText,
  prefixNode,
  suffixNode,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const hasLabel = Boolean(label);
  const hasPefix = Boolean(prefixNode);
  const hasSuffix = Boolean(suffixNode);

  const [isFocused, setIsFocused] = useState(false);

  const innerContainerClassName = clsx(
    styles.innerContainer,
    {
      [styles.hasError]: hasError,
      [styles.focused]: isFocused,
      [styles.disabled]: disabled
    }
  );

  const inputClassName = clsx(
    styles.input,
    {
      [styles.hasError]: hasError,
      [styles.hasLabel]: hasLabel,
      [styles.hasPrefix]: hasPefix,
      [styles.hasSuffix]: hasSuffix
    },
    className
  );

  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  }, [onFocus]);

  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  }, [onBlur]);

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={innerContainerClassName}>
        {prefixNode && (
          <span className={clsx(styles.prefix, { [styles.hasLabel]: hasLabel })}>
            {prefixNode}
          </span>
        )}
        <input
          {...props}
          ref={ref}
          id={id}
          className={inputClassName}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {label && (
          <label id={`${id}-label`} htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        {suffixNode && (
          <span className={clsx(styles.suffix, { [styles.hasLabel]: hasLabel })}>
            {suffixNode}
          </span>
        )}
      </div>
      {supportText && (
        <p className={clsx(styles.supportText, { [styles.hasError]: hasError })}>
          {supportText}
        </p>
      )}
    </div>
  );
});

export default Input;
