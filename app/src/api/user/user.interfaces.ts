export interface RegistrationData {
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegistrationResponse {
  id: number;
  email: string;
}
