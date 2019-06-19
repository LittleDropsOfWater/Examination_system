import {
    getGrade,
    getRoom,
    getAddGrode,
    deleteGrode,
    deleteRoom,
    addRoom,
    updateClassMsg,
    getStudentData,
    deleteStudentData
} from "@/services"
export default {
    //命名空间
    namespace: 'class',
    //模块内部状态
    state: {
        grade: [],
        room: [],
        student: [],
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
            if (data.code === 1) {
                yield put({
                    type: 'save',
                    payload: {
                        room: data.data
                    }
                });
            }
        },
        *addGrode({ payload }, { call, put }) {
            let data = yield call(getAddGrode, payload)
            yield put({
                type: "updateMsg",
                payload: {
                    msg: data
                }
            })
            if (data.code) {
                yield put({
                    type: "classMsg"
                })
            }
        },
        *gradeDelete({ payload }, { call, put }) {
            let data = yield call(deleteGrode, payload)
            yield put({
                type: "updateMsg",
                payload: {
                    msg: data
                }
            })
            if(data.code){
                yield put({
                    type:"deleteGradeReducer",
                    payload
                })
            }
        },
        *deleteRoom({ payload }, { call, put }) {
            let data = yield call(deleteRoom, payload)
            yield put({
                type: "updateMsg",
                payload: {
                    msg: data
                }
            })
            if (data.code) {
                yield put({
                    type: "deleteRoomReducer",
                    payload
                })
            }
        },
        *addRoom({ payload }, { call, put }) {
            let data = yield call(addRoom, payload)
            yield put({
                type: "updateMsg",
                payload: {
                    msg: data
                }
            })
            if (data.code) {
                yield put({
                    type: "addRoomReducer",
                    payload: {
                        room_id: data.room_id,
                        room_text: payload.room_text
                    }
                })
            }
        },
        *updateClass({ payload }, { call, put }) {
            let data = yield call(updateClassMsg, payload)
            yield put({
                type: "updateMsg",
                payload: {
                    msg: data
                }
            })
            if (data.code) {
                yield put({
                    type: "classMsg"
                })
            }
        },
        *getStudent({ payload }, { call, put }) {
            let data = yield call(getStudentData)
            if (data.code) {
                yield put({
                    type: "save",
                    payload: {
                        student: data.data
                    }
                })
            }
        },
        *deleteStudent({ payload }, { call, put }) {
            let data = yield call(deleteStudentData, payload)
            if (data.code) {
                yield put({
                    type: "getStudent"
                })
            }
        },
        *classMsg({ payload }, { call, put }) {
            yield put({
                type: "grade"
            })
            yield put({
                type: "room"
            })
        },
        *updateMsg({ payload }, { call, put }) {
            yield put({
                type: "save",
                payload
            })
            yield put({
                type: "save",
                payload: {
                    msg: {
                        code: -1
                    }
                }
            })
        }
    },
    //同步操作
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        deleteGradeReducer(state,action){//删除班级 更新数据
            return {...state,grade:state.grade.filter(item=>item.grade_id!==action.payload.grade_id)}
        },
        deleteRoomReducer(state, action) { //删除教室 更新数据
            return { ...state, room: state.room.filter(item => item.room_id !== action.payload.room_id) }
        },
        addRoomReducer(state, action) {//添加教室 更新数据
            return { ...state, room: [action.payload, ...state.room,] }
        }
    }
};
