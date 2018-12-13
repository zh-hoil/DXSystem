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
import { Toast } from "antd-mobile";

import "./index.less";

const GOODTOPICURL = "/goodTopic"; //主题点赞接口
const GOODCOMMENTURL = "/goodComment"; //评论点赞接口
const LIKETOPICURL = "/likeTopic"; //主题收藏接口
const TOPICCOMMENTSURL = "/getTopicComment"; //评论数据获取接口
const TOPICFOLLOWURL = "/getTopicFollow"; //关注数据获取接口
const TOPGUESSURL = "/getTopicGuess"; //猜你喜欢数据获取接口

class ThemeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicGuess: [],
            topicFollow: []
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

                console.log("这里是猜你喜欢的数据");
                console.log(res.data);
            },
            err => {
                console.log(err);
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

                console.log("这里是关注该话题的人还关注的数据");
                console.log(res.data);
            },
            err => {
                console.log(err);
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

    //收藏操作
    handleFollow = () => {
        Post(
            LIKETOPICURL,
            {
                userId: userId,
                themeId: this.props.themeId
            },
            res => {
                Toast.success(res.message);
                if (this.state.follow === "true") {
                    this.setState({
                        follow: "false"
                    });
                } else {
                    this.setState({
                        follow: "true"
                    });
                }
                console.log("这里是喜欢成功的数据");
                console.log(res.message);
            },
            err => {
                Toast.fail("error");
            }
        );
    };

    //点赞操作
    handlePraise = () => {
        Post(
            GOODTOPICURL,
            {
                userId: userId,
                themeId: this.props.match.params.themeId
            },
            res => {
                Toast.success(res.message, 0.3, this.themePraise);
            }
        );
    };
    // 点赞和取消点赞
    themePraise = () => {
        if (this.state.favorw === "true") {
            this.setState(preState => {
                return {
                    favorw: "false",
                    favorwnum: preState.favorwnum - 1
                };
            });
        } else {
            this.setState(preState => {
                return {
                    favorw: "true",
                    favorwnum: preState.favorwnum + 1
                };
            });
        }
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
