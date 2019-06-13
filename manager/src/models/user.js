import {setToken,getToken} from "../utils/use"
import {login} from "../services/user"
import {routerRedux} from "dva/router"
export default {
 
    namespace: 'user',
  
    state: {
      isLogin:0,
      classData:[]
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        return history.listen(({ pathname }) => {
          if (pathname.indexOf('/login') === -1) {
            // 不去登陆页面做token检测
            if (!getToken()){
              // 利用redux做路由跳转
              dispatch(routerRedux.replace({
                pathname: '/login',
                search:`redirect=${encodeURIComponent(pathname)}`
              }))
            }
          }else{
            // 去登陆页面，如果已登陆跳回首页
            if (getToken()){
               // 利用redux做路由跳转
               dispatch(routerRedux.replace({
                pathname: `/home`,
              }))
            }
          }
        });
      },
    },
    effects: {
      //登录页请求
      *login({ payload }, { call, put }){
            let data=yield call(login,payload)
            if(data.code===1){
              setToken(data.token)
            }
            yield put({
              type:"save",
              payload:data.code===1?1:-1
          })
      },
     
    },
    reducers: {
      save(state, {payload}) {
        return { ...state, isLogin:payload };
      }
    },
  
  };