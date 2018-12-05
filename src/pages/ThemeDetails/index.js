import React from "react";
import { Button } from 'antd-mobile';
import "./index.less";
class ThemeDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount () {
        console.log(this.props.match.params.theme_id)
    }
    render() {
        return (
            <div className="details-wrapper">
                <div className="details-top">
                    <div className="theme-details">
                        这里是主题详情
                    </div>
                    <div className="comments">
                        这里是评论区 只显示三条
                    </div>
                    <div className="likes">
                        这里是猜你喜欢
                    </div>
                    <div className="recommends">
                        这里是推荐
                    </div>
                </div>
                <div className="details-bottom">
                    这里是发布评论的地方
                </div>
            </div>
        );
    }
}
export default ThemeDetails;
