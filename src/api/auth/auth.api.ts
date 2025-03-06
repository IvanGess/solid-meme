import type {
  AuthCredentials,
  AuthTokenResponse,
  UserProfile,
} from '@/api/auth/auth.interfaces.ts';
import type { HttpClient } from '@/core/http-client/http-client.ts';
import type { AsyncServiceResult } from '@/core/http-client/interfaces/http-client.interfaces.ts';

export class AuthApiService {
  constructor(private readonly _httpClient: HttpClient) {}
  async login(
    credentials: AuthCredentials
  ): AsyncServiceResult<AuthTokenResponse> {
    return this._httpClient.post<AuthTokenResponse>(
      '/api/auth',
      credentials,
      false
    );
  }

  async getCurrentUser(): AsyncServiceResult<UserProfile> {
    return this._httpClient.get<UserProfile>('/api/auth');
  }

  async logout(): AsyncServiceResult<void> {
    return this._httpClient.delete<void>('/api/auth');
  }
}
