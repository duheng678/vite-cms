import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'
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

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    if (!token) return '/login'
  }
})

export default router
