import piniaPersist from 'pinia-plugin-persist'
import 'animate.css'
import './index.css'
import '../public/font.css'
import vueRouter from '../router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app=createApp(App)
// app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia().use(piniaPersist)).use(vueRouter).mount('#app')

