import { getExamType, getSubject, getQuestionsType ,addQuestions,getAllquestion,getClassQuery,updateQuestion,
  addQuestionsType} from "@/services";
export default {
  //命名空间
  namespace: "question",
  //模块内部状态
  state: {
    examType: [],//考试类型
    subjectType: [],//课程类型
    questions_type: [],//试题类型
    allQuestion:[],//所有试题
    EditQuestion:[],
    typeCode:-1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },
  //异步操作
  /**
 * 
	获取所有的考试类型 exam/examType GET
	获取所有的课程类型 /exam/subject GET
  获取所有的试题类型 /exam/getQuestionsType
//获取所有试题   
 */
  effects: {
    //获取所有的考试类型 exam/examType GET
    *getExamType({ payload }, { call, put }) {
      let data = yield call(getExamType);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            examType: data.data
          }
        });
      }
    },
    //点击编辑获取数据
    *EditQuestion({payload},{call,put}){
      yield put({
        type:"getAllType"
      })
      let data=yield call(getClassQuery,payload)
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            EditQuestion: data.data
          }
        });
      }
    },
    //更新试题
    *updateQuestion({ payload }, { call, put }){
      let data = yield call(updateQuestion,payload);
      yield put({ type: "message/callMessage", payload: data.code });


    },
    //获取所有的课程类型
    *getSubject({ payload }, { call, put }) {
      let data = yield call(getSubject);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            subjectType: data.data
          }
        });
      }
    },
    //获取所有的试题类型
    *getQuestionsType({ payload }, { call, put }) {
      let data = yield call(getQuestionsType);
      // console.log("getQuestionsType:", data);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            questions_type: data.data
          }
        });
      }
    },
    *getClassData({payload},{call,put}){
      let data=yield call(getClassQuery,payload)
      if(data.code===1){
        yield put({
          type:"save",
          payload:{
            allQuestion: data.data
          }
        })
      }
    },
    *getAllquestion({ payload }, { call, put }) {
      let data = yield call(getAllquestion);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            allQuestion: data.data
          }
        });
      }
    },
    *getAllType({ payload }, { call, put }) {
      yield put({ type: "getExamType" });
      yield put({ type: "getSubject" });
      yield put({ type: "getQuestionsType" });
    },
    *addQuestions({payload},{call,put}){
      // console.log('model-question-addQuestions.payload',payload);
      let data=yield call(addQuestions,payload);
      yield put({ type: "callTypeCode", payload: data.code });
    },
    //添加试题类型
    *addQuestionsType({ payload }, { call, put }) {
      // console.log('model-question-addQuestionsType.payload',payload);
      try {
        let data = yield call(addQuestionsType, payload);
        console.log(data);
        yield put({ type: "getQuestionsType" });
        yield put({ type: "callTypeCode", payload: data.code === 1 ? 1 : 0 });
      } catch (err) {
        yield put({ type: "callTypeCode", payload: 0 });
      }
    },
    *callTypeCode({ payload }, { call, put }) {
      yield put({ type: "setTypeCode", payload });
      yield put({
        type: "resetTypeCode"
      });
    }
  },
  //同步操作
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setTypeCode(state, action) {
      return { ...state, typeCode: action.payload };
    },
    resetTypeCode(state) {
      return { ...state, typeCode: -1 };
    }
  }
};
