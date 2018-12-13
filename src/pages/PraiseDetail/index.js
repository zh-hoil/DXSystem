import React from "react";
import Comments from "Components/Comments";
import { Toast } from "antd-mobile";
import QuickComments from "Components/QuickComments";
import "./index.less";
import { Get, Post } from "Public/js/Ajax";

const TOPICCOMMENTSURL = "/getTopicComment";
const COMMENTOPICURL = "/commentTopic";
class PraiseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            good: 0,
            commentlist: []
        };
    }
    //获取主题评论（所有）
    getComments = themeId => {
        let count = "all";
        Get(
            TOPICCOMMENTSURL,
            {
                themeId: themeId,
                count: count
            },
            res => {
                let comments = res.data;
                this.setState({
                    ...comments
                });
                console.log("评论详情的数据", comments);
            },
            err => {
                console.log(err);
            }
        );
    };
    handleConfirm = (data, closeFun) => {
        //发送评论请求
        let themeId = this.props.match.params.themeId;
        let { content, star } = data;
        Post(
            COMMENTOPICURL,
            {
                themeId: themeId,
                content: content,
                star: star
            },
            res => {
                Toast.success(res.message, 0.5, () => {
                    closeFun(), this.getComments(themeId);
                });
                console.log("评论成功的数据", res);
            }
        );
    };
    componentDidMount() {
        let themeId = this.props.match.params.themeId;
        this.getComments(themeId);
    }
    render() {
        let { count, commentlist } = this.state;
        return (
            <div className="praise-detail">
                <div className="header">
                    全部评论<span className="count">({count})</span>
                </div>
                <Comments commentlist={commentlist} />
                <QuickComments
                    commentsCount={count}
                    onOk={this.handleConfirm}
                />
            </div>
        );
    }
}
export default PraiseDetail;
