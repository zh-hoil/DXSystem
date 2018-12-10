import React from "react";
import Comments from "Components/Comments";
import PostComments from "Components/PostComments";
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";

const TOPICCOMMENTSURL = "/getTopicComment";
class PraiseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: {
                count: 0,
                good: 0,
                commentlist: []
            }
        }
    }

    componentWillMount() {
        let themeId = this.props.match.params.themeId;
        this._getComments(themeId);
    }

    //获取主题评论（所有）
    _getComments(themeId) {
        let count = "all";
        Get(TOPICCOMMENTSURL, {
            userId: userId,
            themeId: themeId,
            count: count
        }, (res) => {
            let comments = res.data;
            this.setState({
                comments: { ...comments }
            })
            console.log(this.state)

            console.log("这里是评论详情的数据")
            console.log(comments)
        }, (err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="praise-detail">
                <Comments commentlist={this.state.comments.commentlist} />
                <PostComments count={this.state.comments.count} themeId={this.props.match.params.themeId}/>
            </div>
        )
    }
}
export default PraiseDetail;
