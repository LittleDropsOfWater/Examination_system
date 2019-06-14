import { useEffect } from "react";
import { connect } from "dva";
import styles from "./index.css";
import { Input, Form, Button, Checkbox, Icon, message } from "antd";

function LoginPage({ login, form, history, match, location,code, msg  }) {
  //判断是否登陆
  useEffect(() => {
    if (code === -1) return;
    if (code) {
      //1.提示登录成功
      message.success(msg);
      //2存储cookie
      //3.跳转到home页面
      let pathName=location.search.split('=')[1]||'/';
      history.replace(decodeURIComponent(pathName));
    } else {
      //登陆失败
      message.error(msg);
    }
  }, [code,msg]);
  //处理表单提交
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //调登录接口
        login({
          user_name: values.username,
          user_pwd: values.password
        });
      }
    });
  };

  //表单校验
  const { getFieldDecorator } = form;

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <Form onSubmit={handleSubmit} className={styles["login-form"]}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入你的用户名!" }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              validateTrigger:'onBlur',
              rules: [
                { required: true, message: "请输入你的密码!" },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[1-9])(?=.*[\W]).{6,}$/,
                  message: "密码校验失败!密码包含大小写字母、数字、特殊符号"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.65)" }} />
                }
                type="password"
                placeholder="请输入用户密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a className={styles["login-form-forgot"]} href="">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-form-button"]}
              size="large"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({...state.user});
const mapDispatchToProps = dispatch => ({
  login(payload) {
    dispatch({
      type: "user/login",
      payload
    });
  }
});
export default Form.create({ name: "normal_login" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
