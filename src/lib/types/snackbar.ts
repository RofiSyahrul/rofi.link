export type SnackbarVariant = 'error' | 'success' | 'neutral';

export interface SnackbarDetail {
  message: string;
  variant: SnackbarVariant;
}
