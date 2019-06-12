import request from '../utils/request';

//登录接口
export function login(params) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: params
  });
}

//获取所有试题类型 classify获取数据接口
export function classifyGetData(){
  return request({
    url:"/exam/getQuestionsType",
    method:"GET"
  })
}
//获取所有试题
export function getAllViews(){
  return request({
    url:"/exam/questions/new",
    method:"GET"
  })
}
//获取所有考试类型
export function getExamClass(){
  return request({
    url:"/exam/examType",
    method:"GET"
  })
}
//获取所有课程
export function getAllCourse(){
  return request({
    url:"/exam/subject",
    method:"GET"
  })
}
