export interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLink?: boolean;
  to?: string;
  rounded?: boolean;
}
