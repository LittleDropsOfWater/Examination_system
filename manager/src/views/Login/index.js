import { useEffect } from "react";
import { connect } from "dva";
import styles from "./index.css";
import { injectIntl } from "react-intl";
import { Input, Form, Button, Checkbox, Icon, message } from "antd";
import LocaleDropdown from '@/components/LocaleDropdown';
function LoginPage({ login, form, history, match, location,code, msg,intl:{formatMessage}  }) {
  //判断是否登陆
  useEffect(() => {
    if (code === -1) return;
    console.log('loginPage-Code',code,msg)
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
        <div className={styles.floatButton}>
        <LocaleDropdown/>
        </div>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: formatMessage({id:'router.login.userErrorMsg'}) }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                }
                placeholder={formatMessage({id:'router.login.userMsg'})}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              validateTrigger:'onBlur',
              rules: [
                { required: true, message: formatMessage({id:'router.login.passwordErrorMsg.required'}) },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[1-9])(?=.*[\W]).{6,}$/,
                  message: formatMessage({id:'router.login.passwordErrorMsg.pattern'}) 
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.65)" }} />
                }
                type="password"
                placeholder={formatMessage({id:'router.login.passwordMsg'})}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>{formatMessage({id:'router.login.rememberPassword'})}</Checkbox>)}
            <a className={styles["login-form-forgot"]} href="">
            {formatMessage({id:'router.login.forgetPassword'})}
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-form-button"]}
              size="large"
            >
              {formatMessage({id:'router.login.loginButton'})}
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

export default injectIntl(Form.create({ name: "normal_login" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
));
