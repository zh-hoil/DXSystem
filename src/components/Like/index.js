import React from "react";
import "./index.less";
import PropTypes from "prop-types";

const Like = props => (
    <div className="like" onClick={props.onClick}>
        {props.follow === "true" ? <i className="iconfont icon-like"/> : <i className="iconfont icon-like_fill"/>}
    </div>
)
Like.propsType = {
    follow: PropTypes.string.isRequired
}
export default Like;
