//点赞组件

import React from "react";
import PropTypes from "prop-types";
import "./index.less";

const Praise = props => (
    <div className="praise" onClick={() => { props.onClick(props)}}>
        {(props.favorw === "true" ? "👍":"☞") + " " + props.favorwnum}
    </div>
)
Praise.propsType = {
    favorw: PropTypes.string.isRequired,
    favorwnum: PropTypes.string.isRequired
}

export default Praise;
