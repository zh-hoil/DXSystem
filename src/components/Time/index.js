import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Time extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="time">
                {this.props.time}
            </div>
        );
    }
}

Time.propsType = {
    time: PropTypes.string.isRequired
}

export default Time;
