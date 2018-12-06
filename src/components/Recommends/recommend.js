import React from "react";
import PropTypes from "prop-types";
class Recommend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const recommend = this.props.recommend;
        return (
            <div className="recommend">
                <div className="recommend-avatar">
                    <img src="#" />
                </div>
                <div className="recommend-detail">
                    <div className="recommend-name">{recommend.title}</div>
                    <div className="recommend-text">{recommend.message}</div>
                </div>
            </div>
        )
    }
}
Recommend.propsType = {
    Recommend: PropTypes.object.isRequired
}
export default Recommend;
