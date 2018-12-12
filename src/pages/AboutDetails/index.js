import React from "react";
import "./index.less";
class AboutDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="about_details">
                <div className="about_top">
                    <div className="circle">
                        <div className="text">nc</div>
                    </div>
                    <div className="title_content">NC一线牵 V3.0</div>
                </div>
                <div className="about_bottom">
                    <div className="bottom_content">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NC一线牵集合研发优质资源构建的从全员经验分享、最佳方案传播、资料悬赏、一线需求快速响应到研发最新动态、研发成果实体验、推进研发机制改进为一体的移动应用共享平台。
                        <br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里，您可以获取最新最全的产品资料，近距离体验研发最新研发成果，更可以将您在项目中遇到的产品需求、方案需求等及时反馈给研发人员，促进NC产品的改进。
                    </div>
                    <div className="about_address">
                        电脑请访问：
                        <br />
                        http://123.103.9.198:8900/ebvp/login/forLogin
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutDetails;
