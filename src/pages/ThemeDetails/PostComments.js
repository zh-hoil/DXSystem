import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";
import QuickComments from "Components/QuickComments";
import { Post } from "Public/js/Ajax";
import "./index.less";

const COMMENTOPICURL = "/commentTopic";
class PostComments extends React.Component {
    constructor(props) {
        super(props);
    }
    handlePraiseDetail = () => {
        window.location.hash = "/praiseDetail/" + this.props.themeId;
    };
    handleConfirm = (data, closeFun) => {
        //发送评论请求
        let themeId = this.props.themeId;
        let { content, star } = data;
        Post(
            COMMENTOPICURL,
            {
                themeId: themeId,
                content: content,
                star: star
            },
            res => {
                Toast.success(res.message, 1, closeFun);
                console.log("评论成功的数据", res);
            }
        );
    };

    render() {
        return (
            <QuickComments
                commentsCount={this.props.commentsCount}
                onOk={this.handleConfirm}
                openToPraiseDetail={this.handlePraiseDetail}
            />
        );
    }
}

PostComments.propTypes = {
    themeId: PropTypes.string.isRequired,
    commentsCount: PropTypes.string.isRequired
};
export default connect(
    store => ({
        themeId: store.themeDetailsData.themeId,
        commentsCount: store.themeDetailsData.commentsCount
    }),
    {}
)(PostComments);
