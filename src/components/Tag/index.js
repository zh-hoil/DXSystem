import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ""
        };
    }

    _getColor(type) {
        switch (type) {
            case "应用方案":
                return { color: "#20d7a7" };
            case "功能特性":
                return { color: "#29d9ff" };
            case "最佳实践":
                return { color: "#ff825a" };
            case "竞争分析":
                return { color: "#fa5b5b" };
            case "培训课件":
                return { color: "#ae77f3" };
            case "移动app":
                return { color: "#fdc42b" };
            case "微信应用":
                return { color: "#31d36e" };
            default:
                return { color: "#20d7a7" };
        }
    }

    render() {
        return (
            <div style={this._getColor(this.props.type)} className="tag">
                {this.props.type}
            </div>
        );
    }
}

// Tag.propsType = {
//     type: PropTypes.string.isRequired
// }

export default Tag;
