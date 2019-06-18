import { useEffect } from "react"
import { connect } from "dva"
import style from "./index.css"
import Title from "@/components/Title"
import {
  Layout,
  Button,
  Icon,
  Table,
  Select,
  Input,
  message,
  Form,
  Row,
  Col
} from "antd";
const { Content } = Layout;
const { Option } = Select;
function Student(props) {
  const { getFieldDecorator } = props.form;
  useEffect(() => {

  }, [])
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
        <Form >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="请输入学生姓名" />,
                )}
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item>
                {getFieldDecorator('room', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Select
                    placeholder="请选择教室号"
                  >
                    <Option value="jack">Jack</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item>
                {getFieldDecorator('grade', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Select
                    // showSearch
                    // style={{ width: 100% }}
                    placeholder="班级名"
                  >
                    <Option value="jack">Jack</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col className='gutter-row'  span={6}>
              <p className={style.wrap_p}>
              <Button htmlType="submit" type="primary">
                    搜索
                  </Button>
                  <Button type="primary" onClick={
                    e => {
                      e.preventDefault();
                      props.form.setFieldsValue({ view_authority_text: '' })
                    }}>
                    重置
                  </Button>
              </p>
                  
            </Col>
          </Row>

        </Form>

        {/* <div>
          <Table
            rowKey={"room_id"}
            columns={columns}
            dataSource={room}
          />
        </div> */}
      </Content>
    </Layout>
  )
}
const MapState = state => {
  return state.class
}
const MapDispatch = dispatch => ({

})
export default connect(MapState, MapDispatch)(Form.create()(Student))