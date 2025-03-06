import {
  AUTH_API_SERVICE,
  AUTH_SERVICE,
  HTTP_CLIENT,
  MODAL_SERVICE,
  NOTES_API_SERVICE,
  NOTES_SERVICE,
  USER_API_SERVICE,
  USER_SERVICE,
} from '@/core/di/di-symbols.ts';
import { HttpClient } from '@/core/http-client/http-client.ts';
import { AuthApiService } from '@/api/auth/auth.api.ts';
import { UserApiService } from '@/api/user/user.api.ts';
import { NotesApiService } from '@/api/notes/notes.api.ts';
import { AuthService } from '@/services/auth.service.ts';
import { UserService } from '@/services/user.service.ts';
import { NotesService } from '@/services/notes.service.ts';
import { ModalService } from '@/services/modal.service.ts';
import type { Container } from '@/core/di/interfaces/di.interfaces.ts';

export const createContainer = (): Container => {
  const httpClient = new HttpClient();

  const commonServices = {
    [HTTP_CLIENT]: httpClient,
    [MODAL_SERVICE]: new ModalService(),
  };

  const apiServices = {
    [AUTH_API_SERVICE]: new AuthApiService(httpClient),
    [USER_API_SERVICE]: new UserApiService(httpClient),
    [NOTES_API_SERVICE]: new NotesApiService(httpClient),
  };

  const featureServices = {
    [AUTH_SERVICE]: new AuthService(apiServices[AUTH_API_SERVICE]),
    [USER_SERVICE]: new UserService(apiServices[USER_API_SERVICE]),
    [NOTES_SERVICE]: new NotesService(apiServices[NOTES_API_SERVICE]),
  };

  return {
    ...commonServices,
    ...apiServices,
    ...featureServices,
  };
};
