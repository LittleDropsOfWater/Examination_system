
export default {
  //命名空间
  namespace: 'global',
  //模块内部状态
  state: {
		locale:'zh'
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
  },
  //同步操作
  reducers: {
    changeLocale(state, action) {
      return { ...state, locale:action.payload };
    },
  },

};
