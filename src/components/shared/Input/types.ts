export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hasError?: boolean;
  supportText?: string;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
  containerStyle?: React.CSSProperties;
};
