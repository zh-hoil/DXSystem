import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comments from "Components/Comments";
import Evaluate from "Components/Evaluate";
import Recommends from "Components/Recommends";
import PostComments from "Components/PostComments";
import ThemeDetailsContainer from "./ThemeDetailsContainer";
import { updateThemeID } from "Store/ThemeDetails/action";
import { userId, Get, Post } from "Public/js/Ajax";
import { getTargetAttr } from "Src/utils";
import { Toast } from "antd-mobile";
import more from "Assets/images/more.png";
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
            open: true, //控制底部评论框开启或关闭
            content: "",
            salematerial: null,
            studymaterial: {
                title: "国家财务共享案例",
                src: "#"
            },
            comments: {
                count: 0,
                good: 0,
                commentlist: []
            },
            topicGuess: [],
            topicFollow: []
        };
    }
    componentWillMount() {
        let themeId = this.props.match.params.themeId;
        this.props.updateThemeID(themeId);
        // this._getTopicData(themeId);
        this._getComments(themeId);
        this._getTopicGuess();
        this._getTopicFollow(themeId);
    }
    componentWillReceiveProps(props) {
        let themeId = props.match.params.themeId;
        this.props.updateThemeID(themeId);
        // this._getTopicData(themeId);
        this._getComments(themeId);
        this._getTopicGuess();
        this._getTopicFollow(themeId);
    }
    //获取主题评论（3条）
    _getComments(themeId) {
        let count = 3;
        Get(
            TOPICCOMMENTSURL,
            {
                userId: userId,
                themeId: themeId,
                count: count
            },
            res => {
                let comments = res.data;
                this.setState({
                    comments: { ...comments }
                });
                console.log("这里是评论详情的数据");
                console.log(comments);
            },
            err => {
                console.log(err);
            }
        );
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
    //跳转到评论详情页
    handlePraiseDetail = () => {
        window.location.hash = "/praiseDetail/" + this.state.themeId;
    };

    // 跳转到推荐主题详情页
    handleDetails = e => {
        let themeId = getTargetAttr(e.target, "themeid");
        if (!themeId) {
            return;
        }
        // if(this.props.updateData) {
        //     this.props.updateData({themeId: themeId})
        // }
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
                Toast.success(res.message);
                this._themePraise();
                console.log("这里是点赞成功的数据");
                console.log(res);
            },
            err => {
                Toast.fail("error");
            }
        );
    };

    _themePraise() {
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
    }

    // _commentPraise(commentId) {
    //     for (let i in this.state.comments.commentlist) {
    //         if (this.state.comments.commentlist[i].commentId === commentId) {
    //             console.log("找到了");
    //             console.log(i)
    //             this.state.comments.commentlist[i].favorw = "true";
    //             ++this.state.comments.commentlist[i].favorwnum;

    //             let commentlist = [...this.state.comments.commentlist];
    //             console.log(commentlist)
    //             console.log(this.state.comments.commentlist)
    //             this.setState({
    //                 comments: {
    //                     ...this.state.comments,
    //                     commentlist: [ ...commentlist ]
    //                 }
    //             })
    //             console.log(this.state.comments)
    //             return
    //         }
    //     }
    // }

    render() {
        let { comments, topicGuess, topicFollow, themeId } = this.state;
        return (
            <div className="details-wrapper">
                <div className="details-top">
                    <ThemeDetailsContainer themeId={this.props.match.params.themeId}/>
                    <div className="comments-wrapper">
                        <div className="comments-title">
                            评价：
                            <Evaluate evaluate={comments.good} />
                        </div>
                        {}
                        <Comments commentlist={comments.commentlist} />
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
                    </div>
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
                <PostComments count={comments.count} themeId={themeId} />
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
