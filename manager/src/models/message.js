
export default {
  //命名空间
  namespace: 'message',
  //模块内部状态
  state: {
		code:-1,
		msg:'',
	},

  subscriptions: {
	
  },
   //异步操作
  effects: {
    *callMessage({ payload }, { call, put }) {  // eslint-disable-line
			yield put({ type: "setMessage", payload });
      yield put({
        type: "resetMessage"
      });
    },
  },
  //同步操作
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setMessage(state, action) {
      return { ...state,  ...action.payload };
    },
    resetMessage(state) {
      return { ...state, code: -1,msg:'' };
    }
  },

};
