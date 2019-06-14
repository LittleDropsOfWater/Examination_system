import axios from "axios";
import { getToken } from "@/utils/user";

//实现拦截器, 对请求进行统一判断
//拦截器
//请求拦截器
//响应拦截器
const service = axios.create({
  baseURL: "http://169.254.0.233:7001/",//叶文程的服务器
  // baseURL: "http://169.254.78.4:7001/",//唐小彬的服务器
  timeout: 5000
});

// request interceptor 请求拦截
service.interceptors.request.use(config => {
  //判断是否有登录态
  const token = getToken();
  if (token) {
    //让每个请求携带authorization
    config.headers['addUser']=token;
    config.headers["Authorization"] = token;
  }
  return config;
}, Promise.reject);

// response interceptor 响应拦截
service.interceptors.response.use(response => {
  console.log('响应拦截:',response);
  return response.data
}, Promise.reject);

export default service;
export const  getRequest=({url,params={}})=>{
  return service({
		url,
    method:'GET',
    params
	})
}
export const  postRequest=({url,data={}})=>{
  return service({
		url,
    method:'POST',
    data
	})
}
export const  putRequest=({url,data={}})=>{
  return service({
		url,
    method:'PUT',
    data
	})
}

export const deleteRequest=({url,params={}})=>{
  return service({
		url,
    method:'DELETE',
    params
	})
}