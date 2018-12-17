import React from "react";
import { Link } from "react-router-dom";
import "Assets/iconfont/iconfont.js";
import SvgCom from "Components/SvgCom";
import "./index.less";
class MenuList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { className, menuItem, menuList } = this.props;
        return (
            <MenuCon
                className={className}
                menuItem={menuItem}
                menuList={menuList}
            />
        );
    }
}

class MenuCon extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { className, menuItem, menuList } = this.props;
        return (
            <div className={`menu-container ${className}`}>
                {menuList.map((item, index) => {
                    if (menuItem) {
                        return menuItem(item, index);
                    } else {
                        return <MenuItem key={index} {...item} />;
                    }
                })}
            </div>
        );
    }
}

const MenuItem = props => {
    let { title, icon, path, iframe } = props;
    if (iframe) {
        return (
            <a href={path} className="menu-item">
                <span>{title}</span>
                <div className="menu-icon">
                    <SvgCom width="76" height="76" xlinkHref={icon} />
                </div>
            </a>
        );
    }
    return (
        <Link to={path} className="menu-item">
            <span>{title}</span>
            <div className="menu-icon">
                <SvgCom width="76" height="76" xlinkHref={icon} />
            </div>
        </Link>
    );
};
export default MenuList;
