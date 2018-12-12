import React from "react";
import MenuList from "Components/MenuList";
import { updateAppTitle } from "Public/js/JSBridge";
import './index.less';
/**
 * 关于NC 一线牵 二级菜单页面
 */
const menuList = [
    { title: "关于NC一线牵", path: "/themeSearch", icon: "icon-sousuoziliao" },
    { title: "快速指南", path: "/quickguide", icon: "icon-guanzhu1" },
];

class About extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    componentWillMount() {
        updateAppTitle("关于NC一线牵");
    }
    
    render() {
        return <MenuList className="about_menu" menuList={menuList} />;
    }
}
export default About;
