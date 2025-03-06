import './styles/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouterGuards } from './router';
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
import type { AuthService } from '@/services/auth.service.ts';
import { createContainer } from '@/core/di/di-container.ts';

const initApp = async () => {
  const app = createApp(App);

  const container = createContainer();

  app.provide(HTTP_CLIENT, container[HTTP_CLIENT]);
  app.provide(MODAL_SERVICE, container[MODAL_SERVICE]);

  app.provide(AUTH_API_SERVICE, container[AUTH_API_SERVICE]);
  app.provide(USER_API_SERVICE, container[USER_API_SERVICE]);
  app.provide(NOTES_API_SERVICE, container[NOTES_API_SERVICE]);

  app.provide(AUTH_SERVICE, container[AUTH_SERVICE]);
  app.provide(USER_SERVICE, container[USER_SERVICE]);
  app.provide(NOTES_SERVICE, container[NOTES_SERVICE]);

  setupRouterGuards(container[AUTH_SERVICE] as AuthService);
  app.use(router);

  app.mount('#app');
};

initApp();
