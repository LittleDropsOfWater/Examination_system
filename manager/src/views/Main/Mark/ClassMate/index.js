import React, { useEffect,useState } from "react";
import styles from "./index.scss";
import { connect } from "dva";
import { Link } from "dva/router";
import {
  Layout,
  Select,
  Row,
  Col,  
  Button,
  Icon,
  Table,
  Form,
} from "antd";
import Title from "@/components/Title";

const { Content } = Layout;
const { Option } = Select;
const columns = [

  {
    title: "姓名",
    dataIndex: "student_name"
  },
  {
    title: "阅卷状态",
    dataIndex: "status",
    render: status => <span>{status ? "已阅" : "未阅"}</span>
  },
  {
    title: "开始时间",
    dataIndex: "start_time",
    render: text => <>{new Date(+text).toLocaleString()}</>
  },
  {
    title: "结束时间",
    dataIndex: "end_time",
    render: text => <>{new Date(+text).toLocaleString()}</>
  },
  {
    title: "得分",
    dataIndex:'score',
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <Link to={{ pathname: `/mark/paper/detail/${text.exam_student_id}` }}>批卷</Link>
    )
  }
];
function ExamList(props) {
  const { getFieldDecorator } = props.form;
  const {
    Init,
    form,
    searchPapers,
    grade,
    allPapers,
    match: {
      params: { id }
    }
  } = props;

  //查询按钮
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        for (let k in values) {
          if (!values[k]) {
            delete values[k];
          }
        }
          updateGradeId(values.grade_id)
        searchPapers(values);
      }
    });
  }
  //发起初始请求
  useEffect(() => {
    Init({ grade_id: id });
  }, []);
  let [gradeId,updateGradeId]=useState(id);
  //获取当前的班级、考试、教室
  let [curGrade,updateGrade]=useState(grade.find(val=>val.grade_id===gradeId)||{})
  useEffect(()=>{
    updateGrade(grade.find(val=>val.grade_id===gradeId)||{});
  },[grade,gradeId])
  
  return (
    <Layout>
      <Title>试卷列表</Title>
      <Content className="content">
      <Row>
            <Col span={8}>
              班级名：{curGrade.grade_name}
              </Col>
            <Col span={8}>
              课程名：{curGrade.subject_text}
              </Col>
            <Col span={8}>
              教室号：{curGrade.room_text}
              </Col>
            </Row>
      </Content>
      <Content className="content">
        <Form
          onSubmit={handleSubmit}
          labelCol={{
            xs: { span: 24 },
            sm: { span: 8 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
        >
          <Row>
            <Col span={6}>
              <Form.Item label="状态">
                {getFieldDecorator("status", {
                  initialValue: ""
                })(
                  <Select dropdownRender={menu => <div>{menu}</div>}>
                    <Option value="">所有状态</Option>
                    <Option value="0">未阅</Option>
                    <Option value="1">已阅</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="班级">
                {getFieldDecorator("grade_id", {
                  initialValue: id
                })(
                  <Select dropdownRender={menu => <div>{menu}</div>}>
                    <Option key="all" value="">
                      所有班级
                    </Option>
                    {grade.map(({ grade_id, grade_name }) => (
                      <Option key={grade_id} value={grade_id}>
                        {grade_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Button htmlType="submit" type="primary">
                <Icon type="search" />
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
      <Content className="content">
        <div className={styles.tool}>
          <h4>试卷列表</h4>
        </div>
        <Table
          rowKey={"exam_student_id"}
          columns={columns}
          dataSource={allPapers}
        />
      </Content>
    </Layout>
  );
}
const mapState = state => ({
  ...state.exam,
  ...state.question,
  grade: state.class.grade
});
const mapDispatch = dispatch => ({
  Init(payload) {
    dispatch({
      type: "class/grade"
    });
    dispatch({
      type: "exam/getStudentsPapers",
      payload
    });
  },
  searchPapers(payload) {
    dispatch({
      type: "exam/getStudentsPapers",
      payload
    });
  },
  searchExams(payload) {
    dispatch({
      type: "exam/searchExams",
      payload
    });
  }
});
export default connect(
  mapState,
  mapDispatch
)(Form.create({ name: "search_question" })(ExamList));
