import React from "react";
import FileAccess from "./FileAccess";
import ThemeDescribe from "./ThemeDescribe";
import { Get } from "Public/js/Ajax";
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
    componentDidMount() {
        this.getTopicData(this.props.themeId);
    }
    componentWillReceiveProps(){
        this.getTopicData(this.props.themeId);
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
