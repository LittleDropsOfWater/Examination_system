import { useEffect, useState } from "react"
import { connect } from "dva"
import Title from "@/components/Title"
import {
  Layout,
  Button,
  Icon,
  Table,
  Modal,
  Input,
  message,
  Form,
  Select

} from "antd";
const { Content } = Layout;
const { Option } = Select;
const { success, error } = message;
// const columns = [
//   {
//     title: "班级名",
//     dataIndex: "grade_name"
//   },
//   {
//     title: "课程名",
//     dataIndex: "subject_text"
//   },
//   {
//     title: "教室号",
//     dataIndex: "room_text"
//   },
//   {
//     title: "操作",
//     dataIndex: "操作"
//   }
// ];
const columns = [
  { title: '班级名', dataIndex: 'grade_name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="javascript:;">Delete</a>,
  },
];
function Grade(props) {
  const [DialogVisible, setDialogVisible] = useState(false);
  const { getGrade,
    grade,
    getSubject,
    getRoom,
    room,
    subjectType,
    addGrade,
    msg
  } = props
  useEffect(() => {
    getGrade()
    getRoom()
    getSubject()
  }, [])
  useEffect(()=>{
    if(msg.code===1){
      message.success(msg.msg);
    }else if(msg.code===0){
      message.error(msg.msg);
    }
  },[msg])
  const handleCancel = e => {
    setDialogVisible(false);
  };
  const handleOk = (e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          addGrade({
            grade_name:values.grade_name,
            room_id:values.room_id,
            subject_id:values.subject_id
          })
          setDialogVisible(false)
        }
      });
    };
  const { getFieldDecorator } = props.form;
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Title>班级管理</Title>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <Button type="primary" onClick={() => setDialogVisible(true)}>
          <Icon type="plus" />
          添加班级
        </Button>
        <div>
          <Table
            rowKey={"grade_id"}
            columns={columns}
            dataSource={grade}
          />
        </div>
        ,
      </Content>
      <Modal
        title="添加班级"
        visible={DialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="班级名">
            {getFieldDecorator('grade_name', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(<Input placeholder="班级名" />)}
          </Form.Item>
          <Form.Item label="教室号">
            {getFieldDecorator('room_id', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(
              <Select style={{ width: '100%' }} placeholder="教室号">
                {
                  room.map(item => (
                    <Option key={item.room_id} value={item.room_id}>{item.room_text}</Option>
                  ))
                }
              </Select>)}
          </Form.Item>
          <Form.Item label="课程名">
            {getFieldDecorator('subject_id', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(
              <Select style={{ width: '100%' }} placeholder="课程名">
                {
                  subjectType.map(item => (
                    <Option key={item.subject_id} value={item.subject_id}>{item.subject_text}</Option>
                  ))
                }
              </Select>)}
          </Form.Item>
        </Form>

      </Modal>
    </Layout>
  )
}
const MapState = state => {
  return {
    ...state.class,
    ...state.question
  }
}
const MapDispatch = dispatch => ({
  getGrade() {
    dispatch({
      type: "class/grade"
    })
  },
  //获取课程
  getSubject() {
    dispatch({
      type: "question/getSubject"
    })
  },
  //获取教室号
  getRoom() {
    dispatch({
      type: "class/room"
    })
  },
  //添加班级
  addGrade(payload){
    dispatch({
      type:"class/addGrode",
      payload
    })
  }

})
export default connect(MapState, MapDispatch)(Form.create()(Grade))