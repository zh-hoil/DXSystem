import React from "react";
import Time from "Components/Time";
import Praise from "Components/Praise";
import Stars from "Components/Stars";
import PropTypes from "prop-types";
import { userId, Get, Post } from "Public/js/Ajax";
import { Toast } from "antd-mobile";

const GOODCOMMENTURL = "/goodComment"; //评论点赞接口
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorw: props.comment.favorw,
            favorwnum: props.comment.favorwnum
        };
    }

    //点赞操作
    handlePraise() {
        Post(
            GOODCOMMENTURL,
            {
                commentId: this.props.comment.commentId
            },
            res => {
                Toast.success(res.message, 0.5);
                this._commentPraise();
            },
            err => {
                Toast.fail("error");
            }
        );
    }

    _commentPraise() {
        if (this.state.favorw === "true") {
            this.setState(preState => {
                return {
                    favorw: "false",
                    favorwnum: preState.favorwnum - 1
                };
            });
        } else {
            this.setState(preState => {
                return {
                    favorw: "true",
                    favorwnum: preState.favorwnum + 1
                };
            });
        }
    }

    render() {
        const comment = this.props.comment;
        return (
            <div commentid={comment.commentId} className="comment">
                <div className="user-avatar">
                    <img src={comment.portrait} />
                </div>
                <div className="comment-detail">
                    <div className="user-name">{comment.userName}</div>
                    <div className="comment-text">{comment.content}</div>
                    <Time time={comment.time} />
                </div>
                <Stars count={Number(comment.stars)} />
                <Praise
                    commentId={comment.commentId}
                    favorw={this.state.favorw}
                    favorwnum={Number(this.state.favorwnum)}
                    onClick={this.handlePraise.bind(this)}
                />
            </div>
        );
    }
}
Comment.propsType = {
    comment: PropTypes.object.isRequired
};
export default Comment;
