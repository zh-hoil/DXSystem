import React from "react";
import SimpleListMenu from "Components/SimpleListMenu";
import { updateAppTitle } from "Public/js/JSBridge";
import "./index.less";

const menuList = [
    {
        title: "注册与登录",
        path: "http://123.103.9.198:8901/fiwechat/file/5.pdf",
        icon: "icon-sousuoziliao"
    },
    {
        title: "我要资料",
        path: "http://123.103.9.198:8901/fiwechat/file/3.pdf",
        icon: "icon-guanzhu1"
    },
    {
        title: "我有建议",
        path: "http://123.103.9.198:8901/fiwechat/file/4.pdf",
        icon: "icon-guanzhu1"
    },
    {
        title: "我需支持",
        path: "http://123.103.9.198:8901/fiwechat/file/2.pdf",
        icon: "icon-guanzhu1"
    },
    {
        title: "我想体验",
        path: "http://123.103.9.198:8901/fiwechat/file/1.pdf",
        icon: "icon-guanzhu1"
    }
];

class QuickGuide extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        updateAppTitle("快速指南");
    }

    render() {
        return <SimpleListMenu className="quickguide_menu" menuList={menuList} />;
    }
}

export default QuickGuide;
