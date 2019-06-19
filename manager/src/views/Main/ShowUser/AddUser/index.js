import { useEffect, useState } from "react"
import { Layout, Radio, Form, Select, Input, Button, message } from 'antd';
import { connect } from "dva"
import Title from "@/components/Title"
import style from "./index.css"
const { Content } = Layout
function AddUser(props) {
    const { allUser,
        userIdentity,
        view_authority,
        api_authority,
        identity_view_authority_relation,
        msg,
        AddUser, //添加用户,
        UpdateUser,
        AddIdentity,
        Addapi_authority,
        setIdentityApi,
        setIdentityView,
        addView_authority
    } = props;
    const { getFieldDecorator } = props.form;
    const { Option } = Select;
    let [show, upshow] = useState(false);
    useEffect(() => {
        props.getUserData()
    }, [])
    useEffect(() => {
        if (msg.code === -1) return
        if (msg.code === 1) {
            message.success(msg.msg);
        } else if (msg.code === 0) {
            message.error(msg.msg);
        }
    }, [msg])
    function onChange(e) {
        e.target.value === "updateUser" ? upshow(true) : upshow(false)
    }
    return (
        <Layout style={{ padding: '0 24px 20px' }}>
            <Title>添加用户</Title>
            <Content
                className={style.content}
                style={{
                    background: '#f0f2f5',
                    padding: 0,
                    margin: 0,
                    minHeight: 200,
                }}
            >
                <div className={style.app}>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    if (values.user_id) {
                                        UpdateUser({
                                            "user_id": values.user_id,
                                            "user_name": values.user_name,
                                            "user_pwd": values.user_pwd,
                                            "identity_id": values.identity_id
                                        })
                                    } else {
                                        AddUser({
                                            "user_name": values.user_name,
                                            "user_pwd": values.user_pwd
                                        })
                                    }
                                }
                            });
                        }}>
                            <Radio.Group onChange={onChange} defaultValue="addUser">
                                <Radio.Button value="addUser">添加用户</Radio.Button>
                                <Radio.Button value="updateUser">更新用户</Radio.Button>
                            </Radio.Group>
                            {show && <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('user_id', {})(
                                    <Select placeholder="请选择身份id" style={{ width: 150 }}>
                                        {
                                            allUser.map(item => (
                                                <Option key={item.user_id} value={item.user_id}>{item.user_name}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>}
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('user_name', {})(
                                    <Input placeholder="请输入用户名" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('user_pwd', {})(
                                    <Input type="password" placeholder="请输入密码" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('identity_id', {})(
                                    <Select placeholder="请选择身份id" style={{ width: 150 }}>
                                        {
                                            userIdentity.map(item => (
                                                <Option key={item.identity_id} value={item.identity_id}>{item.identity_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                        确定
                                    </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            let val = show ? { user_name: undefined, user_pwd: undefined, identity_id: undefined, user_id: undefined } : { user_name: undefined, user_pwd: undefined, identity_id: undefined }
                                            props.form.setFieldsValue(val)
                                        }}>
                                        重置
                                </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    AddIdentity({
                                        identity_text: values.identity_text
                                    })
                                }
                            });
                        }}>
                            <Radio.Group defaultValue="addUser">
                                <Radio.Button value="addUser">添加身份</Radio.Button>
                            </Radio.Group>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('identity_text', {})(
                                    <Input placeholder="请输入身份名称" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                       确定
                                   </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            props.form.setFieldsValue({ identity_text: undefined })
                                        }}>
                                        重置
                                </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    Addapi_authority({
                                        api_authority_text: values.api_authority_text,
                                        api_authority_url: values.api_authority_url,
                                        api_authority_method: values.api_authority_mehtod
                                    })
                                }
                            });
                        }}>
                            <Radio.Group defaultValue="addUser">
                                <Radio.Button value="addUser">添加api接口权限</Radio.Button>
                            </Radio.Group>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_authority_text', {})(
                                    <Input placeholder="请输入api接口名称" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_authority_url', {})(
                                    <Input placeholder="请输入api接口权限url" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_authority_mehtod', {})(
                                    <Input placeholder="请输入api接口权限方法" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                       确定
                                   </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            props.form.setFieldsValue({ api_authority_text: undefined, api_authority_url: undefined, api_authority_mehtod: undefined })
                                        }}>
                                        重置
                                </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    let val = view_authority.find(item => item.view_authority_id === values.view_authority_id)
                                    addView_authority({
                                        view_authority_text: val.view_authority_text,
                                        view_id: val.view_id
                                    })
                                }
                            });
                        }}>
                            <Radio.Group defaultValue="addUser">
                                <Radio.Button value="addUser">添加视图接口权限</Radio.Button>
                            </Radio.Group>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('view_authority_id', {})(
                                    <Select placeholder="请选择已有视图" style={{ width: 150 }}>
                                        {
                                            view_authority.map(item => (
                                                <Option key={item.view_authority_id} value={item.view_authority_id}>{item.view_authority_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                       确定
                                    </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            props.form.setFieldsValue({ view_authority_id: undefined })
                                        }}>
                                        重置
                                    </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    setIdentityApi({
                                        identity_id: values.api_identity_id,
                                        api_authority_id: values.api_authority_id
                                    })
                                }
                            });
                        }}>
                            <Radio.Group defaultValue="addUser">
                                <Radio.Button value="addUser">给身份设置api权限</Radio.Button>
                            </Radio.Group>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_identity_id', {})(
                                    <Select placeholder="请选择身份id" style={{ width: 150 }}>
                                        {
                                            userIdentity.map(item => (
                                                <Option key={item.identity_id} value={item.identity_id}>{item.identity_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_authority_id', {})(
                                    <Select placeholder="请选择api接口权限" style={{ width: 150 }}>
                                        {
                                            api_authority.map(item => (
                                                <Option key={item.api_authority_id} value={item.api_authority_id}>{item.api_authority_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                       确定
                                    </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            props.form.setFieldsValue({ api_identity_id: undefined, api_authority_id: undefined })
                                        }}>
                                        重置
                                    </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={style.wrap}>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            props.form.validateFields((err, values) => {
                                if (!err) {
                                    setIdentityView({
                                        identity_id: values.view_identity_id,
                                        view_authority_id: values.api_view_authority_id
                                    })
                                }
                            });
                        }}>
                            <Radio.Group defaultValue="addUser">
                                <Radio.Button value="addUser">给身份设置视图权限</Radio.Button>
                            </Radio.Group>
                            <Form.Item style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('view_identity_id', {})(
                                    <Select placeholder="请选择身份id" style={{ width: 150 }}>
                                        {
                                            userIdentity.map(item => (
                                                <Option key={item.identity_id} value={item.identity_id}>{item.identity_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                style={{ margin: 0, marginTop: "10px" }}>
                                {getFieldDecorator('api_view_authority_id', {})(
                                    <Select placeholder="请选择视图权限id" style={{ width: 150 }}>
                                        {
                                            identity_view_authority_relation.map(item => (
                                                <Option key={item.identity_view_authority_relation_id} value={item.identity_view_authority_relation_id}>{item.view_authority_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item >
                                <p className={style.wrap_p}>
                                    <Button htmlType="submit" type="primary">
                                        确定
                                    </Button>
                                    <Button htmlType="submit" onClick={
                                        e => {
                                            e.preventDefault();
                                            props.form.setFieldsValue({ api_view_authority_id: undefined, view_identity_id: undefined })
                                        }}>
                                        重置
                                    </Button>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>
    )
};
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
    },
    //添加用户
    AddUser(payload) {
        dispatch({
            type: "userShow/addUser",
            payload
        })
    },
    //更新用户
    UpdateUser(payload) {
        dispatch({
            type: "userShow/updateUser",
            payload
        })
    },
    //添加身份
    AddIdentity(payload) {
        dispatch({
            type: "userShow/addIdentity",
            payload
        })
    },
    //添加api接口权限
    Addapi_authority(payload) {
        dispatch({
            type: "userShow/api_authority",
            payload
        })
    },
    //给身份设置api权限
    setIdentityApi(payload) {
        dispatch({
            type: "userShow/IdentityApi",
            payload
        })
    },
    //给身份设定视图权限
    setIdentityView(payload) {
        dispatch({
            type: "userShow/IdentityView",
            payload
        })
    },
    //添加视图接口
    addView_authority(payload) {
        dispatch({
            type: "userShow/view_authority",
            payload
        })
    }
})
export default connect(MapState, MapDispatch)(Form.create()(AddUser))