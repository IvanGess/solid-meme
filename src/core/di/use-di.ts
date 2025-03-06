import { inject } from 'vue';
import type { AuthService } from '@/services/auth.service.ts';
import type { UserService } from '@/services/user.service.ts';
import type { NotesService } from '@/services/notes.service.ts';
import type { ModalService } from '@/services/modal.service.ts';
import {
  AUTH_SERVICE,
  MODAL_SERVICE,
  NOTES_SERVICE,
  USER_SERVICE,
} from '@/core/di/di-symbols.ts';

export const useModalService = () => inject<ModalService>(MODAL_SERVICE)!;
export const useAuthService = () => inject<AuthService>(AUTH_SERVICE)!;
export const useUserService = () => inject<UserService>(USER_SERVICE)!;
export const useNoteService = () => inject<NotesService>(NOTES_SERVICE)!;
