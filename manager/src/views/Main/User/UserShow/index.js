import { useEffect} from "react"
import { Tabs, Table } from 'antd';
import { connect } from "dva";
import style from "./index.css"
const { TabPane } = Tabs;
function UserShow(props) {
    const { allUser,
        api_authority,
        identity_api_authority_relation,
        identity_view_authority_relation,
        userIdentity,
        view_authority } = props
    const arr = [
        {
            title: "用户数据",
            columns: [{
                title: '用户',
                dataIndex: 'user_name',
            },
            {
                title: '密码',
                dataIndex: 'user_pwd',
            },
            {
                title: '身份',
                dataIndex: 'identity_text',
            }],
            rowKey:"user_id",
            dataSource:allUser,
        },
        {
            title: "身份数据",
            columns: [{
                title: '身份名称',
                dataIndex: 'identity_text',
            }],
            dataSource: userIdentity,
            rowKey:"identity_id"
        },
        {
            title: "api接口权限",
            columns: [
                {
                    title: "api权限名称",
                    dataIndex: "api_authority_text"
                },
                {
                    title: "api权限url",
                    dataIndex: "api_authority_url",
                },
                {
                    title: "api权限方法",
                    dataIndex: "api_authority_method",
                }
            ],
            dataSource: api_authority,
            rowKey:"api_authority_id"
        },
        {
           title:"身份和api接口关系",
           columns:[
            {
                title: "身份名称",
                dataIndex: "identity_text",
            },
            {
                title: "api权限名称",
                dataIndex: "api_authority_text",
            },
            {
                title: "api权限url",
                dataIndex: "api_authority_url",
            },
            {
                title: "api权限方法",
                dataIndex: "api_authority_method",
            }],
            dataSource:identity_api_authority_relation,
            rowKey:"identity_api_authority_relation_id"
        },
        {
            title: "视图接口权限",
            columns: [{
                title: '视图权限名称',
                dataIndex: 'view_authority_text',
            },
            {
                title:"视图id",
                dataIndex:"view_id"
            }],
            dataSource: view_authority,
            rowKey:"view_authority_id"
        },
        {
            title: "身份和视图权限关系",
            columns: [{
                title: '身份',
                dataIndex: 'identity_text',
            },
            {
                title:"视图名称",
                dataIndex:"view_authority_text"
            },
            {
                title:"视图id",
                dataIndex:"view_id"
            }
        ],
            dataSource: identity_view_authority_relation,
            rowKey:"identity_view_authority_relation_id"
        }
    ]
    useEffect(() => {
        props.getUserData()
    }, [])

    return (
        <div>
            <h2>用户展示</h2>
            <Tabs onChange={(e) => console.log(e)} type="card">
                {
                    arr.map(item => (
                        <TabPane tab={item.title} key={item.title}>
                            <h4>{item.title}</h4>
                            <Table rowKey={item.rowKey} columns={item.columns} dataSource={item.dataSource} size="middle" />
                        </TabPane>
                    ))
                }
                {/* <TabPane tab="用户数据" key="1">
                    <h4>用户数据</h4>
                    <Table rowKey={"user_id"} columns={columns} dataSource={allUser} size="middle" />
                </TabPane>
                <TabPane tab="身份数据" key="2">
                    <h4>身份数据</h4>
                    <Table rowKey={"identity_id"} columns={userIdentitys} dataSource={userIdentity} size="middle" />
                </TabPane>
                <TabPane tab="api接口权限" key="3">
                    <h4>api接口权限</h4>
                    <Table rowKey={"identity_api_authority_relation_id"} columns={api_authoritys} dataSource={api_authority} size="middle" />
                </TabPane>
                <TabPane tab="身份和api接口关系" key="4">
                    <h4>身份和api接口关系</h4>
                    <Table rowKey={"identity_api_authority_relation_id"} columns={identity_api_authority_relations} dataSource={identity_api_authority_relation} size="middle" />
                </TabPane>
                <TabPane tab="视图接口权限" key="5">
                    <h4>视图接口权限</h4>
                    <Table columns={view_authoritys} dataSource={view_authority} size="middle" />
                </TabPane>
                <TabPane tab="身份和视图权限关系" key="6">
                    <h4>身份和视图权限关系</h4>
                    <Table columns={columns} dataSource={data} size="middle" />
                </TabPane> */}
            </Tabs>
        </div>

    )
}
const MapState = state => {
    return {
        ...state.userShow
    }
}
const MapDispatch = dispatch => ({
    getUserData() {
        dispatch({
            type: "userShow/userData"
        })
    }
})
export default connect(MapState, MapDispatch)(UserShow)