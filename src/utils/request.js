import axios from 'axios';

//实现拦截器, 对请求进行统一判断
//拦截器 
//请求拦截器
//响应拦截器
const service = axios.create({
  baseURL:'http://169.254.0.233:7001/',
  timeout:5000
})

// request interceptor
service.interceptors.request.use(
  config=>config,
 Promise.reject
)

// response interceptor
service.interceptors.response.use(
  response=>response.data,
  Promise.reject
)

export default service;
