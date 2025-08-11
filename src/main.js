import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/routers/router'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .component('Icon', Icon)
  .use(router)
  .mount('#app')
