import {postRequest,getRequest,putRequest} from '../utils/request';
//登录接口
export function login(params){
	return postRequest({
		url:'/user/login',
		params
	})
}
//获取当前用户信息接口
export function getUserInfo(){
	return getRequest({
		url:'/user/userInfo',
	})
}
//更新当前用户信息接口
export function updateUserInfo(params){
	return putRequest({
		url:'/user/user',
		params
	})
}
//获取当前用户权限
export function getViewAuthority(user_id){
	return getRequest({
		url:`/user/new?user_id=${user_id}`,
	})
}
