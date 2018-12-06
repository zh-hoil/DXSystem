import React from "react";
import PropTypes from "prop-types";
import Recommend from "./recommend.js";
import "./index.less";
class Recommends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log(this.props.recommends);
        console.log(Recommend)
    }
    render() {
        return (
            this.props.recommends.map((recommend, index) => (
                <Recommend key={index} recommend={recommend} />
            ))
        )
    }
}
Recommends.propsType = {
    recommends: PropTypes.array.isRequired
}
export default Recommends;
