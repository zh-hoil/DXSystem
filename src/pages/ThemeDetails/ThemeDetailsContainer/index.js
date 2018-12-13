import React from "react";
import FileAccess from "./FileAccess";
import ThemeDescribe from "./ThemeDescribe";
import { userId, Get } from "Public/js/Ajax";
const TOPICINFOURL = "/getTopicInfo"; //主题数据获取接口
class ThemeDetailsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsData: {
                title: "", //标题
                type: "", //类型
                time: "", //时间
                creator: "", //负责人
                version: "", //版本
                status: "", //状态
                follow: "false", //是否喜欢
                favorw: "false", //是否点赞
                favorwnum: 0 //点赞数
            },
            salematerial: null,
            studymaterial: null,
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
                console.log("主题详情的数据", data);
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
                // src: `${window.RootURL}/fileDownload?userId=${userId}&themeId=${
                //     this.props.themeId
                // }&fileName=${item}&fileType=${fileType}`
                src: `http://172.20.6.119:8901/fiwechat/fileDownload?userId=${userId}&themeId=${
                    this.props.themeId
                }&fileName=${item}&fileType=${fileType}`
            };
        });
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
                <ThemeDescribe detailsData={detailsData} />
                <div className="message">{content}</div>
                <FileAccess
                    salematerialData={salematerial}
                    studymaterialData={studymaterial}
                />
            </div>
        );
    }
}
export default ThemeDetailsContainer;
