import request from '../utils/request';
/**
 * 
	获取所有的考试类型 exam/examType GET
	获取所有的课程 /exam/subject GET
	获取所有的试题类型 /exam/getQuestionsType GET
	获取所有试题	/exam/questions/new	GET
	添加试题接口	/exam/questions POST
 */
//考试类型 
export function getExamType(params){
	return request({
		url:'exam/examType',
		method:'GET',
	})
}
//获取所有的课程
export function getSubject(){
	return request({
		url:'/exam/subject',
		method:'GET',
	})
}
//获取所有的试题类型
export function getQuestionsType(){
	return request({
		url:'/exam/getQuestionsType',
		method:'GET',
	})
}

//获取所有试题
export function getAllquestion(){
  return request({
    url:"/exam/questions/new",
    method:"GET"
  })
}

//添加试题接口	/exam/questions POST
export function addQuestions(params){
	console.log('service-questions.params',params)
	return request({
		url:'/exam/questions',
		method:'POST',
		data:params
	})
}