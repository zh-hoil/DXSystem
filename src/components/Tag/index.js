import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            text: ""
        }
    }

    componentWillMount () {
        switch (this.props.themeDocSort) {
            case 0:
                this.setState({
                    color: "blue",
                    text: "功能特性"
                })
                break;
            case 1: 
                this.setState({
                    color: "purple",
                    text: "培训课件"
                })
                break;
        }
    }

    render() {
        return (
            <div style={{color: this.state.color}} className="tag">
                {this.state.text}
            </div>
        );
    }
}

Tag.propsType = {
    themeDocSort: PropTypes.number.isRequired
}

export default Tag;
