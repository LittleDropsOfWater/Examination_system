import { addExam,updateExam,getExam,getTheExam } from "@/services/exam";
import {  setExam} from "@/utils/user";
import { routerRedux } from "dva/router";

export default {
  //命名空间
  namespace: 'exam',
  //模块内部状态
  state: {
    exams:[],
    theExam:{}
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
			console.log(data);
			if(data.code){
        yield setExam(data.data);
        yield put(routerRedux.push({
          pathname: `/exam/edit`,
        }))
        console.log('跳转edit')
			}
		},	*updateExam({ payload }, { call, put }) {  // eslint-disable-line
			let data=yield call(updateExam,payload.id,payload.params);
			console.log(data);
			if(data.code){
        yield  put(routerRedux.push({
          // pathname:`/login`,
          pathname: `/exam/list`,
        }))
        console.log('跳转list')

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
    }
  }
};