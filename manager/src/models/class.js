import {
    getGrade, 
    getRoom,
    getAddGrode
} from "@/services"
export default {
    //命名空间
    namespace: 'class',
    //模块内部状态
    state: {
        grade: [],
        room: [],
        msg:{
            code:-1
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
    //异步操作
    effects: {
        *grade({ payload }, { call, put }) {
            let data = yield call(getGrade)
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        grade: data.data
                    }
                });
            }
        },
        *room({ payload }, { call, put }) {
            let data = yield call(getRoom)
            console.log(data)
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        room: data.data
                    }
                });
            }
        },
        *addGrode({ payload }, { call, put }){
            let data = yield call(getAddGrode,payload)
            yield put({
                type: "save",
                payload:{
                    msg:data
                }
            })
        }
        //   *fetch({ payload }, { call, put }) {  // eslint-disable-line
        //     yield put({ type: 'save' });
        //   },
    },
    //同步操作
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
