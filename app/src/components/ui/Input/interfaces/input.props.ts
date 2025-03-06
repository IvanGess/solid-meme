export interface InputProps {
  placeholder?: string;
  label?: string;
  inputType?: 'password' | 'text';
  disabled?: boolean;
  modelValue?: string;
  maxLength?: number;
  name?: string;
  autocomplete?: string;
  required?: boolean;
}
