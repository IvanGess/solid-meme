import { inject } from 'vue'
import type { HttpClient } from '@/core/http-client/http-client.ts'
import type { UserApiService } from '@/api/user/user.api.ts'
import type { AuthApiService } from '@/api/auth/auth.api.ts'
import type { NotesApiService } from '@/api/notes/notes.api.ts'

import {
  AUTH_API_SERVICE,
  HTTP_CLIENT,
  NOTES_API_SERVICE,
  USER_API_SERVICE,
} from '@/core/di/di-symbols.ts'

export const useHttpClient = () => inject<HttpClient>(HTTP_CLIENT)!
export const useAuthApiService = () => inject<AuthApiService>(AUTH_API_SERVICE)!
export const useUserApiService = () => inject<UserApiService>(USER_API_SERVICE)!
export const useNotesApiService = () => inject<NotesApiService>(NOTES_API_SERVICE)!

