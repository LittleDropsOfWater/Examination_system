import {
    getUserData,
    getUserIdentity,
    getUserApiAuthority,
    getidentity_api_authority_relation,
    getView_authority,
    getIdentity_view_authority_relation,
    getAddUser,
    getUpdateUser,
    getAddIdentity,
    getApi_authority,
    getIdentityApi,
    getIdentityView,
    addView_authority
} from "@/services"
export default {
    //命名空间
    namespace: 'userShow',
    //模块内部状态
    state: {
        allUser: [],
        userIdentity: [],
        api_authority: [],
        identity_api_authority_relation: [],
        view_authority: [],
        identity_view_authority_relation: [],
        msg: {
            code: -1
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
    //异步操作
    effects: {
        *userData({ payload }, { call, put }) {// eslint-disable-line
            let data = yield call(getUserData)
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        allUser: data.data
                    }
                });
            }
            data = yield call(getUserIdentity);
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        userIdentity: data.data
                    }
                });
            }
            data = yield call(getUserApiAuthority);
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        api_authority: data.data
                    }
                });
            }
            data = yield call(getidentity_api_authority_relation);
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        identity_api_authority_relation: data.data
                    }
                });
            }
            data = yield call(getView_authority);
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        view_authority: data.data
                    }
                });
            }
            data = yield call(getIdentity_view_authority_relation);
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        identity_view_authority_relation: data.data
                    }
                });
            }
        },
        *addUser({ payload }, { call, put }) {
            let data = yield call(getAddUser, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *updateUser({ payload }, { call, put }) {
            let data = yield call(getUpdateUser, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *addIdentity({ payload }, { call, put }) {
            let data = yield call(getAddIdentity, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *api_authority({ payload }, { call, put }) {
            let data = yield call(getApi_authority, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *IdentityApi({ payload }, { call, put }) {
            let data = yield call(getIdentityApi, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *IdentityView({ payload }, { call, put }) {
            let data = yield call(getIdentityView, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
            })
        },
        *view_authority({ payload }, { call, put }) {
            let data = yield call(addView_authority, payload)
            yield put({
                type: "save",
                payload: {
                    msg: data
                }
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
