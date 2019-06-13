import { getExamType, getSubject, getQuestionsType ,addQuestions,getAllquestion} from "@/services";
export default {
  //命名空间
  namespace: "question",
  //模块内部状态
  state: {
    examType: [],//考试类型
    subjectType: [],//课程类型
    questions_type: [],//试题类型
    allQuestion:[],
    code:-1
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
    *getExamType({ payload }, { call, put }) {
      let data = yield call(getExamType);
      console.log("examType:", data);

      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            examType: data.data
          }
        });
      }
    },
    *getSubject({ payload }, { call, put }) {
      let data = yield call(getSubject);
      console.log("subject:", data);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            subjectType: data.data
          }
        });
      }
    },
    *getQuestionsType({ payload }, { call, put }) {
      let data = yield call(getQuestionsType);
      console.log("getQuestionsType:", data);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            questions_type: data.data
          }
        });
      }
    },
    *getAllquestion({ payload }, { call, put }) {
      let data = yield call(getAllquestion);
      console.log("getAllquestion:", data);
      if (data.code === 1) {
        yield put({
          type: "save",
          payload: {
            allQuestion: data.data
          }
        });
      }
    },
    *getAddPage({ payload }, { call, put }) {
      console.log("models-getAddPage");
      yield put({ type: "getExamType" });
      yield put({ type: "getSubject" });
      yield put({ type: "getQuestionsType" });
    },
    *addQuestions({payload},{call,put}){
      console.log('model-question-addQuestions.payload',payload);
      let data=yield call(addQuestions,payload);
      console.log('addQuestions.data',data);
      yield put({
        type:'save',
        payload:data
      })
    }
  },
  //同步操作
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
