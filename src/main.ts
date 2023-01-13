import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/assets/css/index.less'
const app = createApp(App)

app.use(router).use(pinia).mount('#app')
