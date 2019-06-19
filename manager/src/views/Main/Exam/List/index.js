import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import { connect } from "dva";
import { Link } from "dva/router";
import moment from 'moment';
import {
  Layout,
  Select,
  Row,
  Col,
  Button,
  Icon,
  Tag,
  Table,
  Form,
  Radio 
} from "antd";
import Title from "@/components/Title";

const { Content } = Layout;
const { Option } = Select;
const columns = [
  {
		title:'试卷信息',
    dataIndex: '',
    key: '',
    render: text => {
      let time=moment(text.end_time-text.start_time);
      return ((
        <>
          <h4>{text.title}</h4>
          <h4>
            <Tag color="geekblue">{text.subject_text}</Tag>
            <Tag color="gold">{text.exam_name}</Tag>
          </h4>
          <h4>题量:{text.number}道题</h4>
          <h4>考试时间:{time.hours()}小时
          {time.minutes()}分钟
          </h4>
        </>
    ))
    },
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
		render:text=>(<>{new Date(+text).toLocaleString()}</>)
	},{
		title:'结束时间',
		dataIndex:'end_time',
		render:text=>(<>{new Date(+text).toLocaleString()}</>)

	},
  {
		title:'操作',
    key: 'action',
    render: (text, record) => (
        <Link to={{ pathname: `/exam/detail/${text.exam_exam_id}`, params:{id:text.exam_exam_id} }}>详情</Link>
    ),
  },
];
function ExamList(props) {
  const { getFieldDecorator } = props.form;
  const {
    examType,
    subjectType,
		getAllType,
    exams,
    form,
    searchExams
  } = props;
  let[radioValue,ChangeRadioValue]=useState(-1)
  let[currentExams,ChangeCurrentExams]=useState(exams)
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if(!err){
        for(let k in values){
          if(!values[k]){
            delete values[k]
          }
        }
        searchExams(values);
      }
  
    });
  }
  function TabChange(e){
    const value=e.target.value;
    ChangeRadioValue(value);
    if(value===-1){
      ChangeCurrentExams(exams)
    }else{
      ChangeCurrentExams(exams.filter(val=>val.status===value));

    }
  }
  useEffect(getAllType, []);
  useEffect(()=>{
    ChangeCurrentExams(exams)
  }, [exams]);
  return (
    <Layout>
      <Title>试卷列表</Title>
      <Content className="content">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item>
                考试类型:
                {getFieldDecorator("exam_type", {
                  initialValue:'',
                })(
                  <Select
                    style={{ width: 120 }}
                    dropdownRender={menu => <div>{menu}</div>}
                  >
                    <Option key='all' value=''>
                        所有类型
                      </Option>
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
                {getFieldDecorator("subject_id", {
                  initialValue:'',
                })(
                  <Select
                    style={{ width: 180 }}
                    dropdownRender={menu => <div>{menu}</div>}
                  >
                         <Option key='all' value=''>
                        所有课程
                      </Option>
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
        <div className={styles.tool}>
				<h4>试卷列表</h4>
        <Radio.Group value={radioValue} onChange={TabChange} style={{ marginBottom: 16 }}>
          <Radio.Button value={-1}>全部</Radio.Button>
          <Radio.Button value={1}>进行中</Radio.Button>
          <Radio.Button value={2}>已结束</Radio.Button>
        </Radio.Group>

        </div>
				<Table rowKey={"exam_exam_id"}  columns={columns} dataSource={currentExams} />
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
  },
  searchExams(payload){
    dispatch({
      type:'exam/searchExams',
      payload
    })
  }

});
export default connect(
  mapState,
  mapDispatch
)(Form.create({ name: "search_question" })(ExamList));
