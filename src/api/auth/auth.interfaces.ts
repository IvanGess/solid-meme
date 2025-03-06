export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
}
