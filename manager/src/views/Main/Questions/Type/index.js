import React, { useState, useEffect } from "react";
import { connect } from "dva";
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
const { success, error } = message;
function Type(props) {
  const { addQuestionsType, questions_type, typeCode } = props;
  const [DialogVisible, setDialogVisible] = useState(false);
  //弹框中的输入框
  const [iptValue, setIptValue] = useState("");
  const IptValueChange = e => setIptValue(e.target.value);
  const IptPlaceholder = "请输入新类型";
  const showModal = () => {
    setDialogVisible(true);
  };
  const handleOk = e => {
    addQuestionsType({
      text: iptValue,
      sort: questions_type.length + 1
    });
    setDialogVisible(false);
  };
  const handleCancel = e => {
    setIptValue("");
    setDialogVisible(false);
  };
  const columns = [
    {
      title: "类型ID",
      dataIndex: "questions_type_id"
    },
    {
      title: "类型名称",
      dataIndex: "questions_type_text"
    },
    {
      title: "操作",
      dataIndex: "操作"
    }
  ];
  useEffect(() => {
    props.getQuestionsType();
  }, []);
  useEffect(() => {
    setIptValue('');
  }, [questions_type]);
  useEffect(() => {
    if (typeCode === -1) return;
    if (typeCode) {
      success('添加成功')
    } else {
      error('添加失败')
    }
  }, [typeCode])
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Title>试题分类</Title>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <Button type="primary" onClick={showModal}>
          <Icon type="plus" />
          添加类型
        </Button>
        <div>
          <Table
            rowKey={"questions_type_id"}
            columns={columns}
            dataSource={questions_type}
          />
        </div>
      </Content>
      <Modal
        title="添加试题类型"
        visible={DialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={iptValue}
          onChange={IptValueChange}
          placeholder={IptPlaceholder}
        />
      </Modal>
    </Layout>
  );
}
const MapState = state => {
  return {
    ...state.question
  };
};
const MapDispatch = dispatch => ({
  getQuestionsType() {
    dispatch({
      type: "question/getQuestionsType"
    });
  },
  addQuestionsType(payload) {
    dispatch({
      type: "question/addQuestionsType",
      payload
    });
  }
});
export default Form.create({ name: 'addQuestionsType' })(connect(
  MapState,
  MapDispatch
)(Type));
