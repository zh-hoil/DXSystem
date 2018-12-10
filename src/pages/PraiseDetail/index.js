import React from "react";
import Comment from "Components/Comment";
import PostComments from "Components/PostComments";
import "./index.less";
class PraiseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [
                {
                    username: "邓伟",
                    avatarSrc: "#",
                    message: "这里是评论内容",
                    timestamp: (new Date()).getTime(),
                    praise: 1
                },
                {
                    username: "邓伟",
                    avatarSrc: "#",
                    message: "这里是评论内容",
                    timestamp: (new Date()).getTime(),
                    praise: 1
                },
                {
                    username: "邓伟",
                    avatarSrc: "#",
                    message: "这里是评论内容",
                    timestamp: (new Date()).getTime(),
                    praise: 1
                }
            ]
        }
    }

    componentWillMount () {
        let themeId = this.props.match.params.themeId;
        console.log(themeId);
    }
    render() {
        return (
            <div className="praise-detail">
                {
                    this.state.comments.map((comment, index) =>(
                        <Comment key={index} comment={comment} />
                    ))
                }
                <PostComments comments={this.state.comments} />
            </div>
        )
    }
}
export default PraiseDetail;
