import React from "react";
import Time from "Components/Time";
import Praise from "Components/Praise";
import Stars from "Components/Stars";
import PropTypes from "prop-types";
import "./index.less";
import avatar from 'Assets/images/avatar.png'; 
class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const comment = this.props.comment;
        return (
            <div className="comment">
                <div className="user-avatar">
                    <img src={avatar} />
                </div>
                <div className="comment-detail">
                    <div className="user-name">{comment.userName}</div>
                    <div className="comment-text">{comment.content}</div>
                    <Time time={comment.time} />
                </div>
                <Stars count={comment.stars} />
                <Praise favorw={comment.favorw} favorwnum={comment.favorwnum} />
            </div>
        )
    }
}
Comment.propsType = {
    comment: PropTypes.object.isRequired
}
export default Comment;
