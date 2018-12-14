import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Recommends from "Components/Recommends";
import PostComments from "./PostComments";
import ThemeDetailsContainer from "./ThemeDetailsContainer";
import CommentsWrapper from "./CommentsWrapper";
import { updateThemeID } from "Store/ThemeDetails/action";
import { userId, Get, Post } from "Public/js/Ajax";
import { getTargetAttr } from "Src/utils";

import "./index.less";

const TOPICFOLLOWURL = "/getTopicFollow"; //关注数据获取接口
const TOPGUESSURL = "/getTopicGuess"; //猜你喜欢数据获取接口


class ThemeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicGuess: [],     //猜你喜欢数据
            topicFollow: []     //其他关注数据
        };
    }
    componentWillMount() {
        let themeId = this.props.match.params.themeId;
        this.props.updateThemeID(themeId);
        this._getTopicGuess();
        this._getTopicFollow(themeId);
    }
    componentWillReceiveProps(props) {
        let themeId = props.match.params.themeId;
        this.props.updateThemeID(themeId);
        this._getTopicGuess();
        this._getTopicFollow(themeId);
    }
    //获取猜你喜欢数据
    _getTopicGuess() {
        Get(
            TOPGUESSURL,
            {
                userId: userId
            },
            res => {
                let topicGuess = res.data;
                this.setState({
                    topicGuess
                });
            }
        );
    }
    //获取推荐数据
    _getTopicFollow(themeId) {
        Get(
            TOPICFOLLOWURL,
            {
                userId: userId,
                themeId: themeId
            },
            res => {
                let topicFollow = res.data;
                this.setState({
                    topicFollow
                });
            }
        );
    }
    // 跳转到推荐主题详情页
    handleDetails = e => {
        let themeId = getTargetAttr(e.target, "themeid");
        if (!themeId) {
            return;
        }
        window.location.hash = "/themeDetails/" + themeId;
    };

    render() {
        let { topicGuess, topicFollow } = this.state;
        return (
            <div className="details-wrapper">
                <div className="details-top">
                    <ThemeDetailsContainer
                        themeId={this.props.match.params.themeId}
                    />
                    <CommentsWrapper />
                    <div className="likes-wrapper">
                        <div className="likes-title">猜你喜欢：</div>
                        <Recommends
                            onClick={this.handleDetails}
                            recommends={topicGuess}
                        />
                    </div>
                    <div className="recommends-wrapper">
                        <div className="recommends-title">
                            关注该话题的人还关注：
                        </div>
                        <Recommends
                            onClick={this.handleDetails}
                            recommends={topicFollow}
                        />
                    </div>
                </div>
                <PostComments />
            </div>
        );
    }
}
ThemeDetails.propTypes = {
    updateThemeID: PropTypes.func.isRequired
};
export default connect(
    store => ({}),
    { updateThemeID }
)(ThemeDetails);
