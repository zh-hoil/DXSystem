//点赞组件

import React from "react";
import PropTypes from "prop-types";
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";
import { Toast } from "antd-mobile";

const GOODTOPICURL = "/goodTopic"; //主题点赞接口
const GOODCOMMENTURL = "/goodComment"; //评论点赞接口
class Praise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }

    handlePraise() {
        let url = "";
        let data = {};
        if(this.state.themeId) {
            url = GOODTOPICURL;
            data = {
                userId: userId,
                themeId: this.state.themeId
            }
        }else if(this.state.commentId) {
            url = GOODCOMMENTURL;
            data = {
                userId: userId,
                commentId: this.state.commentId
            }
        }else{
            return
        }

        Post(url, data, (res) => {
            Toast.success(res.message);
            this._success()

            console.log("这里是点赞成功的数据")
            console.log(res.message)
        }, (err) => {
            Toast.fail("error")
        })
    }

    _success() {
        if(this.state.favorw) {
            this.setState((preState) => {
                return {
                    favorw: false,
                    favorwnum: preState.favorwnum - 1
                }
            })
        }else{
            this.setState((preState) => {
                return {
                    favorw: true,
                    favorwnum: preState.favorwnum + 1
                }
            })
        }
    }

    render() {
        return (
            <div className="praise" onClick={this.handlePraise.bind(this)}>
                {(this.state.favorw?"👍":"☞") + " " + this.state.favorwnum}
            </div>
        )
    }
}

Praise.propsType = {
    favorw: PropTypes.bool.isRequired,
    favorwnum: PropTypes.number.isRequired,
    themeId: PropTypes.string,
    commentId: PropTypes.string
}

export default Praise;
