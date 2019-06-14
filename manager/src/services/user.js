import request from '../utils/request';
//登录接口
export function login(params){
	return request({
		url:'/user/login',
		method:'POST',
		data:params
	})
}
//获取当前用户信息接口
export function userInfo(){
	return request({
		url:'/user/userInfo',
		method:'GET',
	})
}