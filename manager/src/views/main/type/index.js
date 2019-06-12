import React, { useEffect } from "react"
import { connect } from "dva"
import { Layout, Breadcrumb, Button, Icon, Table } from 'antd';
const { Content } = Layout;

function ClassIfy(props) {
    useEffect(() => {
        props.classIfyGetData()
    }, [])

    const columns = [
        {
          title: '类型ID',
          dataIndex: 'questions_type_id',
        },
        {
          title: '类型名称',
          dataIndex: 'questions_type_text',
        },
        {
          title: '操作',
          dataIndex: '操作',
        },
      ];
      const data = props.classData;
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
                <Button type="primary">
                    <Icon type="plus" />添加类型
        </Button>
                <div>
                <Table columns={columns} dataSource={data} />,
                </div>,
        </Content>
        </Layout>

    )
}
const MapState = state => {
    return {
        ...state.class
    }
}
const MapDispatch = dispatch => ({
    classIfyGetData() {
        dispatch({
            type: "class/classGetData",
        })
    }
})
export default connect(MapState, MapDispatch)(ClassIfy)