import request from "../utils/request"
//获取班级
export function getGrade() {
	return request({
		url: '/manger/grade',
		method: 'GET',
	})
}
//获取教室号
export function getRoom() {
	return request({
		url: '/manger/room',
		method: 'GET',
	})
}
//添加班级
export function getAddGrode(params) {
	return request({
		url: '/manger/grade',
		method: 'POST',
		data: params
	})
}
//删除班级
export function deleteGrode(params) {
	return request({
		url: '/manger/grade/delete',
		method: 'DELETE',
		data: params
	})
}
//删除教室
export function deleteRoom(params) {
	return request({
		url: '/manger/room/delete',
		method: 'DELETE',
		data: params
	})
}
//添加教室
export function addRoom(params) {
	return request({
		url: 'manger/room',
		method: 'POST',
		data: params
	})
}
//修改班级信息
export function updateClassMsg(params) {
	return request({
		url: "/manger/grade/update",
		method: "PUT",
		data: params
	})
}
//获取所有学生信息
export function getStudentData() {
	return request({
		url: "/manger/student",
		method: "GET"
	})
}
export function deleteStudentData(params) {
	return request({
		url: `/manger/student/${params.id}`,
		method: "DELETE",
	})
}