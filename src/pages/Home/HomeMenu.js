import React from "react";
import { Link } from "react-router-dom";

const menuList = [
    { title: "公告", path: "/", icon: "" },
    { title: "了解 NC Cloud", path: "/", icon: "" },
    { title: "了解 NC", path: "/", icon: "" },
    { title: "我的关注", path: "/", icon: "" },
    { title: "关于 NC 一线牵", path: "/", icon: "" }
];


class HomeMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="home_menu">
                <MenuCon menuList={menuList} />
            </div>
        );
    }
}

class MenuCon extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="menu-container">
                {this.props.menuList.map((item, index) => {
                    return <MenuItem key={index} {...item} />;
                })}
            </div>
        );
    }
}

const MenuItem = props => {
    let { title, icon, path } = props;
    return (
        <Link to={path} className="menu-item">
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
export default HomeMenu;
