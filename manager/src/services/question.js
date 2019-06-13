import request,{getRequest,postRequest} from '../utils/request';
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
	return getRequest({
		url:'exam/examType',
	})
}
//获取所有的课程
export function getSubject(){
	return getRequest({
		url:'/exam/subject',
	})
}
//获取所有的试题类型
export function getQuestionsType(){
	return getRequest({
		url:'/exam/getQuestionsType',
	})
}

//获取所有试题
export function getAllquestion(){
  return getRequest({
    url:"/exam/questions/new",
  })
}

//添加试题接口	/exam/questions POST
export function addQuestions(data){
	// console.log('service-questions.params',params)
	return postRequest({
		url:'/exam/questions',
		data
	})
}
//添加试题类型接口 /exam/insertQuestionsType GET
export function addQuestionsType(params){
	// console.log('service-addQuestionsType.params',params)
	return getRequest({
		url:'/exam/insertQuestionsType',
		params
	})
}