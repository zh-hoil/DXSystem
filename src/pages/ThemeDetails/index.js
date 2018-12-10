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

class ThemeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            leader: "尹晓波",
            version: "6.5",
            status: "正式版",
            like: false,
            praise: 1,
            message: `这里是说明信息这里是说明信息这里是说明信息这里是说明信息这里是说明信息
                    这里是说明信息这里是说明信息这里是说明信息这里是说明信息这里是说明信息`,
            seles_data: null,
            implementation_data: {
                title: "国家财务共享案例",
                src: "#"
            },
            evaluate: "100%",
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
            ],
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
        console.log(this.props.match.params.theme_id)
    }

    handleLike() {
        this.setState({
            ...this.state,
            like: !this.state.like
        })
    }

    handleDataGet() {
        let confirm = window.confirm("确定将资料发送到您邮箱？");
        if (confirm) {
            //发送网络请求

        }
    }

    handlePraiseDetail() {
        window.location.hash = "/praiseDetail";
    }

    render() {
        return (
            <div className="details-wrapper">
                <div className="details-top">
                    <div className="theme-details">
                        <h3 className="theme-details-title">
                            中国国旅财务共享案例
                        </h3>
                        <div className="remarks">
                            <Tag themeDocSort={1} />
                            <Time timestamp={new Date().getTime()} />
                            <div className="detail">负责人：<span>{this.state.leader}</span></div>
                            <div className="detail">版本：<span>{this.state.version}</span></div>
                            <div className="detail">状态：<span>{this.state.status}</span></div>
                        </div>
                        <div className="operation">
                            <span className="like" onClick={this.handleLike.bind(this)}>{this.state.like ? "💗" : "🖤"}</span>
                            <Praise praise={this.state.praise} />
                        </div>
                        <div className="message">
                            {this.state.message}
                        </div>
                        <div className="data">
                            <div>销售资料</div>
                            <div className="data-href">{this.state.seles_data
                                ?
                                (<a href={this.state.seles_data.src}>{this.state.seles_data.title}</a>)
                                :
                                "暂未提供销售资料"}
                            </div>
                            <div>实施资料</div>
                            <div className="data-href">{this.state.implementation_data
                                ?
                                (<a href={this.state.implementation_data.src}>{this.state.implementation_data.title}</a>)
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
                            <Evaluate evaluate={100} />
                        </div>
                        {
                            this.state.comments.map((comment, index) => (
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
                <PostComments comments={this.state.comments} />
            </div>
        );
    }
}
export default ThemeDetails;
