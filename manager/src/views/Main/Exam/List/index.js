import React, { useEffect, useState } from "react";
// import style from "./index.css";
import { connect } from "dva";
import { Link } from "dva/router";
import {
  Layout,
  Breadcrumb,
  Select,
  Row,
  Col,
  Button,
  Icon,
  Tag,
  Table,
  Form,
  Empty
} from "antd";
import Title from "@/components/Title";

const { Content } = Layout;
const { Option } = Select;
const columns = [
  {
		title:'试卷信息',
    dataIndex: '',
    key: '',
    render: text => (
    
        <>
          <h4>{text.title}</h4>
          <h4>
            <Tag color="geekblue">{text.subject_text}</Tag>
            <Tag color="gold">{text.exam_name}</Tag>
          </h4>
          <span>{text.user_name}</span>
          <span>发布</span>
        </>
    
    ),
	},
	{
		title:'班级',
		render:text=>(
			<>
			<h5>考试班级</h5>
			<p>
				{text.grade_name.join(' ')}
			</p>
			</>
		)
	},{
		title:'创建人',
		dataIndex:'user_name',
	},{
		title:'开始时间',
		dataIndex:'start_time',
		render:text=>(<>{new Date(+text.start_time).toLocaleString()}</>)
	},{
		title:'结束时间',
		dataIndex:'end_time',
		render:text=>(<>{new Date(+text.end_time).toLocaleString()}</>)

	},
  {
    key: 'action',
    render: (text, record) => (
      <span style={{ position: "absolute", right: 20 }}>
        <Link to={{ pathname: "/edit/questions", search: `id=${text.questions_id}` }}>编辑</Link>
      </span>
    ),
  },
];
function ExamList(props) {
  const { getFieldDecorator } = props.form;
  const {
    examType,
    questions_type,
    subjectType,
    allQuestion,
		getAllType,
		exams
  } = props;
  function handleSubmit() {}
  useEffect(getAllType, []);
  return (
    <Layout>
      <Title>试卷列表</Title>
      <Content className="content">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item>
                考试类型:
                {getFieldDecorator("exam_id", {})(
                  <Select
                    style={{ width: 120 }}
                    dropdownRender={menu => <div>{menu}</div>}
                  >
                    {examType.map(item => (
                      <Option key={item.exam_id} value={item.exam_id}>
                        {item.exam_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                课程:
                {getFieldDecorator("questions_type_id", {})(
                  <Select
                    style={{ width: 120 }}
                    dropdownRender={menu => <div>{menu}</div>}
                  >
                    {subjectType.map(({ subject_id, subject_text }) => (
                      <Option key={subject_id} value={subject_id}>
                        {subject_text}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button htmlType="submit" type="primary">
                <Icon type="search" />
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
			<Content className="content">
				<h4>试卷列表</h4>
				<Table rowKey={"exam_exam_id"}  columns={columns} dataSource={exams} />}
			</Content>
    </Layout>
  );
}
const mapState = state => ({ ...state.exam,...state.question });
const mapDispatch = dispatch => ({
  getAllType() {
    dispatch({
      type: "question/getAllType"
		});
		dispatch({
			type:'exam/getAllExam'
		})
  }
});
export default connect(
  mapState,
  mapDispatch
)(Form.create({ name: "search_question" })(ExamList));
