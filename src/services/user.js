import request from '../utils/request';

//登录接口
export function login(params){
	return request({
		url:'/user/login',
		method:'POST',
		data:params
	})
}