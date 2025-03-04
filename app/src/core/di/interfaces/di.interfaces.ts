import {
  HTTP_CLIENT,
  MODAL_SERVICE,
  USER_API_SERVICE,
  AUTH_API_SERVICE,
  NOTES_API_SERVICE,
  AUTH_SERVICE,
  USER_SERVICE,
  NOTES_SERVICE,
} from '@/core/di/di-symbols.ts'
import type { AuthApiService } from '@/api/auth/auth.api.ts';
import type { HttpClient } from '@/core/http-client/http-client.ts'
import type { ModalService } from '@/services/modal.service.ts'
import type { UserApiService } from '@/api/user/user.api.ts'
import type { NotesApiService } from '@/api/notes/notes.api.ts'
import type { AuthService } from '@/services/auth.service.ts'
import type { UserService } from '@/services/user.service.ts'
import type { NotesService } from '@/services/notes.service.ts'
export interface Container {
  [key: symbol]: unknown;
  [HTTP_CLIENT]?: HttpClient;
  [MODAL_SERVICE]?: ModalService;
  [AUTH_API_SERVICE]?: AuthApiService;
  [USER_API_SERVICE]?: UserApiService;
  [NOTES_API_SERVICE]?: NotesApiService;
  [AUTH_SERVICE]?: AuthService;
  [USER_SERVICE]?: UserService;
  [NOTES_SERVICE]?: NotesService;
}
