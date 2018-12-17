import React from "react";
import "./index.less";
import PropTypes from "prop-types";
const Grade = props => (
    <div className="grade">
        {
            [1, 2, 3, 4, 5].map((i, index) => (
                <span key={index} onClick={() => { props.handlePraise(index + 1) }}>
                    {index < props.grade ? <i className="selected iconfont icon-xingxing" /> : <i className="unselected iconfont icon-xingxing" />}
                </span>
            ))
        }
    </div>
)

Grade.propsType = {
    grade: PropTypes.number.isRequired,
    handlePraise: PropTypes.func.isRequired
}

export default Grade;
