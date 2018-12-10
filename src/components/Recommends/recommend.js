import React from "react";
import PropTypes from "prop-types";
import recommend from 'Assets/images/recommend.png'; 
class Recommend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.recommend.doc_id} className="recommend">
                <div className="recommend-avatar">
                    <img src={recommend} />
                </div>
                <div className="recommend-detail">
                    <div className="recommend-name">{this.props.recommend.title}</div>
                    <div className="recommend-text">{this.props.recommend.message}</div>
                </div>
            </div>
        )
    }
}
Recommend.propsType = {
    recommend: PropTypes.object.isRequired
}
export default Recommend;
