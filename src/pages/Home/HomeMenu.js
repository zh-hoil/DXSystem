import React from "react";
import { Link } from "react-router-dom";
import MenuList from "Components/MenuList";

const menuList = [
    { title: "公告", path: "/", icon: "" },
    { title: "了解 NC Cloud", path: "/ncc", icon: "" },
    { title: "了解 NC", path: "/nc", icon: "" },
    { title: "我的关注", path: "/", icon: "" },
    { title: "关于 NC 一线牵", path: "/", icon: "" }
];

class HomeMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    creatMenuitem = (props, index) => {
        let { title, icon, path } = props;
        return (
            <Link key={index} to={path} className="menu-item">
                <div
                    style={{
                        background: `url(${icon}) no-repeat center center`,
                        backgroundSize: "contain"
                    }}
                />
                <span>{title}</span>
            </Link>
        );
    };
    render() {
        return (
            <div className="home_menu">
                <MenuList menuList={menuList} menuItem={this.creatMenuitem} />
            </div>
        );
    }
}
export default HomeMenu;