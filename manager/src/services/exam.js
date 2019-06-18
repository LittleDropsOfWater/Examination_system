import{getRequest,postRequest,putRequest} from '../utils/request';
export function addExam(params){
	return postRequest({
		url:'/exam/exam',
		params
	})
}
export const updateExam=(id,params={})=>putRequest({url:`/exam/exam/${id}`,params})
export const getExam=(params={})=>getRequest({url:'/exam/exam',params})
export const getTheExam=(id='')=>getRequest({url:`/exam/exam/${id}`})
export const getStudentsPapers=(params)=>getRequest({url:`/exam/student/`,params})