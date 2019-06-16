import{getRequest,postRequest,putRequest} from '../utils/request';
export function addExam(params){
	return postRequest({
		url:'/exam/exam',
		params
	})
}
export const updateExam=(id,params)=>putRequest({url:`/exam/exam/${id}`,params})
export const getAllExam=(params={})=>getRequest({url:'/exam/exam'})