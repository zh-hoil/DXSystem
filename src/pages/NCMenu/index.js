import React from "react";
import MenuList from "Components/MenuList";
import home1 from 'Assets/images/home1.png'; // 搜索资料
import home7 from 'Assets/images/home7.png'; // 我的关注
import home2 from 'Assets/images/home2.png'; // 产品提案
import home4 from 'Assets/images/home4.png'; // 悬赏申请
import home5 from 'Assets/images/home5.png'; // 排行榜
import home6 from 'Assets/images/home6.png'; // 图表统计
import home8 from 'Assets/images/home8.png'; // 账户申请
import home9 from 'Assets/images/home9.png'; // 开发资料
import './index.less';
const menuList = [
    { title: "搜索资料", path: "/", icon: home1 },
    { title: "我的关注", path: "/", icon: home7 },
    { title: "产品提案", path: "/", icon: home2 },
    { title: "悬赏申请", path: "/", icon: home4 },
    { title: "排行榜", path: "/", icon: home5 },
    { title: "图表统计", path: "/", icon: home6 },
    { title: "账户申请", path: "/", icon: home8 },
    { title: "开发资料", path: "/", icon: home9 }
];

class NCMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <MenuList className="nc_menu" menuList={menuList} />;
    }
}
export default NCMenu;
