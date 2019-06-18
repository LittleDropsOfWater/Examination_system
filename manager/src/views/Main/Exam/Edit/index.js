import React, { useEffect, useState } from "react";
import { connect } from "dva";
import { Layout, Button, Modal, Drawer, List } from "antd";
import Title from "@/components/Title";
import ReactMarkdown from "react-markdown";
import styles from "./index.scss";
import { getExam } from "@/utils/user";

const { Content } = Layout;
const { confirm } = Modal;
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
          {questions.map(({ questions_id, title, question_stem }, index) => (
            <div className={styles.questionsitem} key={questions_id}>
              <h4 className={styles.questionsitemTitle}>
                <span>
                  {index + 1}:{title}
                </span>
                <a onClick={() => showConfirm(title, index)}>删除</a>
              </h4>
              <ReactMarkdown source={question_stem} />
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
        width="400"
        closable={false}
        onClose={() => ChangeDrawerVisible(false)}
        visible={DrawerVisible}
      >
        <List
          size="small"
          dataSource={allQuestion}
          renderItem={item => (
            <List.Item
              onClick={() => {
                updateQuestions([...questions, item]);
              }}
            >
              {item.title}
            </List.Item>
          )}
        />
      </Drawer>
    </Layout>
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
