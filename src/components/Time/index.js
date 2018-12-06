import React from "react";
import PropTypes from "prop-types";
import "./index.less";
import { formatDate } from "Src/utils";
class Time extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="time">
                {formatDate(this.props.timestamp)}
            </div>
        );
    }
}

Time.propsType = {
    timestamp: PropTypes.number.isRequired
}

export default Time;
