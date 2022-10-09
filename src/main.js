import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vueRouter from '../router/index'
import './index.css'
import './assets/font.css'
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'

const app=createApp(App)
// app.use(ElementPlus)
app.use(vueRouter)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.mount('#app')

