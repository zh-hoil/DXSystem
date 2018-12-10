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

    componentWillMount () {
        switch (this.props.type) {
            case "功能特性":
                this.setState({
                    color: "blue"
                })
                break;
            case "课件文档": 
                this.setState({
                    color: "purple"
                })
                break;
            default:
                this.setState({
                    color: "white"
                })
        }
    }

    render() {
        return (
            <div style={{color: this.state.color}} className="tag">
                {this.props.type}
            </div>
        );
    }
}

Tag.propsType = {
    type: PropTypes.string.isRequired
}

export default Tag;
