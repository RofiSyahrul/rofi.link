export type AlertStatus = 'info' | 'error' | 'success';

export type AlertProps = {
  className?: string;
  children: React.ReactNode;
  onClose?(): void;
  showCloseButton?: boolean;
  status: AlertStatus;
  visibilityDuration?: number;
  visible?: boolean;
};
