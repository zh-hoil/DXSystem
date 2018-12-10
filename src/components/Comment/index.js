import React from "react";
import Time from "Components/Time";
import Praise from "Components/Praise";
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
                    <div className="user-name">{comment.username}</div>
                    <div className="comment-text">{comment.message}</div>
                    <Time timestamp={comment.timestamp} />
                </div>
                <div className="star">⭐⭐⭐</div>
                <Praise praise={comment.praise} />
            </div>
        )
    }
}
Comment.propsType = {
    comment: PropTypes.object.isRequired
}
export default Comment;
