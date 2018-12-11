import React from "react";
import "./index.less";
import PropTypes from "prop-types";
import { userId, Get, Post } from "Public/js/Ajax";
import { Toast } from "antd-mobile";

const LIKETOPICURL = "/likeTopic"; //主题点赞接口
class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
        console.log(this.props)
    }

    handleFollow() {

        Post(LIKETOPICURL, {
            userId: userId,
            themeId: this.state.themeId
        }, (res) => {
            Toast.success(res.message);

            this.setState({
                follow: !this.state.follow
            })

            console.log("这里是喜欢成功的数据")
            console.log(res.message)
        }, (err) => {
            Toast.fail("error")
        })


        
    }

    render() {
        return (
            <div className="like" onClick={this.handleFollow.bind(this)}>
                {this.state.follow ? "💗" : "🖤"}
            </div>
        )
    }
}
Like.propsType ={
    follow: PropTypes.bool.isRequired
}
export default Like;
