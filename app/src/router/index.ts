import {
  createRouter,
  createWebHistory,
  type NavigationGuardWithThis,
  type RouteLocationNormalizedGeneric,
} from 'vue-router';
import type { AuthService } from '@/services/auth.service.ts';

const LOGIN_PATH = '/login';
const NOTES_PATH = '/notes';

interface RouteMeta {
  requiresAuth?: boolean;
  requiresGuest?: boolean;
  title?: string;
}

const routes = [
  {
    path: '/',
    redirect: () => ({ path: NOTES_PATH }),
  },
  {
    path: NOTES_PATH,
    component: () => import('@/views/NotesView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Мои заметки',
    },
  },
  {
    path: LOGIN_PATH,
    component: () => import('@/views/GuestView.vue'),
    meta: {
      requiresGuest: true,
      title: 'Вход',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export const setupRouterGuards = (authService: AuthService) => {
  const checkAuth = async () => await authService.checkAuth();
  const isAuthRoute = (to: RouteLocationNormalizedGeneric) =>
    to.matched.some((r: { meta: RouteMeta }) => r.meta.requiresAuth);
  const isGuestRoute = (to: RouteLocationNormalizedGeneric) =>
    to.matched.some((r: { meta: RouteMeta }) => r.meta.requiresGuest);

  router.beforeEach(async (to) => {
    const isAuthenticated = await checkAuth();

    if (to.path === '/') {
      return isAuthenticated ? NOTES_PATH : LOGIN_PATH;
    }

    if (isAuthRoute(to) && !isAuthenticated) {
      return {
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
      };
    }

    if (isGuestRoute(to) && isAuthenticated) {
      return NOTES_PATH;
    }

    return true;
  });

  router.afterEach((to) => {
    const meta = to.meta as RouteMeta;
    document.title = meta.title || 'MyNotes';
  });
};

export default router;
