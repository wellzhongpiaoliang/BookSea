import { createApp } from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入pinia
import pinia from './store/index'

// 导入element-plus(全部导入)
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')