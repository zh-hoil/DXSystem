import React from "react";
import PropTypes from "prop-types";
import Recommend from "./recommend.js";
import "./index.less";
const Recommends = props => {
    return (
        <div onClick={props.onClick}>
            {props.recommends.map((recommend, index) => (
                <Recommend key={index} recommend={recommend} />
            ))}
        </div>
    );
};
Recommends.propsType = {
    recommends: PropTypes.array.isRequired
};
export default Recommends;
