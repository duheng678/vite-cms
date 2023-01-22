import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

export default function registerStore(app: App) {
  app.use(pinia)

  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}
