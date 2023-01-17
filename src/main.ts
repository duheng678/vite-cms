import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'
// 引入全局css
import '@/assets/css/index.less'

const app = createApp(App)
app.use(registerIcons)

app.use(router).use(pinia).mount('#app')
