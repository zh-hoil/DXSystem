import React from "react";
import { Link } from "react-router-dom";
import MenuList from "Components/MenuList";
import { getLocalStorage } from "./../../utils";

const menuList = [
    { title: "公告", path: "/", icon: "icon-gonggao" },
    { title: "了解 NC Cloud", path: "/ncc", icon: "icon-nccloud" },
    {
        title: "了解 NC",
        path: `/NCapp3/index.html#Z-home?token=${getLocalStorage(
            "YY_userInfo"
        )}`,
        icon: "icon-nc",
        iframe: true
    },
    { title: "我的关注", path: "/", icon: "icon-guanzhu" },
    { title: "关于 NC 一线牵", path: "/", icon: "icon-guanyunc" }
];

class HomeMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    creatMenuitem = (props, index) => {
        let { title, icon, path, iframe } = props;
        if (iframe) {
            return (
                <a href={path} key={index} className="menu-item">
                    <div className="menu-icon">
                        <i className={`iconfont ${icon}`} />
                    </div>

                    <span>{title}</span>
                </a>
            );
        }
        return (
            <Link key={index} to={path} className="menu-item">
                <div className="menu-icon">
                    <i className={`iconfont ${icon}`} />
                </div>
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
