import React from "react";
import "./index.less";
import Tag from "Components/Tag";
import Time from "Components/Time";
import Comment from "Components/Comment";
import Evaluate from "Components/Evaluate";
import Praise from "Components/Praise";
import Recommends from "Components/Recommends";
import PostComments from "Components/PostComments";
import download from "Assets/images/download.png";
import more from "Assets/images/more.png";
import { userId, Get, Post } from "Public/js/Ajax";

const TOPICINFOURL = "/getTopicInfo";
const TOPICCOMMENTSURL = "/getTopicComment";


class ThemeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,   //控制底部评论框开启或关闭
            title: "",    //标题
            type: "",     //类型
            time: "",     //时间
            creator: "", //负责人
            version: "",   //版本
            status: "",  //状态
            follow: false,    //是否喜欢
            favorw: false,    //是否点赞
            favorwnum: 0,     //点赞数
            content: "",
            salematerial: null,
            studymaterial: {
                title: "国家财务共享案例",
                src: "#"
            },
            evaluate: "100%",
            comments: {
                count: 1,
                good: 0,
                commentlist: [
                    
                ]
            },
            likes: [
                {
                    title: "这里是猜你喜欢的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是猜你喜欢的内容"
                },
                {
                    title: "这里是猜你喜欢的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是踩你喜欢的内容"
                },
                {
                    title: "这里是猜你喜欢的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是踩你喜欢的内容"
                }
            ],
            recommends: [
                {
                    title: "这里是推荐的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是推荐的内容"
                },
                {
                    title: "这里是推荐的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是推荐的内容"
                },
                {
                    title: "这里是推荐的标题",
                    imgSrc: "#",
                    doc_id: 1,
                    message: "这里是推荐的内容"
                }
            ]
        }
    }
    componentWillMount() {
        let themeId = this.props.match.params.themeId;
        this._getTopicData(themeId);
        this._getComments(themeId)
    }

    //获取主题数据详情
    _getTopicData (themeId) {
        Get(TOPICINFOURL, {
            userId: userId,
            themeId: themeId
        }, (res) => {
            let topic = res.data;
            this.setState({
                ...topic
            })

            console.log("这里是主题详情的数据")
            console.log(res.data)
        }, (err) => {
            console.log(err)
        })
    }

    //获取主题评论（3条）
    _getComments (themeId) {
        let count = 3;
        Get(TOPICCOMMENTSURL, {
            userId: userId,
            themeId: themeId,
            count: count
        }, (res) => {
            let comments = res.data;
            this.setState({
                comments: {...comments}
            })
            console.log(this.state)

            console.log("这里是评论详情的数据")
            console.log(comments)
        }, (err) => {
            console.log(err)
        })
    }

    handleFollow() {
        this.setState({
            follow: !this.state.follow
        })
    }

    handleDataGet() {
        let confirm = window.confirm("确定将资料发送到您邮箱？");
        if (confirm) {
            //发送网络请求

        }
    }

    handlePraiseDetail() {
        window.location.hash = "/praiseDetail/" + this.props.match.params.themeId;
    }

    render() {
        return (
            <div className="details-wrapper">
                <div className="details-top">
                    <div className="theme-details">
                        <h3 className="theme-details-title">
                            {this.state.title}
                        </h3>
                        <div className="remarks">
                            <Tag type={this.state.type} test={this.state.creator} />
                            <Time time={this.state.time} />
                            <div className="detail">负责人：<span>{this.state.creator}</span></div>
                            <div className="detail">版本：<span>{this.state.version}</span></div>
                            <div className="detail">状态：<span>{this.state.status}</span></div>
                        </div>
                        <div className="operation">
                            <span className="like" onClick={this.handleFollow.bind(this)}>{this.state.follow ? "💗" : "🖤"}</span>
                            <Praise favorw={this.state.favorw} favorwnum={this.state.favorwnum} />
                        </div>
                        <div className="message">
                            {this.state.content}
                        </div>
                        <div className="data">
                            <div>销售资料</div>
                            <div className="data-href">{this.state.salematerial
                                ?
                                (<a href={this.state.salematerial.src}>{this.state.salematerial.title}</a>)
                                :
                                "暂未提供销售资料"}
                            </div>
                            <div>实施资料</div>
                            <div className="data-href">{this.state.studymaterial
                                ?
                                (<a href={this.state.studymaterial.src}>{this.state.studymaterial.title}</a>)
                                :
                                "暂未提供实施资料"}
                            </div>
                            <div className="data-get" onClick={this.handleDataGet.bind(this)}>
                                <span className="download-icon" style={{background: `url(${download}) no-repeat`, backgroundSize: "20px"}}></span>
                                索取资料
                            </div>
                        </div>


                    </div>
                    <div className="comments">
                        <div className="comments-title">
                            评价：
                            <Evaluate evaluate={this.state.comments.good} />
                        </div>
                        {
                            this.state.comments.commentlist.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))
                        }
                        <div className="more-comments" onClick={this.handlePraiseDetail.bind(this)}>
                            更多评价
                            <span className="more-comments-icon" style={{background: `url(${more}) no-repeat`, backgroundSize: "20px"}}></span>
                        </div>
                    </div>
                    <div className="likes">
                        <div className="likes-title">
                            猜你喜欢：
                        </div>
                        <Recommends recommends={this.state.likes} />
                    </div>
                    <div className="recommends">
                        <div className="recommends-title">
                            关注该话题的人还关注：
                        </div>
                        <Recommends recommends={this.state.recommends} />
                    </div>
                </div>
                <PostComments count={this.state.comments.count} themeId={this.props.match.params.themeId}/>
            </div>
        );
    }
}
export default ThemeDetails;
