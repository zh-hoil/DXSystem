import React from "react";
import MenuList from "Components/MenuList";
import home1 from 'Assets/images/home1.png'; // 搜索资料
import home7 from 'Assets/images/home7.png'; // 我的关注
import home5 from 'Assets/images/home5.png'; // 排行榜
import home6 from 'Assets/images/home6.png'; // 图表统计
import './index.less';

const menuList = [
    { title: "搜索资料", path: "/", icon: home1 },
    { title: "我的关注", path: "/", icon: home7 },
    { title: "排行榜", path: "/", icon: home5 },
    { title: "图表统计", path: "/", icon: home6 }
];

class NCCMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <MenuList className="ncc_menu" menuList={menuList} />;
    }
}
export default NCCMenu;
