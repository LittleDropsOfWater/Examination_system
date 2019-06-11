import {login} from '../services'
export default {

  //命名空间
  namespace: 'user',

  //模块内部状态
  state: {
    code:-1,
    msg:'',
    token:''
  },

  //订阅数据源
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
   //异步操作

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *login({ payload }, { call, put }){
      
      console.log('payload...',payload);
      let data= yield call(login,payload);
      console.log('data...',data);
     yield put({
       type:'save',
       payload:data
     }) 
    }
  },
  //同步操作

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
