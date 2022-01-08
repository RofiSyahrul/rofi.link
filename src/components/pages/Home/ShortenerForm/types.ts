import type { AlertStatus } from '@/components/shared/Alert/types';

export type InputFieldValidateHandler = (isValid: boolean) => void;

export type InputFieldRefAttribute = Partial<HTMLInputElement> & {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type InputFieldProps = {
  onValidationDone: InputFieldValidateHandler;
};

export type AlertState = {
  visible: boolean;
  status: AlertStatus;
  content: React.ReactNode;
};

export type AlertSuccessContentProps = {
  slug: string;
};
