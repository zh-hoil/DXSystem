import React from "react";
import "./index.less";
const SimpleListMenu = props => {
    return (
        <div className={`simple_list_menu ${props.className}`}>
            {props.menuList.map((item, index) => {
                return (
                    <a key={index} href={`${item.path}`} className="list_item">
                        <div className="list_item_left">
                            <div className="list_item_icon">
                                <i className={`iconfont ${item.icon}`} />
                            </div>
                            <span>{item.title}</span>
                        </div>
                        <i className="iconfont icon-enter" />
                    </a>
                );
            })}
        </div>
    );
};
export default SimpleListMenu;
