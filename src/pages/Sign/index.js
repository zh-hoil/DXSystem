import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { Get, Post } from "Public/js/Ajax";
import { SIGNURL } from "Public/js/Api";
import "./index.less";

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password_1: "",
      password_2: ""
    };
  }

  _init = () => {
    document.onkeydown = e => {
      let event = e || window.event;
      if (event.keyCode === 13) {
        this.handleSubmit(event);
      }
    };
  };
  //注册提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /** 发送网络请求登录 */
        const { username, password_1, password_2 } = values;
        if (password_1 !== password_2) {
          message.error("两次密码输入不一致", 1);
        }
        Post(
          SIGNURL,
          { username, password: password_1 },
          res => {
            if (res.code === 200) {
              message.success(res.msg, 0.5, function() {
                // 跳转到登录页面
                window.location.hash = "login";
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
            {getFieldDecorator("password_1", {
              initialValue: this.state.password_1,
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
            {getFieldDecorator("password_2", {
              initialValue: this.state.password_2,
              rules: [{ required: true, message: "请再次输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="确认密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Sign = Form.create({ name: "normal_login" })(Sign);
export default Sign;
