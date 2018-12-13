import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comments from "Components/Comments";
import Evaluate from "Components/Evaluate";
import { updateCommentsCount } from "Store/ThemeDetails/action";
import more from "Assets/images/more.png";
import { Get } from "Public/js/Ajax";

const TOPICCOMMENTSURL = "/getTopicComment"; //评论数据获取接口
class CommentsWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: 0,
            commentlist: []
        };
    }
    //跳转到评论详情页
    handlePraiseDetail = () => {
        window.location.hash = "/praiseDetail/" + this.props.themeId;
    };
    //获取主题评论（3条）
    getComments = themeId => {
        let count = 3;
        Get(
            TOPICCOMMENTSURL,
            {
                themeId: themeId,
                count: count
            },
            ({ data: comments }) => {
                this.props.updateCommentsCount(comments.count);
                this.setState({ ...comments });
                console.log("评论详情的数据", comments);
            },
            err => {
                console.log(err);
            }
        );
    };
    componentDidMount() {
        this.getComments(this.props.themeId);
    }

    render() {
        let { good, commentlist } = this.state;
        return (
            <div className="comments-wrapper">
                <div className="comments-title">
                    评价：
                    <Evaluate evaluate={good} />
                </div>
                {good < 1 ? (
                    <span className="comments-empty">暂无评论</span>
                ) : (
                    <div>
                        <Comments commentlist={commentlist} />
                        {good > 3 ? (
                            <div
                                className="more-comments"
                                onClick={this.handlePraiseDetail}
                            >
                                更多评价
                                <span
                                    className="more-comments-icon"
                                    style={{
                                        background: `url(${more}) no-repeat`,
                                        backgroundSize: "40px"
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}
CommentsWrapper.propTypes = {
    themeId: PropTypes.string.isRequired
};
export default connect(
    store => ({
        themeId: store.themeDetailsData.themeId
    }),
    { updateCommentsCount }
)(CommentsWrapper);
