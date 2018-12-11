import React from "react";
import MenuList from "Components/MenuList";
import { updateAppTitle } from "Public/js/JSBridge";
import home1 from "Assets/images/home1.png"; // 搜索资料
import home7 from "Assets/images/home7.png"; // 我的关注
import home2 from "Assets/images/home2.png"; // 产品提案
import home4 from "Assets/images/home4.png"; // 悬赏申请
import home5 from "Assets/images/home5.png"; // 排行榜
import home6 from "Assets/images/home6.png"; // 图表统计
import home8 from "Assets/images/home8.png"; // 账户申请
import home9 from "Assets/images/home9.png"; // 开发资料
import "./index.less";
const menuList = [
    { title: "搜索资料", path: "/NC_yxq0517/index.html#searchPageView", icon: home1, iframe: true },
    { title: "我的关注", path: "/NC_yxq0517/index.html", icon: home7, iframe: true },
    { title: "产品提案", path: "/NC_yxq0517/index.html", icon: home2, iframe: true },
    { title: "悬赏申请", path: "/NC_yxq0517/index.html", icon: home4, iframe: true },
    { title: "排行榜", path: "/NC_yxq0517/index.html", icon: home5, iframe: true },
    { title: "图表统计", path: "/NC_yxq0517/index.html", icon: home6, iframe: true },
    { title: "账户申请", path: "/NC_yxq0517/index.html", icon: home8, iframe: true },
    { title: "开发资料", path: "/NC_yxq0517/index.html", icon: home9, iframe: true }
];

class NCMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        updateAppTitle("了解NC");
    }
    render() {
        return <MenuList className="nc_menu" menuList={menuList} />;
    }
}
export default NCMenu;
