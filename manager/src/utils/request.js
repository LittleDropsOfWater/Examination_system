import axios from 'axios'
import {getToken} from "./use"
// create an axios instance
const service = axios.create({
  baseURL: 'http://169.254.78.4:7001/',
  // baseURL: 'http://169.254.0.233:7001/',
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(//拦截请求
  config => {
     // 判断是否有登陆态
     if (getToken()) {
      // 让每个请求携带authorization
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use( //拦截响应
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

export default service
