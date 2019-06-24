import React, { useEffect } from "react";
import { connect } from "dva";
import { Layout, Form, Input, Button, Modal, message } from "antd";
import Editor from "for-editor";
import styles from "./index.scss";
import SelectOption from "@/components/SelectOption";
import Title from "@/components/Title";
import { getUserData } from "@/utils/user";
import { injectIntl } from "react-intl";

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
    msg,
    intl: { formatMessage }
  } = props;
  const { getFieldDecorator } = form;

  //发起请求
  useEffect(question, []);
  useEffect(() => {
    if (typeCode === -1) return;
    if (typeCode) {
      success(formatMessage({ id: "router.questions.add.successMsg" }));
    } else {
      error(formatMessage({ id: "router.questions.add.errorMsg" }));
    }
  }, [typeCode, msg]);

  //确认框
  function showConfirm() {
    confirm({
      title: formatMessage({ id: "router.questions.confirm.title" }),
      content: formatMessage({ id: "router.questions.confirm.content" }),
      okText: formatMessage({ id: "router.questions.confirm.okText" }),
      cancelText: formatMessage({ id: "router.questions.confirm.cancelText" }),
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
  function initialValue(data, init) {
    return data[0] ? Object.values(data[0])[0] : init;
  }

  return (
    <Layout>
      <Title>{formatMessage({ id: "router.questions.add" })}</Title>
      <Content className={styles.content}>
        <h3 className={styles.contentTitle}>
          {formatMessage({ id: "router.questions.add.contentTitle" })}
        </h3>
        <Form layout="vertical">
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.title.label"
            })}
          >
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "router.questions.add.form.title.require"
                  })
                },
                {
                  pattern: /^.{1,20}$/,
                  message: formatMessage({
                    id: "router.questions.add.form.title.pattern"
                  })
                }
              ]
            })(
              <Input
                className={styles.titleInput}
                size="large"
                placeholder={formatMessage({
                  id: "router.questions.add.form.title.placeholder"
                })}
              />
            )}
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.questionsStem.label"
            })}
          >
            {getFieldDecorator("questions_stem", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "router.questions.add.form.questionsStem.require"
                  })
                }
              ]
            })(
              <Editor
                placeholder={formatMessage({
                  id: "router.questions.add.form.questionsStem.placeholder"
                })}
                height="auto"
              />
            )}
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.examType.label"
            })}
          >
            {getFieldDecorator("exam_id", {
              initialValue: initialValue(examType, "周考1")
            })(<SelectOption list={examType} />)}
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.subjectType.label"
            })}
          >
            {getFieldDecorator("subject_id", {
              initialValue: initialValue(subjectType, "javaScript上")
            })(<SelectOption list={subjectType} />)}
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.questionsType.label"
            })}
          >
            {getFieldDecorator("questions_type_id", {
              initialValue: initialValue(questions_type, "简答题")
            })(<SelectOption list={questions_type} />)}
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: "router.questions.add.form.questionsAnswer.label"
            })}
          >
            {getFieldDecorator("questions_answer", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "router.questions.add.form.questionsAnswer.require"
                  })
                }
              ]
            })(
              <Editor
                placeholder={formatMessage({
                  id: "router.questions.add.form.questionsAnswer.placeholder"
                })}
                height="auto"
              />
            )}
          </Form.Item>
          <Button onClick={showConfirm} type="primary" size="large">
            {formatMessage({ id: "router.questions.add.form.submit" })}
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
export default injectIntl(
  connect(
    mapState,
    mapDispatch
  )(Form.create({ name: "questions_add" })(QuestionsAdd))
);
