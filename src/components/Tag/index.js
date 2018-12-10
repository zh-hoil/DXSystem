import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ""
        }
    }

    _getColor (type) {
        switch (type) {
            case "功能特性":
                return { color: "blue" }
            case "课件文档": 
                return { color: "purple" }
            default:
                return { color: "white" }
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
