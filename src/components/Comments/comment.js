import React from "react";
import Time from "Components/Time";
import Praise from "Components/Praise";
import Stars from "Components/Stars";
import PropTypes from "prop-types";
class Comment extends React.Component {
    constructor(props) {
        super(props);
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
                <Praise commentId={comment.commentId} favorw={comment.favorw} favorwnum={Number(comment.favorwnum)} />
            </div>
        )
    }
}
Comment.propsType = {
    comment: PropTypes.object.isRequired
}
export default Comment;
