import piniaPersist from 'pinia-plugin-persist'
import 'animate.css'
import './index.css'
import '../public/font.css'
import vueRouter from '../router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import comment from './components/comment.vue';
import { HeliaProviderPlugin } from './helia'
const app=createApp(App)
app.component('comment',comment)
app.use(HeliaProviderPlugin)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
let flag = window && window.process && window.process.versions && window.process.versions['electron'] //判断是否为桌面端环境
app.provide('globalFlag',flag)
app.config.globalProperties.$globalFlag = flag; 
app.use(createPinia().use(piniaPersist)).use(vueRouter).mount('#app')
