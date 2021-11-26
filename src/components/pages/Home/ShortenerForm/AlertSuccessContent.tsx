import { useCallback } from 'react';

import Button from '@/components/shared/Button';
import config from '@/config';
import copyToClipboard from '@/utils/dom/copy-to-clipboard';

import styles from './styles.module.css';
import { AlertSuccessContentProps } from './types';

export default function AlertSuccessContent({ slug }: AlertSuccessContentProps) {
  const shortenedURLResult = `${config.appURL}/${slug}`;

  const handleClick = useCallback(() => {
    copyToClipboard(shortenedURLResult);
  }, [shortenedURLResult]);

  return (
    <div className={styles.alertContent}>
      <span>
        {shortenedURLResult}
      </span>
      <Button type='button' mode='outline' size='small' onClick={handleClick}>
        Salin
      </Button>
    </div>
  );
}
