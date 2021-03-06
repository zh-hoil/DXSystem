import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { Get, Post } from "Public/js/Ajax";
import { LOGINURL } from "Public/js/Api";
import "./index.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  _init = () => {
    document.onkeydown = e => {
      let event = e || window.event;
      if (event.keyCode === 13) {
        this.handleSubmit(event);
      }
    };
    if (localStorage.getItem("username")) {
      let username = localStorage.getItem("username");
      let password = localStorage.getItem("password");
      this.setState({
        username,
        password
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /** 发送网络请求登录 */
        const { username, password, remember } = values;
        Post(
          LOGINURL,
          { username, password, remember },
          res => {
            if (res.code === 200) {
              message.success(res.msg, 0.5, function() {
                // 跳转到首页
                window.location.hash = "home";
              });
            } else if (res.code === 201) {
              message.err(res.msg, function() {
                // 跳转到注册页
                window.location.hash = "sign";
              });
            } else {
              message.error(res.msg);
            }
          },
          err => {
            message.error(err.msg);
          }
        );
      } else {
        message.info("请检查您的输入", 1);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="index">
        <header>欢迎使用党员数据管理系统</header>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              initialValue: this.state.username,
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              initialValue: this.state.password,
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住我</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login = Form.create({ name: "normal_login" })(Login);
export default Login;
