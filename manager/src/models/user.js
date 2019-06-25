import { login, getUserInfo, getViewAuthority } from "@/services";
import {
  setToken,
  getToken,
  removeToken,
} from "@/utils/user";
import { routerRedux } from "dva/router";

//引入路由表
import allView from "@/router/config.js";

//设置默认值
const defaultState = {
  code: -1,
  msg: "",
  userInfo:{},
  viewAuthority: [], //用户锁拥有的视图权限
  myView: [], //拥有权限的前端路由
  forbiddenView: [] //没有权限访问的路由
};
export default {
  //命名空间
  namespace: "user",

  //模块内部状态
  state: {
    ...defaultState
  },

  //订阅路由跳转，监听页面切换
  subscriptions: {
    setup({ dispatch, history }) {
      let oldPathname;
      return history.listen(({ pathname = "/" }) => {
        // console.log('=======================');
        // console.log(pathname,oldPathname===pathname);
        // console.log(history);
        // console.log(routerRedux);
        // console.log('=======================');
        if(oldPathname===pathname) return ;
        oldPathname=pathname;
        const token = getToken();
        //1.判断去的页面是否不是登录页面
        if (pathname.indexOf("/login") === -1) {
          //不去登录页面，
          //1.1判断是否有登录态
          if (!token) {
            //1.1.1没有登录态，利用redux做路由跳转
            dispatch(
              routerRedux.push({
                pathname: `/login`,
                search: `redirect=${encodeURIComponent(pathname)}`
              })
            );
          } else {
            //1.1.2 有登录态，请求用户信息，请求用户权限
            dispatch({ type: "getUserInfo" });
          }
          //1.2用户没有登录态
        } else {
          //1.2.1去登录页面，如果已登录跳回首页
          // console.log('登录页提示');
          if (token) {
            //利用redux做路由跳转
            // console.log('登录页跳转到首页')
            dispatch(
              routerRedux.replace({
                pathname: "/"
              })
            );
          }
        }
      });
    }
  },
  //异步操作

  effects: {
    *login({ payload }, { call, put }) {
      // console.log("payload...", payload,login);
      //1.调用登录接口
      let data = yield call(login, payload);
      // console.log("data...", data);
      //2.设置登录态到cookie里
      if (data.code === 1) {
        setToken(data.token);
      }
      //3.更新redux重登录状态
      yield put({
        type: "updateLogin",
        payload: data
      });
      yield put({
        type: "message/callMessage",
        payload: data
      });
    },
    *getUserInfo(action, { call, put,select }) {
  
      //1.判断是否有权限
      let myView = yield select(state=>state.user.myView);
      if(myView.length){return;}
  
      //2.获取用户信息
      let userInfo = yield call(getUserInfo);
      yield put({
        type: "updateUserInfo",
        payload: userInfo.data
      })

      //3.根据id获取视图权限
      let viewAuthority= yield call(getViewAuthority,
        userInfo.data.user_id);
        yield put({
          type:'updateViewAuthority',
          payload:viewAuthority.data
        })
    },
    *logOut({ payload }, { call, put }) {
      yield removeToken("");
      yield put({ type: "logReset" });
      yield put(
        routerRedux.push({
          pathname: `/login`
        })
      );
    }
  },

  //同步操作
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    logReset(state) {
      return { ...state, ...defaultState };
    },
    updateLogin(state, { payload:{code,msg} }) {
      return { ...state, msg,code };
    },
    updateUserInfo(state,{payload}){
      return {...state,userInfo:payload}
    },
    updateViewAuthority(state,{payload}){
      //筛选出我所有的前端路由权限
      let myView=allView.routes,forbiddenView=[];
      myView=myView.map(item=>{
        if(!item.children)return item;
        let children=item.children.filter(value=>{
          if(payload.findIndex(id=>id.view_id===value.id) !== -1){
            return true
          }else{
            forbiddenView.push(value.path)
            return false
          }
        })
        return {...item,children}
      })
      console.log('myView...',myView);
      return {...state,viewAuthority:payload,myView,forbiddenView};
    }
  }
};
