import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue'),
    },

    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
})

export default router
