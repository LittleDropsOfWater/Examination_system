import  { useState,useEffect } from "react";
import { connect } from "dva";
import styles from "./index.css";

import { Input, Form, Button, Checkbox, Icon } from "antd";
const rc = [/[a-z]/, /[A-Z]/, /\d/, /[\x21-\x7e]/, /.{6,}/];
const RegTest=(reg)=>value=>reg.every(val=>val.test(value))
const PassWordRegTest=RegTest(rc)
function LoginPage ({login,form,history,user,user:{code,msg}}){
	useEffect(()=>{
		if(code===-1)return;
		alert(msg)
	},[user])
  const handleSubmit = e => {
		e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
				const {username:user_name,password:user_pwd}=values;
				login({user_name,user_pwd})
				//跳转到home页面
        // history.push('/home')
      }
    });
	};
	
  const validatePassword = (rule, value, callback) => {
    // const form = props.form;
    if (PassWordRegTest(value)) {
      callback();
    } else {
      callback("密码校验失败!密码包含大小写字母、数字、特殊符号");
    }
  };
  
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
                rules: [
                  { required: true, message: "请输入你的密码!" },
                  {
                    validator: validatePassword
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

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	login(payload){
		dispatch({
			type:'user/login',
			payload
		})
	}
});
export default Form.create({ name: "normal_login" })(connect( mapStateToProps,
  mapDispatchToProps)(LoginPage));