import React, { useEffect, useState } from "react";
import { connect } from "dva";
import { Layout, Button, Modal, Drawer, List, Collapse } from "antd";
import Title from "@/components/Title";
import ReactMarkdown from "react-markdown";
import styles from "./index.scss";
import { getExam } from "@/utils/user";

const { Content } = Layout;
const { confirm } = Modal;
const { Panel } = Collapse;
function ExamEdit(props) {
  const { updateExam, allQuestion, getClassData } = props;
  let [exam] = useState(getExam());
  let [questions, updateQuestions] = useState(exam.questions);
  let [DrawerVisible, ChangeDrawerVisible] = useState(false);

  useEffect(() => {
    getClassData({ subject_id: exam.subject_id });
  }, []);
  function showConfirm(e, ind) {
    console.log(e, ind);
    confirm({
      title: "是否要删除该题?",
      content: `题目名：《${e}》`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        updateQuestions(questions.filter((val, index) => index !== ind));
      },
      onCancel() {}
    });
  }
  function createExam() {
    updateExam({
      id: exam.exam_exam_id,
      params: {
        question_ids: questions.map(val => val.questions_id).join(",")
      }
    });
  }

  return (
    <Layout>
      <Title>创建试卷</Title>
      <Content className="content">
        <Button onClick={() => ChangeDrawerVisible(true)}>添加新题</Button>
        <div className={styles.exam}>
          <h2>{exam.title}</h2>
          <p>
            考试时间：1小时30分钟 监考人：刘于 开始考试时间：
            {new Date(exam.start_time).toLocaleString()} 阅卷人：刘于
          </p>
          {questions.map(({ questions_id, title, questions_stem,questions_answer }, index) => (
            <div className={styles.questionsitem} key={questions_id}>
              <h4 className={styles.questionsitemTitle}>
                <span>
                  {index + 1}:{title}
                </span>
                <a onClick={() => showConfirm(title, index)}>删除</a>
              </h4>
              <ReactMarkdown
                className={styles.reactMarkdown}
                source={questions_stem}
              />
              <Collapse bordered={false}>
              <Panel header={'标准答案'}>
              <ReactMarkdown 
                className={styles.reactMarkdown}
              source={questions_answer} />
              </Panel>
              </Collapse>
            </div>
          ))}
          <Button type="primary" onClick={createExam}>
            创建试卷
          </Button>
        </div>
      </Content>
      <Drawer
        title=" 所有题目"
        placement="right"
        width="40%"
        closable={false}
        onClose={() => ChangeDrawerVisible(false)}
        visible={DrawerVisible}
      >
        <Collapse bordered={false} style={{ width: "100%" }} accordion>
          {allQuestion &&
            allQuestion.map(item =>
              DrawerListItem(item, questions, updateQuestions)
            )}
        </Collapse>
      </Drawer>
    </Layout>
  );
}
function DrawerListItem(item, questions, updateQuestions) {
  const disabled =
    questions.findIndex(val => val.questions_id === item.questions_id) !== -1;
  return (
    <Panel
      key={item.questions_id}
      header={
        <div className={styles.DrawerListItem} >
          {item.title}
          <Button
            className={styles.DrawerListButton}
            disabled={disabled}
            onClick={() => {
              console.log(item);
              updateQuestions([...questions, item]);
            }}
          >
            {disabled ? "已添加" : "添加"}
          </Button>
        </div>
      }
    >
      <ReactMarkdown
        className={styles.reactMarkdown}
        source={item.questions_stem}
      />
      <Collapse bordered={false} style={{ width: "100%" }}>
        <Panel header={"标准答案"}>
          <ReactMarkdown
            className={styles.reactMarkdown}
            source={item.questions_answer}
          />
        </Panel>
      </Collapse>
    </Panel>
  );
}

const mapState = state => ({ allQuestion: state.question.allQuestion });
const mapDispatch = dispatch => ({
  updateExam(payload) {
    dispatch({
      type: "exam/updateExam",
      payload
    });
  },
  getClassData(payload) {
    dispatch({
      type: "question/getClassData",
      payload
    });
  }
});
export default connect(
  mapState,
  mapDispatch
)(ExamEdit);
