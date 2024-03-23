import axios from 'axios'
import { useUserStore } from '@/store'

const baseURL = 'http://localhost:8081/'  // 本地
// const baseURL = 'http://192.168.1.5:8081/'  // 局域网ip1
// const baseURL = 'http://192.168.1.10:8081/'  // 局域网ip2
// const baseURL = 'http://192.168.1.3:8081/'  // 局域网ip2

// 请求
const instance = axios.create({
    // TODO 1. 基础地址，超时时间
    baseURL,
    timeout:10000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // TODO 2. 携带token
        const useStore = useUserStore()
        if(useStore.token){
            // 有token则携带token
            config.headers.token = useStore.token
            // Authorization
        }
        return config
    },
    // 请求异常提示
    (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
    res => {
        return res
    },
    (err) => {
        // TODO 5. 处理401错误
        return Promise.reject(err)
    }
)

// 曝光
export default instance
export { baseURL }