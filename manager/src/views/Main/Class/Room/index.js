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
} from "antd";
const { Content } = Layout;
function Room(props) {
  const [DialogVisible, setDialogVisible] = useState(false);
  const { getFieldDecorator } = props.form;
  const {
    getRoom,
    room,
    deleteRoom,
    msg,
    addRoom
  } = props
  
  useEffect(() => {
    getRoom()
  }, [])
  useEffect(() => {
    if (msg.code === -1) return
    if (msg.code === 1) {
      message.success(msg.msg);
    } else if (msg.code === 0) {
      message.error(msg.msg);
    }
  }, [msg])
  const handleCancel = () => {
    setDialogVisible(false)
  }
  const handleOk = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        addRoom({
          room_text: values.room_text
        })
        setDialogVisible(false)
      }
    });
  }
  const columns = [
    {
      title: "教室号",
      dataIndex: "room_text"
    },
    {
      title: '操作',
      dataIndex: '',
      render: (val) => <p onClick={() => {
        deleteRoom({
          room_id: val.room_id
        })
      }}>删除</p>
    }
  ]
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Title>教室管理</Title>
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
          添加教室
        </Button>
        <div>
          <Table
            rowKey={"room_id"}
            columns={columns}
            dataSource={room}
          />
        </div>
      </Content>
      <Modal
        title="添加班级"
        visible={DialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="教室名">
            {getFieldDecorator('room_text', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(<Input placeholder="教室名" />)}
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
const MapState = state => {
  return state.class
}
const MapDispatch = dispatch => ({
  //获取教室号
  getRoom() {
    dispatch({
      type: "class/room"
    })
  },
  //删除教室
  deleteRoom(payload) {
    dispatch({
      type: "class/deleteRoom",
      payload
    })
  },
  //添加教室
  addRoom(payload) {
    dispatch({
      type: "class/addRoom",
      payload
    })
  }
})
export default connect(MapState, MapDispatch)(Form.create()(Room))