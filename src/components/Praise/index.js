import React from "react";
import PropTypes from "prop-types";
import "./index.less";
class Praise extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePraise() {

    }

    render() {
        return (
            <div className="praise" onClick={this.handlePraise.bind(this)}>
                {(this.props.favorw?"😒":"👍") + " " + this.props.favorwnum}
            </div>
        )
    }
}

Praise.propsType = {
    favorw: PropTypes.bool.isRequired,
    favorwnum: PropTypes.number.isRequired
}

export default Praise;
