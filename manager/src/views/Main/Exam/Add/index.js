import React, { useEffect } from "react";
import { connect } from "dva";
import {
  Layout,
  Form,
  Input,
  Button,
  message,
  InputNumber,
  DatePicker
} from "antd";
// import Editor from "for-editor";
import SelectOption from "@/components/SelectOption";
import Title from "@/components/Title";
// import { getUserData } from "@/utils/user";
import styles from "./index.scss";
const { Content } = Layout;
// const { confirm } = Modal;
const { success, error } = message;
function ExamAdd(props) {
  /*
	获取所有的考试类型 exam/examType GET
	获取所有的课程 /exam/subject GET
	获取所有的试题类型 /exam/getQuestionsType
		*/
  // console.log("add组件props", props);

  const {
    addExam,
    form,
    question,
    examType,
    // questions_type,
    subjectType,
    typeCode,
    msg,
    // history
  } = props;
  const { getFieldDecorator } = form;

  //发起请求
  useEffect(question, []);
  useEffect(() => {
    if (typeCode === -1) return;
    if (typeCode) {
      success("添加考试成功");
    } else {
      error("添加考试失败");
    }
  }, [typeCode, msg]);

  //获取默认值
  function initialValue(data, init) {
    return data[0] ? Object.values(data[0])[0] : init;
  }

  //表单提交函数
  //发起action-addexam
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //调添加试题接口
        values.start_time = +values.start_time;
        values.end_time = +values.end_time;
        console.log("组件：", values);
        addExam(values);
      }
    });
  }

  return (
    <Layout>
      <Title>添加考试</Title>
      <Content className='content' >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Form.Item label="试卷名称">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入试卷名称!" }]
            })(
              <Input
                className={styles.titleInput}
                size="large"
                placeholder="请输入试卷名称"
              />
            )}
          </Form.Item>
          <Form.Item label="考试类型:">
            {getFieldDecorator("exam_id", {
              initialValue: initialValue(examType, "周考1"),
              rules: [{ required: true, message: "请选择考试类型!" }]
            })(<SelectOption list={examType} />)}
          </Form.Item>
          <Form.Item label="课程类型:">
            {getFieldDecorator("subject_id", {
              initialValue: initialValue(subjectType, "javaScript上"),
              rules: [{ required: true, message: "请选择课程类型!" }]
            })(<SelectOption list={subjectType} />)}
          </Form.Item>
          <Form.Item label="设置题量:">
            {getFieldDecorator("number", {
              initialValue: 4,
              rules: [{ required: true, message: "请选择题量!" }]
            })(<InputNumber min={1} max={10} />)}
          </Form.Item>
          <Content style={{ display: "flex", alignItems: "flex-end" }}>
            <Form.Item label="考试时间：">
              {getFieldDecorator("start_time", {
                rules: [{ required: true, message: "请选择考试开始时间!" }],
              })(
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="开始时间"
                  showTime
                />
              )}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                margin: "0 10px",
                alignSelf: "center"
              }}
            >
              -
            </span>
            <Form.Item label="">
              {getFieldDecorator("end_time", {
                rules: [{ required: true, message: "请选择考试结束时间!" }]
              })(
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="结束时间"
                  showTime
                />
              )}
            </Form.Item>
          </Content>

          <Button htmlType="submit" type="primary" size="large">
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
  return { ...state.question };
};
const mapDispatch = dispatch => ({
  question() {
    dispatch({
      type: "question/getAllType"
    });
  },
  addExam(payload) {
    // console.log("dispatch-addExam-paylod", payload);
    dispatch({
      type: "exam/addExam",
      payload
    });
  }
});
export default connect(
  mapState,
  mapDispatch
)(Form.create({ name: "questions_add" })(ExamAdd));
