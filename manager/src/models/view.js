import {getExamClass,getAllCourse,getAllViews} from "../services/user"
export default {
 
    namespace: 'view',
  
    state: {
       Course:[],
       allExam:[],
       examClass:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
       ////获取所有考试类型
       *examClass({payload},{call,put}){
        let data=yield call(getExamClass)
        yield put({
          type:"classDate",
          payload:data.code===1?data.data:-1
        })
      },
      //所有的课程
      *course({payload},{call,put}){
          let data=yield call(getAllCourse)
          yield put({
              type:"allCourse",
              payload:data.code===1?data.data:-1
          })
      },
      //所有的题目
      *allExam({payload},{call,put}){
        let data=yield call(getAllViews)
        yield put({
            type:"examData",
            payload:data.code===1?data.data:-1
        })
    }
    },
  
    reducers: {
        classDate(state,{payload}){
            return {...state,examClass:payload}
          },
          allCourse(state,{payload}){
            return {...state,Course:payload}
          },
        examData(state,{payload}){
            return {...state,allExam:payload}
        }
    },
  };
  