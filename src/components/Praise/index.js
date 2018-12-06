import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Praise extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handlePraise() {

    }

    render() {
        return (
            <div className="praise" onClick={this.handlePraise.bind(this)}>
                {`👍 ${this.props.praise}`}
            </div>
        )
    }
}
Praise.propsType = {
    praise: PropTypes.number.isRequired
}
export default Praise;
