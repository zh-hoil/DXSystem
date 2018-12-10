import React from "react";
import PropTypes from "prop-types";
import Recommend from "./recommend.js";
import { getTargetAttr } from "Src/utils";
import "./index.less";
class Recommends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        
    }

    handleDetails(e) {
        let theme_doc_id = getTargetAttr(e.target, "id");
        if (!theme_doc_id) {
            return
        }
        if (isNaN(parseInt(theme_doc_id))) {
            return
        }
        window.location.hash = "/themeDetails/" + theme_doc_id
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
export default Recommends;
