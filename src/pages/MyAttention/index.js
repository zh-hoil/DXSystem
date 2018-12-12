import React from "react";
import MenuList from "Components/MenuList";
import { updateAppTitle } from "Public/js/JSBridge";
import "./index.less";
/**
 * 我的关注 二级菜单页面
 */
const menuList = [
    { title: "收藏", path: "/", icon: "icon-sousuoziliao" },
    { title: "个人信息", path: "/", icon: "icon-guanzhu1" },
    { title: "我的提案", path: "/", icon: "icon-guanzhu1" },
    { title: "我的悬赏", path: "/", icon: "icon-guanzhu1" },
    { title: "意见反馈", path: "/", icon: "icon-guanzhu1" }
];
class MyAttention extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        updateAppTitle("我的关注");
    }

    render() {
        return <MenuList className="myAttention_menu" menuList={menuList} />;
    }
}
export default MyAttention;
