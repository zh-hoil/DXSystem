import React from "react";
import PropTypes from "prop-types";
import Recommend from "./recommend.js";
import { getTargetAttr } from "Src/utils";
import "./index.less";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeDetails/action";
class Recommends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        
    }

    handleDetails(e) {
        let themeId = getTargetAttr(e.target, "themeid");
        if(!themeId) {
            return 
        }
        if(this.props.updateData) {
            this.props.updateData({themeId: themeId})  
        }
        window.location.hash =  "/themeDetails/" + themeId;
        window.location.replace(window.location.href);
    }

    render() {
        return (
            <div onClick={this.handleDetails.bind(this)}>
                {
                    this.props.recommends.map((recommend, index) => (
                        <Recommend key={index} recommend={recommend} />
                    ))
                }
            </div>

        )
    }
}
Recommends.propsType = {
    recommends: PropTypes.array.isRequired
}
Recommends = connect((state) => ({
    themeId: state.themeDetailsData.themeId
}),
    { updateData }
)(Recommends)
export default Recommends;
