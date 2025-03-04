import {
  HTTP_CLIENT,
  USER_API_SERVICE,
  AUTH_API_SERVICE,
  NOTES_API_SERVICE,
} from '@/core/di/di-symbols.ts'
import type { AuthApiService } from '@/api/auth/auth.api.ts';
import type { HttpClient } from '@/core/http-client/http-client.ts'
import type { UserApiService } from '@/api/user/user.api.ts'
import type { NotesApiService } from '@/api/notes/notes.api.ts'
export interface Container {
  [key: symbol]: unknown;
  [HTTP_CLIENT]?: HttpClient;
  [AUTH_API_SERVICE]?: AuthApiService;
  [USER_API_SERVICE]?: UserApiService;
  [NOTES_API_SERVICE]?: NotesApiService;
}
