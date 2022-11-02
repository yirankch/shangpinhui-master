// 封装 axios 请求
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 引入store 获取 store user里面的 token
import store from '@/store'
// 1.利用 axios 对象的 方法create,去创建一个 axios 实例
// 2. request就是 axios,只不过稍微配置一些
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api  在baseURL 里添加了apx
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
requests.interceptors.response.use(function(res) {
  nprogress.done()
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 直接返回 res.data 方便操作，后续不需要解构赋值
  return res.data
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default requests
