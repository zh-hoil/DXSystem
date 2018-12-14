import React from "react";
import { Toast } from "antd-mobile";
import FileAccess from "./FileAccess";
import ThemeDescribe from "./ThemeDescribe";
import { userId, Get, Post } from "Public/js/Ajax";
const TOPICINFOURL = "/getTopicInfo"; //主题数据获取接口
const LIKETOPICURL = "/likeTopic"; //主题收藏接口
class ThemeDetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsData: {
                title: "",      //标题
                type: "",       //类型
                time: "",       //时间
                creator: "",    //负责人
                version: "",    //版本
                status: "",     //状态
                follow: "false", //是否喜欢
                favorw: "false", //是否点赞
                favorwnum: 0    //点赞数
            },
            salematerial: null, //销售资料
            studymaterial: null,//学习资料
            content: ""
        };
    }
    //获取主题数据详情
    getTopicData = themeId => {
        Get(
            TOPICINFOURL,
            {
                themeId: themeId
            },
            ({ data }) => {
                let { content, salematerial, studymaterial } = data;
                salematerial = this.stringToFileObject(salematerial, "sale");
                studymaterial = this.stringToFileObject(studymaterial, "study");
                this.setState({
                    detailsData: data,
                    content,
                    salematerial,
                    studymaterial
                });
            },
            err => {
                console.log(err);
            }
        );
    };
    /**
     * 将后台返回的资料名处理成 资料名称和 资料下载地址对象
     */
    stringToFileObject = (fileStr, fileType) => {
        if (fileStr.length === 0) {
            return null;
        }
        fileStr = fileStr.split(",");
        return fileStr.map(item => {
            return {
                title: item,
                // 只有正式环境才可用
                src: `${window.RootURL}/fileDownload?userId=${userId}&themeId=${
                    this.props.themeId
                }&fileName=${item}&fileType=${fileType}`
            };
        });
    };
    // 点赞和取消点赞
    themePraise = () => {
        let { favorw, favorwnum } = this.state.detailsData;
        if (favorw === "true") {
            this.setState({
                detailsData: {
                    ...this.state.detailsData,
                    favorw: "false",
                    favorwnum: favorwnum - 1
                }
            });
        } else {
            this.setState({
                detailsData: {
                    ...this.state.detailsData,
                    favorw: "true",
                    favorwnum: favorwnum - 0 + 1
                }
            });
        }
    };
    //收藏操作
    handleFollow = () => {
        let follow = this.state.detailsData.follow;
        Post(
            LIKETOPICURL,
            {
                themeId: this.props.themeId
            },
            res => {
                Toast.success(res.message, 0.5);
                if (follow === "true") {
                    this.setState({
                        detailsData: {
                            ...this.state.detailsData,
                            follow: "false"
                        }
                    });
                } else {
                    this.setState({
                        detailsData: {
                            ...this.state.detailsData,
                            follow: "true"
                        }
                    });
                }
            }
        );
    };
    componentDidMount() {
        this.getTopicData(this.props.themeId);
    }
    componentWillReceiveProps(props) {
        if (props.themeId != this.props.themeId) {
            this.getTopicData(props.themeId);
        }
    }
    render() {
        let { detailsData, salematerial, studymaterial, content } = this.state;
        return (
            <div className="theme-details">
                <ThemeDescribe
                    detailsData={detailsData}
                    onPraise={this.themePraise}
                    onFollow={this.handleFollow}
                />
                <div className="message">{content}</div>
                <FileAccess
                    themeId={this.props.themeId}
                    salematerialData={salematerial}
                    studymaterialData={studymaterial}
                />
            </div>
        );
    }
}
export default ThemeDetailsContainer;
