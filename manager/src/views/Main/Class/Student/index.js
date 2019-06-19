import { useEffect, useState } from "react"
import { connect } from "dva"
import style from "./index.css"
import Title from "@/components/Title"
import {
  Layout,
  Button,
  Table,
  Select,
  Input,
  Form,
  Row,
  Col
} from "antd";
const { Content } = Layout;
const { Option } = Select;
function Student(props) {
  const { getFieldDecorator } = props.form;
  const {
    getAllData,
    grade,
    room,
    getStudentData,
    student: reduxStudent,
    deleteStudent
  } = props
  let [student, updateStudent] = useState([])
  useEffect(() => {
    updateStudent(reduxStudent)
  }, [reduxStudent])
  useEffect(() => {
    getAllData()
    getStudentData()
  }, [])
  const columns = [
    {
      title: "姓名",
      dataIndex: "student_name"
    },
    {
      title: "学号",
      dataIndex: "student_id"
    },
    {
      title: "班级",
      dataIndex: "grade_name"
    },
    {
      title: "教室",
      dataIndex: "room_text"
    },
    {
      title: "密码",
      dataIndex: "student_pwd"
    },
    {
      title: '操作',
      dataIndex: '',
      render: (val) => <p onClick={() => {
        deleteStudent({
          id: val.student_id
        })
      }}>删除</p>
    }
  ]
  const handleSubmit = e => { //按条件搜索
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let resut = reduxStudent;
        if (values.username) {
          resut = resut.filter(item => item.student_name === values.username)
        }
        if (values.room) {
          resut = resut.filter(item => item.room_id === values.room)
        }
        if (values.grade) {
          resut = resut.filter(item => item.grade_id === values.grade)
        }
        updateStudent(resut)
      }
    });
  }
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Title>学生管理</Title>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className={style.form} gutter={16}>
            <Col className="gutter-row" span={4}>
              <Form.Item>
                {getFieldDecorator('username', {})(
                  <Input placeholder="请输入学生姓名" />,
                )}
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
              <Form.Item>
                {getFieldDecorator('room', {})(
                  <Select
                    placeholder="请选择教室号"
                  >
                    {
                      room.map(item => (
                        <Option key={item.room_id} value={item.room_id}>{item.room_text}</Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
              <Form.Item>
                {getFieldDecorator('grade', {})(
                  <Select placeholder="班级名">
                    {
                      grade.map(item => (
                        <Option key={item.grade_id} value={item.grade_id}>{item.grade_name}</Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={8}>
              <p className={style.wrap_p}>
                <Button htmlType="submit" type="primary">
                  搜索
                  </Button>
                <Button type="primary" onClick={
                  e => {
                    e.preventDefault();
                    props.form.setFieldsValue({ username: undefined, grade: undefined, room: undefined })
                  }}>
                  重置
                  </Button>
              </p>
            </Col>
          </Row>
        </Form>
        <div>
          <Table
            rowKey={"student_id"}
            columns={columns}
            dataSource={student}
          />
        </div>
      </Content>
    </Layout>
  )
}
const MapState = state => {
  return state.class
}
const MapDispatch = dispatch => ({
  //获取所有数据
  getAllData() {  
    dispatch({
      type: "class/classMsg"
    })
  },
  //获取学生数据
  getStudentData() {
    dispatch({
      type: "class/getStudent"
    })
  },
  //删除学生数据
  deleteStudent(payload) {
    dispatch({
      type: "class/deleteStudent",
      payload
    })
  }
})
export default connect(MapState, MapDispatch)(Form.create()(Student))