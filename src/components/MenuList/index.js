import React from "react";
import { Link } from "react-router-dom";
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
                <div
                    style={{
                        width: "30px",
                        height: "30px",
                        background: `url(${icon}) no-repeat center center`,
                        backgroundSize: "contain"
                    }}
                />
                <span>{title}</span>
            </a>
        );
    }
    return (
        <Link to={path} className="menu-item">
            <div
                style={{
                    width: "30px",
                    height: "30px",
                    background: `url(${icon}) no-repeat center center`,
                    backgroundSize: "contain"
                }}
            />
            <span>{title}</span>
        </Link>
    );
};
export default MenuList;
