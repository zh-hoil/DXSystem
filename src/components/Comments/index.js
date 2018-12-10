import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment.js";
import "./index.less";
class Comments extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="comments">
                {
                    this.props.commentlist.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))
                }
            </div>

        )
    }
}
Comments.propsType = {
    comments: PropTypes.array.isRequired
}
export default Comments;




