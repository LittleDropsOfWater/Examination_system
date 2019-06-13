import {classifyGetData} from "../services/user"
export default {
 
    namespace: 'class',
  
    state: {
        classData:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
       //获取所有试题类型请求
       *classGetData({payload},{call,put}){
        
        let data=yield call(classifyGetData)
        yield put({
          type:"classDate",
          payload:data.code===1?data.data:-1
        })
      }
    },
  
    reducers: {
        classDate(state,{payload}){
            return {...state,classData:payload}
          }
    },
  };
  