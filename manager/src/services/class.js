import request from "../utils/request"
//获取班级
export function getGrade(){
	return request({
		url:'/manger/grade',
		method:'GET',
	})
}
//获取教室号
export function getRoom(){
	return request({
		url:'/manger/room',
		method:'GET',
	})
}
//添加班级
export function getAddGrode(params){
	return request({
		url:'/manger/grade',
        method:'POST',
        data:params
	})
}