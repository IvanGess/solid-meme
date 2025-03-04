import { inject } from 'vue'
import type { HttpClient } from '@/core/http-client/http-client.ts'
import type { UserApiService } from '@/api/user/user.api.ts'
import type { AuthApiService } from '@/api/auth/auth.api.ts'
import type { NotesApiService } from '@/api/notes/notes.api.ts'
import type { AuthService } from '@/services/auth.service.ts'
import type { UserService } from '@/services/user.service.ts'
import type { NotesService } from '@/services/notes.service.ts'
import type { ModalService } from '@/services/modal.service.ts'
import {
  AUTH_API_SERVICE, AUTH_SERVICE,
  HTTP_CLIENT,
  MODAL_SERVICE, NOTES_API_SERVICE, NOTES_SERVICE,
  USER_API_SERVICE, USER_SERVICE
} from '@/core/di/di-symbols.ts'

export const useHttpClient = () => inject<HttpClient>(HTTP_CLIENT)!
export const useModalService = () => inject<ModalService>(MODAL_SERVICE)!
export const useAuthApiService = () => inject<AuthApiService>(AUTH_API_SERVICE)!
export const useUserApiService = () => inject<UserApiService>(USER_API_SERVICE)!
export const useNotesApiService = () => inject<NotesApiService>(NOTES_API_SERVICE)!
export const useAuthService = () => inject<AuthService>(AUTH_SERVICE)!
export const useUserService = () => inject<UserService>(USER_SERVICE)!
export const useNoteService = () => inject<NotesService>(NOTES_SERVICE)!
