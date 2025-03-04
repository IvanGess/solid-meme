import { UserApiService } from '@/api/user/user.api.ts'
import type {
  RegistrationData,
  RegistrationResponse
} from '@/api/user/user.interfaces.ts'
import type { AsyncServiceResult } from '@/core/http-client/interfaces/http-client.interfaces.ts'

export class UserService {
  constructor(private readonly _userApiService: UserApiService) {}

  async register(credentials: RegistrationData): AsyncServiceResult<RegistrationResponse> {
    return await this._userApiService.register(credentials)
  }
}
