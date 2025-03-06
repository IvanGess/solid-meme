import type { AuthApiService } from '@/api/auth/auth.api.ts';
import { ref } from 'vue';
import type {
  AuthCredentials,
  AuthTokenResponse,
  UserProfile,
} from '@/api/auth/auth.interfaces.ts';
import type { AsyncServiceResult } from '@/core/http-client/interfaces/http-client.interfaces.ts';

export class AuthService {
  public readonly isAuth = ref(false);
  public readonly currentUser = ref<UserProfile | null>();
  private authError = ref<string | null>(null);
  private token = ref<string | null>(null);
  constructor(private readonly authApi: AuthApiService) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      this.token.value = savedToken;
      this.isAuth.value = true;
    }
  }

  async login(
    credentials: AuthCredentials
  ): AsyncServiceResult<AuthTokenResponse> {
    const result = await this.authApi.login(credentials);

    if (result.data) {
      this.handleSuccessfulAuth(result.data);
    }

    return {
      data: result.data,
      error: result.error,
    };
  }

  private handleSuccessfulAuth(data: AuthTokenResponse): void {
    this.token.value = data.accessToken;
    this.isAuth.value = true;
    this.authError.value = null;
    localStorage.setItem('accessToken', data.accessToken);
  }

  async logout(): Promise<void> {
    const result = await this.authApi.logout();

    if (!result.error) {
      this.resetAuthState();
      localStorage.removeItem('accessToken');
    }
  }

  async checkAuth(): Promise<boolean> {
    if (!this.token.value) {
      return false;
    }

    try {
      const result = await this.authApi.getCurrentUser();
      if (!result.data) {
        this.resetAuthState();
        return false;
      }
      this.currentUser.value = result.data;
      this.isAuth.value = true;
      return true;
    } catch {
      this.resetAuthState();
      return false;
    }
  }

  private resetAuthState(): void {
    this.token.value = null;
    this.isAuth.value = false;
    this.authError.value = null;
    localStorage.removeItem('accessToken');
  }
}
