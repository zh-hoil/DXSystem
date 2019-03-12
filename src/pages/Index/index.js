import React from "react";
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import "./index.less";

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    componentWillMount() {
        if(localStorage.getItem("username")){
            let username = localStorage.getItem("username");
            let password = localStorage.getItem("password");
            this.setState({
                username, 
                password
            })
        }
    }

    /** 弹框提醒 */
    openNotification = message => {
        notification.open({
            message: message
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /** 发送网络请求登录 */
                console.log(values)
                const { username, password, remember } = values;
                if(username=="zhang"&&password=="123456"){
                    let curUsername = localStorage.getItem("username");
                    let curPassword = localStorage.getItem("password");
                    if(!curUsername){
                        if(remember){
                            localStorage.setItem("username", username);
                            localStorage.setItem("password", password);
                        }
                    }else{
                        if(remember){
                            if(curUsername != username){
                                localStorage.setItem("username", username);
                            }
                            if(curPassword != password){
                                localStorage.setItem("username", username);
                            }
                        }else{
                            localStorage.setItem("username", "");
                            localStorage.setItem("password", "");
                        }
                        
                    }
                    this.openNotification("登录成功")
                }else{
                    this.openNotification("用户名或密码错误")
                }
            }else{
                this.openNotification("请检查您的输入")
            }
        });

        
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="index">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username',
                            {
                                initialValue: this.state.username,
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', 
                            {
                                initialValue: this.state.password,
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码？</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
