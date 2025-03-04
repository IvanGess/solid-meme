import type {
  RegistrationData,
  RegistrationResponse
} from '@/api/user/user.interfaces.ts'
import type { HttpClient } from '@/core/http-client/http-client.ts'
import type {
  AsyncServiceResult,
} from '@/core/http-client/interfaces/http-client.interfaces.ts'

export class UserApiService {
  constructor(private readonly httpClient: HttpClient) {}

  async register(data: RegistrationData): AsyncServiceResult<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(
      '/api/reg',
      data,
      false
    )
  }
}
