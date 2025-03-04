import {
  AUTH_API_SERVICE,
  HTTP_CLIENT,
  NOTES_API_SERVICE,
  USER_API_SERVICE,
} from '@/core/di/di-symbols.ts'
import { HttpClient } from '@/core/http-client/http-client.ts'
import { AuthApiService } from '@/api/auth/auth.api.ts'
import { UserApiService } from '@/api/user/user.api.ts'
import { NotesApiService } from '@/api/notes/notes.api.ts'
import type { Container } from '@/core/di/interfaces/di.interfaces.ts';

export const createContainer = (): Container => {
  const httpClient = new HttpClient()

  const commonServices = {
    [HTTP_CLIENT]: httpClient,
  }

  const apiServices = {
    [AUTH_API_SERVICE]: new AuthApiService(httpClient),
    [USER_API_SERVICE]: new UserApiService(httpClient),
    [NOTES_API_SERVICE]: new NotesApiService(httpClient),
  }

  const featureServices = {}

  return {
    ...commonServices,
    ...apiServices,
    ...featureServices,
  }
}
