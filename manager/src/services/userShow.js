import request from "../utils/request"
export function getUserData(){
	return request({
		url:'/user/user',
		method:'GET',
	})
}
export function getUserIdentity(){
	return request({
		url:'/user/identity',
		method:'GET',
	})
}
export function getUserApiAuthority(){
	return request({
		url:'/user/api_authority',
		method:'GET',
	})
}
export function getidentity_api_authority_relation(){
	return request({
		url:'/user/identity_api_authority_relation',
		method:'GET',
	})
}
export function getView_authority(){
	return request({
		url:'/user/view_authority',
		method:'GET',
	})
}
export function getIdentity_view_authority_relation(){
	return request({
		url:'/user/identity_view_authority_relation',
		method:'GET',
	})
}
//添加用户
export function getAddUser(params){
	return request({
		url:'/user',
		method:'POST',
		data:params
	})
}
//更新用户
export function getUpdateUser(params){
	return request({
		url:'/user/user',
		method:'PUT',
		data:params
	})
}
//添加身份
export function getAddIdentity(params){
	return request({
		url:'/user/identity/edit',
		method:'GET',
		params
	})
}
//添加api接口权限
export function getApi_authority(params){
	return request({
		url:'/user/authorityApi/edit',
		method:'GET',
		params
	})
}
//给身份设置api接口权限
export function getIdentityApi(params){
	return request({
		url:'/user/setIdentityApi',
		method:'POST',
		data:params
	})
}
//给身份设置视图权限
export function getIdentityView(params){
	return request({
		url:"/user/setIdentityView",
		method:"POST",
		data:params
	})
}
//添加视图权限
export function addView_authority(params){
	return request({
		url:"/user/authorityView/edit",
		method:"GET",
		params
	})
}




