import React, { useEffect, useState } from "react";
import style from "./index.css";
import { connect } from "dva";
import { Link } from "dva/router"
import Title from '@/components/Title'
import { injectIntl } from "react-intl";

import { Layout, Select, Row, Col, Button, Icon, Tag, Table, Form, Empty } from 'antd';
const { Content } = Layout;
const { Option } = Select;
const columns = [
  {
    dataIndex: '',
    key: '',
    render: text => (
      <Link to={{ pathname: `/questions/detail/${text.questions_id}`, params: {id:text.questions_id} }}>
        <>
          <h4>{text.title}</h4>
          <h4>
            <Tag color="blue">{text.questions_type_text}</Tag>
            <Tag color="geekblue">{text.subject_text}</Tag>
            <Tag color="gold">{text.exam_name}</Tag>
          </h4>
          <span>{text.user_name}</span>
          <span>发布</span>
        </>
      </Link>
    ),
  },
  {
    key: 'action',
    render: (text, record) => (
      <span style={{ position: "absolute", right: 20 }}>
        <Link to={{ pathname: `/questions/edit/${text.questions_id}`, params:{id:text.questions_id}}}>编辑</Link>
      </span>
    ),
  },
];
function Options(data=[],value,text){
  if(!(Array.isArray(data))&&value&&text){return null;}
  return ( data.map(item => (
    <Option key={item[value]} value={item[value]}>{item[text]}</Option>
  )))
}
function View(props) {
  const { getFieldDecorator } = props.form
  const { examType, 
    questions_type, 
    subjectType, 
    allQuestion,
    getClassData,
    intl: { formatMessage }
  } = props;
  let [ind, updataInd] = useState(-1)
  useEffect(() => {
    props.getExamClass();
    props.getAllCourse();
    props.getAllExam();
    props.getCourseClass()
  }, [])

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let payload = {
          questions_type_id: values.questions_type_id,
          exam_id: values.exam_id
        }
        if (ind !== -1) {
          payload.subject_id = subjectType[ind].subject_id
        }
        getClassData(payload)
      }
    });
  };
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
        <Title>{formatMessage({ id: "router.questions.view" })}</Title>
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 180,
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className={style.row}>
            <Col span={3}>课程类型:</Col>
            <Col span={21}>
              <div>
                <Tag color={ind === -1 ? "blue" : null} onClick={() => updataInd(-1)}>All</Tag>
                {
                  subjectType.map((item, index) => (
                    <Tag onClick={() => updataInd(index)} color={ind === index ? "blue" : null} className={style.tag} key={item.subject_id}>{item.subject_text}</Tag>
                  ))
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item>
                考试类型:
                {getFieldDecorator('exam_id', {})(
                  <Select
                    style={{ width: 120 }}
                    dropdownRender={menu => (
                      <div>
                        {menu}
                      </div>
                    )}
                  >
                    {Options(examType,'exam_id','exam_name')}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>题目类型:
                {getFieldDecorator('questions_type_id', {})(
                <Select
                  style={{ width: 120 }}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                    </div>
                  )}
                >
                  {
                    Options(questions_type,'questions_type_id','questions_type_text')
                  }
                </Select>
              )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button className={style.btn} htmlType="submit" type="primary">
                <Icon type="search" />查询
              </Button>
            </Col>
          </Row>
        </Form>
        {allQuestion.length === 0 ? <Empty /> : <Table rowKey={"questions_id"} className={style.table} columns={columns} dataSource={allQuestion} />}
      </Content>
    </Layout>
  )
}
const MapState = state => {
  return {
    ...state.question
  }
}
const MapDispatch = dispatch => ({
  //获取所有考试类型
  getExamClass() {
    dispatch({
      type: "question/getExamType",
    })
  },
  //获取所有课程
  getAllCourse() {
    dispatch({
      type: "question/getSubject",
    })
  },
  //所有题目
  getAllExam() {
    dispatch({
      type: "question/getAllquestion"
    })
  },
  //所有题目类型
  getCourseClass() {
    dispatch({
      type: "question/getQuestionsType",
    })
  },
  //按条件查询
  getClassData(payload) {
    dispatch({
      type: "question/getClassData",
      payload,
    })
  }
})
export default injectIntl(connect(MapState, MapDispatch)(Form.create({ name: "search_question" })(View)))