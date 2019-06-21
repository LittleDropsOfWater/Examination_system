import { useState, useEffect } from "react";
import { connect } from "dva";
import {
  Layout,
  Slider,
  Button,
  List,
  Tag,
  Divider,
  Modal,
  
} from "antd";
import Title from "@/components/Title";
import styles from "./index.scss";
import ReactMarkdown from "react-markdown";
const { Content} = Layout;
const {confirm} = Modal;  
function PaperDetail(props) {
  const {
    getTheStudentPaper,
    markingTestPaper,
    match: {
      params: { exam_student_id }
    },
    paper={}
  } = props;
  let [questions, updateQuestions] = useState([]);
  let [score, updateScore] = useState(0);

  useEffect(() => {
    updateQuestions(paper.questions);
    updateScore(paper.score);
  }, [paper]);
  useEffect(() => {
    getTheStudentPaper(exam_student_id);
  }, []);
  function showConfirm() {
    confirm({
      title: '确定提交阅卷结果?',
      content: `${paper.student_name}的分数是${score}`,
      okText:'确认',
      cancelText:'取消',
      onOk() {
        console.log({exam_student_id,score});
        markingTestPaper({exam_student_id,score,grade_id:paper.grade_id});
      },
      onCancel() {
      },
    });
  }
  
  return (
    <Layout>
      <Title>阅卷</Title>
      <Content className={styles.content}>
        <Content className={`content ${styles.paper}`}>
          <List
            size="large"
            dataSource={questions}
            itemLayout="vertical"
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <span className={styles.questionsTitle}>
                        {index + 1}:{item.title}
                        <Tag color="blue" style={{ margin: "0 10px" }}>
                          简答题
                        </Tag>
                      </span>
                    </>
                  }
                />
                <ReactMarkdown
                  className={styles.markdown}
                  source={item.questions_stem}
                />
                <div className={styles.paperAnswer}>
                  <div className={styles.answerWrap}>
                    <Divider orientation="left">学生答案</Divider>
                    <ReactMarkdown
                  className={styles.markdown}
                  source={item.student_answer}
                />
                  </div>
                  <div className={styles.answerWrap}>
                    <Divider orientation="left">标准答案</Divider>
                    <ReactMarkdown
                  className={styles.markdown}
                  source={item.questions_answer}
                />
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Content>
        <Content className={styles.sider}>
          <div className={styles.siderContext}>
            <h2>{paper.student_name}</h2>
            <h2>
              得分:<span>{score}</span>
            </h2>
            <Slider value={score} onChange={updateScore} />
            <Button type="primary" onClick={showConfirm}>确定</Button>
          </div>
        </Content>
      </Content>
    </Layout>
  );
}
const mapState = state => ({
  paper: state.exam.thePaper
});
const mapDispatch = dispatch => ({
  getTheStudentPaper(payload) {
    dispatch({
      type: "exam/getTheStudentPaper",
      payload
    });
  },
  markingTestPaper(payload){
    dispatch({
      type:'exam/markingTestPaper',
      payload
    })
  }
});
export default connect(
  mapState,
  mapDispatch
)(PaperDetail);
