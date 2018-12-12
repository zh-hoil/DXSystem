import React from "react";
import MenuList from "Components/MenuList";
import { updateAppTitle } from "Public/js/JSBridge";
import './index.less';

const menuList = [
    { title: "搜索资料", path: "/themeSearch", icon: "icon-sousuoziliao" },
    { title: "我的关注", path: "/", icon: "icon-guanzhu1" },
    { title: "排行榜", path: "/", icon: "icon-paihangbang" },
    { title: "图表统计", path: "/", icon: "icon-tubiaotongji" }
];

class NCCMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    componentWillMount() {
        updateAppTitle("了解NC Cloud");
    }
    
    render() {
        return <MenuList className="ncc_menu" menuList={menuList} />;
    }
}
export default NCCMenu;
