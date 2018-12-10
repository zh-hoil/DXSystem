import React from "react";
import PropTypes from "prop-types";
// import recommend from 'Assets/images/recommend.png'; 
class Recommend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let recommend = this.props.recommend
        return (
            <div themeid={recommend.themeId} className="recommend">
                <div className="recommend-avatar">
                    <img src={recommend} />
                </div>
                <div className="recommend-detail">
                    <div className="recommend-name">{recommend.title}</div>
                    <div className="recommend-text">{recommend.description}</div>
                </div>
            </div>
        )
    }
}
Recommend.propsType = {
    recommend: PropTypes.object.isRequired
}
export default Recommend;
