export type InputFieldValidateHandler = (isValid: boolean) => void;

export type InputFieldProps = {
  onValidationDone: InputFieldValidateHandler;
};
