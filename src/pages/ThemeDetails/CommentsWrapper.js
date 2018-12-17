import React from "react";
import { connect } from "react-redux";
import { updateComments } from "Store/ThemeDetails/action";
import { Get } from "Public/js/Ajax";
import PropTypes from "prop-types";
import Comments from "Components/Comments";
import Evaluate from "Components/Evaluate";
import more from "Assets/images/more.png";

const TOPICCOMMENTSURL = "/getTopicComment"; //评论数据获取接口
class CommentsWrapper extends React.Component {
    constructor(props) {
        super(props);
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
                this.props.updateComments(comments);
            }
        );
    };
    componentDidMount() {
        this.getComments(this.props.themeId);
    }
    componentWillReceiveProps(props) {
        if (this.props.themeId != props.themeId) {
            this.getComments(props.themeId);
        }
    }
    render() {
        let { good, commentlist, count } = this.props;
        
        return (
            <div className="comments-wrapper">
                <div className="comments-title">
                    评价：
                    <Evaluate evaluate={good} />
                </div>
                {count < 1 ? (
                    <span className="comments-empty">暂无评论</span>
                ) : (
                    <div>
                        <Comments commentlist={commentlist} />
                        {count > 3 ? (
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
    themeId: PropTypes.string.isRequired,
    good: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    commentlist: PropTypes.array.isRequired,
    updateComments: PropTypes.func.isRequired
};
export default connect(
    store => ({
        themeId: store.themeDetailsData.themeId,
        commentlist: store.themeDetailsData.commentlist,
        good: store.themeDetailsData.good,
        count: store.themeDetailsData.count
    }),
    { updateComments }
)(CommentsWrapper);
