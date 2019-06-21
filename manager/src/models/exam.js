import { addExam,
  updateExam,
  getExam,
  getTheExam,
  getStudentsPapers,
  getTheStudentPaper,
  markingTestPaper} from "@/services/exam";
import {  setExam} from "@/utils/user";
import { routerRedux } from "dva/router";

export default {
  //命名空间
  namespace: 'exam',
  //模块内部状态
  state: {
    exams:[],
    theExam:{},
    allPapers:[],
    thePaper:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
   //异步操作
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
		},  
		*addExam({ payload }, { call, put }) {  // eslint-disable-line
			let data=yield call(addExam,payload);
			if(data.code){
        yield setExam(data.data);
        yield put(routerRedux.push({
          pathname: `/exam/edit`,
        }))
			}
		},	*updateExam({ payload }, { call, put }) {  // eslint-disable-line
			let data=yield call(updateExam,payload.id,payload.params);
			console.log(data);
			if(data.code){
        yield  put(routerRedux.push({
          pathname: `/exam/list`,
        }))
			}
    },
    *getAllExam({ payload }, { call, put }){
      let data= yield call(getExam,{pageSize:20});
      yield put({
        type:'updateExams',
        payload:data.exam
      })
    },
    *searchExams({payload},{call,put}){
      let data= yield call(getExam,payload);
      yield put({
        type:'updateExams',
        payload:data.exam
      })
    },
    *getTheExam({payload},{call,put}){
      let data= yield call(getTheExam,payload);
      yield put({
        type:'updateTheExam',
        payload:data.data
      })
    },
    *getStudentsPapers({payload},{call,put}){
      let data= yield call(getStudentsPapers,payload);
      yield put({
        type:'updateAllPapers',
        payload:data.exam,
      })
    },
    *getTheStudentPaper({payload},{call,put}){
      let data= yield call(getTheStudentPaper,payload);
      yield put({
        type:'TheStudentPaper',
        payload:data.data,
      })
    },
    *markingTestPaper({payload},{call,put}){
      let data= yield call(markingTestPaper,payload);
        if(data.code){
          yield  put(routerRedux.push({
            pathname: `/mark/classmate/${payload.grade_id}`,
          }))
        }
        // http://localhost:8000/#/mark/classmate/joyqt9-gyxsa8-fif6c-j12o0k
        // http://localhost:8000/#/exam/classmate/joyqt9-gyxsa8-fif6c-j12o0k
    },
  },
  //同步操作
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateExams(state,action){
      return {...state, exams:action.payload};
    },
    updateTheExam(state,action){
      return {...state,theExam:action.payload}
    },
    updateAllPapers(state,action){
      return {...state,allPapers:action.payload}
    },
    TheStudentPaper(state,action){
      return {...state,thePaper:action.payload}
    },
  }
};
