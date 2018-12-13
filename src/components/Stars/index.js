import React from "react";
import PropTYpes from "prop-types";
import "./index.less";

const Stars = props => {
    let str = [];
    for (let i = 0; i < props.count; i++) {
        str[i] = <i key={i} className="selected iconfont icon-xingxing" />;
    }
    return <div className="stars">{str}</div>;
};
Stars.propsType = {
    count: PropTYpes.number.isRequired
};
export default Stars;
