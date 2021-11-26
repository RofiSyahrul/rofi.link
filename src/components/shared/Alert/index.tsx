import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { CheckIcon, CloseIcon, ExclamationIcon, InfoIcon } from '@/components/icons';
import { Variant } from '@/types/style';

import Button from '../Button';
import VisuallyHidden from '../VisuallyHidden';
import styles from './styles.module.css';
import { AlertProps, AlertStatus } from './types';

const statusMapping: Record<AlertStatus, {
  icon: React.ReactNode,
  statusClassName: string,
  variant: Variant
}> = {
  error: {
    icon: <ExclamationIcon mode='text' variant='danger' size='large' />,
    statusClassName: styles.error,
    variant: 'danger'
  },
  info: {
    icon: <InfoIcon mode='text' variant='primary' size='large' />,
    statusClassName: styles.info,
    variant: 'primary'
  },
  success: {
    icon: <CheckIcon mode='text' variant='primary' size='large' />,
    statusClassName: styles.success,
    variant: 'primary'
  }
};

let timeout: NodeJS.Timeout;

export default function Alert({
  children,
  className,
  onClose,
  showCloseButton,
  status,
  visibilityDuration,
  visible
}: AlertProps) {
  const { icon, statusClassName, variant } = statusMapping[status];
  const [isVisible, setIsVisible] = useState(visible);
  const prevVisibleRef = useRef(isVisible);

  const alertClassName = clsx(
    styles.alert,
    statusClassName,
    isVisible ? styles.visible : '',
    className
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (visible !== prevVisibleRef.current) {
      prevVisibleRef.current = visible;
      setIsVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    if (isVisible && typeof visibilityDuration === 'number') {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleClose();
      }, visibilityDuration);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, visibilityDuration, handleClose]);

  return (
    <div className={alertClassName}>
      {icon}
      {children}
      {(showCloseButton || typeof visibilityDuration !== 'number') && (
        <Button
          type='button'
          mode='text'
          variant={variant}
          className={styles.closeButton}
          onClick={handleClose}
          title='Tutup'
        >
          <CloseIcon mode='text' variant={variant} size='large' />
          <VisuallyHidden>
            Tutup
          </VisuallyHidden>
        </Button>
      )}
    </div>
  );
}
