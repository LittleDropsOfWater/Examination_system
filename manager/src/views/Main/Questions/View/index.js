import React,{useEffect} from "react";
import style from "./index.css";
import {connect} from "dva";
import { Layout, Breadcrumb, Select, Row, Col, Button, Icon, Tag ,Table} from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { CheckableTag } = Tag;
const columns = [
    {
      dataIndex: '',
      key: '', 
      render: text => (
        <>
            <h4>{text.title}</h4>
            <h4>
                <Tag color="blue">{text.questions_type_text}</Tag>
                <Tag color="geekblue">{text.subject_text}</Tag>
                <Tag color="gold">{text.exam_name}</Tag>
            </h4>
            <a href="">{text.user_name}</a>
            <a href="">发布</a>
        </>
      ),
    },
    {
      key: 'action',
      render: (text, record) => (
        <span style={{position:"absolute",right:20}}>
          <a href="">编辑</a>
        </span>
      ),
    },
  ];
function Look(props) {
   useEffect(()=>{
    props.getExamClass();
    props.getAllCourse();
    props.getAllExam();
    props.getCourseClass()
   },[])
   console.log(props)
   const {examType,questions_type,subjectType,allQuestion}=props;

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>试题分类</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <Row className={style.row}>
                    <Col span={3}>课程类型:</Col>
                    <Col span={21}>
                        <div>
                           {
                             subjectType.map(item=>(
                              <MyTag key={item.subject_id}>{item.subject_text}</MyTag>
                             ))
                           }   
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ span: 6, offset: 2 }} span={8}>
                        考试类型:<Select
                            defaultValue=""
                            style={{ width: 120 }}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                </div>
                            )}
                        >
                          {
                            examType.map(item=>(
                              <Option key={item.exam_id} value={item.exam_id}>{item.exam_name}</Option>
                            ))
                          } 
                        </Select>
                    </Col>
                    <Col span={8}>题目类型:<Select
                        defaultValue=""
                        style={{ width: 120 }}
                        dropdownRender={menu => (
                            <div>
                                {menu}
                            </div>
                        )}
                    >
                      {
                        questions_type.map(item=>(
                          <Option key={item.questions_type_id} value={item.questions_type_id}>{item.questions_type_text}</Option>
                        ))
                      }   
                    </Select></Col>
                    <Col span={8}>
                        <Button className={style.btn} type="primary">
                            <Icon type="search" />查询
                        </Button>
                    </Col>
                </Row>
                <Table rowKey={"questions_id"} className={style.table} columns={columns} dataSource={allQuestion} />
            </Content>

            
        </Layout>
    )
}
class MyTag extends React.Component {
    state = { checked: false };
  
    handleChange = checked => {
      this.setState({ checked });
    };
  
    render() {
      return (
        <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
      );
    }
  }
 const MapState=state=>{
   return {
     ...state.question
   }
 }
 const MapDispatch=dispatch=>({
   //获取所有考试类型
  getExamClass(){
    dispatch({
      type:"question/getExamType",
    })
  },
  //获取所有课程
  getAllCourse(){
    dispatch({
      type:"question/getSubject",
    })
  },
  //所有题目
  getAllExam(){
    dispatch({
      type:"question/getAllquestion"
    })
  },
  //所有题目类型
  getCourseClass(){
    dispatch({
      type:"question/getQuestionsType",
    })

  }
 })
export default connect(MapState,MapDispatch)(Look)