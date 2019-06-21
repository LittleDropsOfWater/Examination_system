import React, { useEffect } from "react";
import { connect } from "dva";
import { Layout, Form, Input, Button, Modal, message } from "antd";
import Editor from "for-editor";
import styles from "./index.scss";
import SelectOption from "@/components/SelectOption";
import Title from "@/components/Title";
import { getUserData } from "@/utils/user";
const { Content } = Layout;
const { confirm } = Modal;
const { success, error } = message;
function QuestionsAdd(props) {
  /*
	获取所有的考试类型 exam/examType GET
	获取所有的课程 /exam/subject GET
	获取所有的试题类型 /exam/getQuestionsType
		*/
  // console.log("add组件props", props);
  const {
    form,
    question,
    addQuestions,
    examType,
    questions_type,
    subjectType,
    typeCode,
    msg
  } = props;
  const { getFieldDecorator } = form;

  //发起请求
  useEffect(question, []);
  useEffect(() => {
    if (typeCode === -1) return;
    if (typeCode) {
      success("添加试题成功");
    } else {
      error("添加试题失败");
    }
  }, [typeCode, msg]);

  //确认框
  function showConfirm() {
    confirm({
      title: "你确定要添加这道试题吗?",
      content: "真的要添加吗",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        form.validateFields((err, values) => {
          if (!err) {
            //调添加试题接口
            // console.log({ ...values, user_id: getUserData().user_id });
            addQuestions({ ...values, user_id: getUserData().user_id });
          }
        });
      },
      onCancel() {}
    });
  }
  function initialValue(data,init){
    return data[0]
    ? Object.values(data[0])[0]
    : init
  }


  return (
    <Layout>
      <Title>添加试题</Title>
      <Content className={styles.content}>
        <h3 className={styles.contentTitle}>题目信息</h3>
        <Form layout="vertical">
          <Form.Item label="题干">
            {getFieldDecorator("title", {
              rules: [
                { required: true, message: "请输入题干!" },
                { pattern: /^.{1,20}$/, message: "题干不能超过20字" }
              ]
            })(
              <Input
                className={styles.titleInput}
                size="large"
                placeholder="请输入题目标题,不超过20个字"
              />
            )}
          </Form.Item>
          <Form.Item label="题目主体">
            {getFieldDecorator("questions_stem", {
              rules: [{ required: true, message: "请输入题目主体!" }]
            })(<Editor placeholder="请输入内容" height="auto" />)}
          </Form.Item>
          <Form.Item label="请选择考试类型:">
            {getFieldDecorator("exam_id", {
              initialValue: initialValue(examType,"周考1"),
            })(<SelectOption list={examType} />)}
          </Form.Item>
          <Form.Item label="请选择课程类型:">
            {getFieldDecorator("subject_id", {
              initialValue: initialValue(subjectType,"javaScript上"),
            })(<SelectOption list={subjectType} />)}
          </Form.Item>
          <Form.Item label="请选择题目类型:">
            {getFieldDecorator("questions_type_id", {
              initialValue: initialValue(questions_type,"简答题"),
            })(<SelectOption list={questions_type} />)}
          </Form.Item>
          <Form.Item label="答案信息">
            {getFieldDecorator("questions_answer", {
              rules: [{ required: true, message: "请输入答案信息!" }]
            })(<Editor placeholder="请输入内容" height="auto" />)}
          </Form.Item>
          <Button onClick={showConfirm} type="primary" size="large">
            提交
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}
/**
 * 
 * 
	获取所有的考试类型 exam/examType GET
	获取所有的课程类型 /exam/subject GET
  获取所有的试题类型 /exam/getQuestionsType
  添加试题接口 /exam/questions POST
 */
const mapState = state => {
  // console.log("add-redux.state:", state);
  return { ...state.question, user_id: state.user.user_id };
};
const mapDispatch = dispatch => ({
  question() {
    dispatch({
      type: "question/getAllType"
    });
  },
  addQuestions(payload) {
    // console.log("dispatch-addQuestions-paylod", payload);
    dispatch({
      type: "question/addQuestions",
      payload
    });
  }
});
export default connect(
  mapState,
  mapDispatch
)(Form.create({ name: "questions_add" })(QuestionsAdd));
