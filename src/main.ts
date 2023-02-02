import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons'
// 引入全局css
import '@/assets/css/index.less'

const app = createApp(App)
app.use(store)
app.use(icons)
app.use(router)

app.mount('#app')
