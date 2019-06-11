import {login} from "../services/example"
export default {
 
    namespace: 'use',
  
    state: {},
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *login({ payload }, { call, put }){
            let data=yield call(login,payload)
            console.log(data)
      },
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };