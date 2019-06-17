import { login, userInfo } from "@/services";
import {
  setToken,
  getToken,
  removeToken,
  setUserData,
  removeUserData
} from "@/utils/user";
import { routerRedux } from "dva/router";

const defaultState = {
  code: -1,
  msg: ""
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
      // eslint-disable-line
      // console.log("sbuscriptions:", a, b);
      return history.listen(({ pathname = "/" }) => {
        const token = getToken();
        if (pathname.indexOf("/login") === -1) {
          //不去登录页面，
          //做token检测
          if (!token) {
            //利用redux做路由跳转
            dispatch(
              routerRedux.push({
                // pathname:`/login`,
                pathname: `/login`,
                search: `redirect=${encodeURIComponent(pathname)}`
              })
            );
          }
        } else {
          //去登录页面，如果已登录跳回首页
          if (token) {
            //利用redux做路由跳转
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
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *login({ payload }, { call, put }) {
      console.log("payload...", payload);
      let data = yield call(login, payload);
      console.log("data...", data);
      //设置登陆态到cookie里
      if (data.code === 1) {
        setToken(data.token);
      }
      yield put({
        type: "save",
        payload: data
      });
    },
    *userInfo(action, { call, put }) {
      let data = yield call(userInfo);
      yield put({
        type: "save",
        payload: data.data
      });
      setUserData(data.data);
    },
    *logOut({ payload }, { call, put }) {
      yield removeToken("");
      yield removeUserData("");
      yield put({ type: "logReset" });
      yield put(routerRedux.push({
        pathname: `/login`
      }));
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
    updateLogin(state, { payload }) {
      return { ...state, isLogin: payload };
    }
  }
};
