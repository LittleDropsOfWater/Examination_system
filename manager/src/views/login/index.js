import React, { useEffect } from 'react';
import { connect } from 'dva';
import style from "./index.css"
import { Form, Icon, Input, Button, Checkbox, message } from "antd"
function Login(props) {

  //判断是否登录
  useEffect(() => {
    console.log(props)
    if (props.isLogin === 1) {
      message.success('登陆成功');
      //登录成功
      let pathName = decodeURIComponent(props.history.location.search.split('=')[1]);
      props.history.replace(pathName);
    }else if(props.isLogin===-1){
     //登陆失败
     message.error('登陆失败');
    }
  }, [props.isLogin]);
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { login } = props
        login({
          user_name: values.username,
          user_pwd: values.password
        });
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <div className={style.wrap}>
      <div className={style.login}>
        <Form onSubmit={handleSubmit} className={style.login_form}>
          <Form.Item>
            {getFieldDecorator('username', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '请输入正确的用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [{ pattern: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).*$/, message: '密码格式不正确!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className={style.login_form_forgot} href="">
              忘记密码
          </a>
            <Button type="primary" htmlType="submit" className={style.login_form_button}>
              登录
          </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)
const MapState = state => {
  return {
    ...state.user
  }
}
const MapDispatch = dispatch => ({
  login(payload) {
    dispatch({
      type: "user/login",
      payload
    })
  }
})
export default connect(MapState, MapDispatch)(WrappedNormalLoginForm);




