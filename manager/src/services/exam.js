import{getRequest,postRequest,putRequest} from '../utils/request';
export function addExam(params){
	return postRequest({
		url:'/exam/exam',
		params
	})
}
export const updateExam=(id,params={})=>putRequest({url:`/exam/exam/${id}`,params})
export const getExam=(params={pageSize:50})=>getRequest({url:'/exam/exam',params})
export const getTheExam=(id='')=>getRequest({url:`/exam/exam/${id}`})
export const getStudentsPapers=(params={pageSize:50})=>getRequest({url:`/exam/student/`,params})
export const getTheStudentPaper=(id,params={})=>getRequest({url:`/exam/student/${id}`,params})
export const markingTestPaper=({exam_student_id,score})=>putRequest({url:`/exam/student/${exam_student_id}`,params:{score}})