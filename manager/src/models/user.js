import {login} from "../services/user"
export default {
 
    namespace: 'user',
  
    state: {
     
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *login({ payload }, { call, put }){
            let data=yield call(login,payload)
            yield put({type:"save",payload:data})
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };