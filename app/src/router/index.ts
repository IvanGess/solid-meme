import { createRouter, createWebHistory } from 'vue-router'

const LOGIN_PATH = '/login'
const NOTES_PATH = '/notes'

const routes = [
  {
    path: '/',
    redirect: () => ({ path: NOTES_PATH }),
  },
  {
    path: NOTES_PATH,
    component: () => {},
    meta: {
      requiresAuth: true,
      title: 'Мои заметки'
    }
  },
  {
    path: LOGIN_PATH,
    component: () => {},
    meta: {
      requiresGuest: true,
      title: 'Вход'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})



export default router
