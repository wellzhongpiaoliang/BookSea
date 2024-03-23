// 安装pinia插件
import { createPinia } from 'pinia'
//安装持久化插件  npm install pinia-plugin-persistedstate
import persist from 'pinia-plugin-persistedstate'


const pinia = createPinia()
// 导入persist插件
pinia.use(persist)


export default pinia

export * from './modules/user'