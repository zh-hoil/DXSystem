import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Evaluate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="evaluate">
                <span>{this.props.evaluate}% </span>
                好评
            </div>
        );
    }
}

Evaluate.defaultProps = {
    evaluate: 0
}
Evaluate.propsType = {
    evaluate: PropTypes.string.isRequired
}
export default Evaluate;
