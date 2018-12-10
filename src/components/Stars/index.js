import React from "react";
import PropTYpes from "prop-types";
class Stars extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const count = this.props.count;
        let str = "";
        for(let i=0; i<count; i++) {
            str += "⭐"
        }
        return (
            <div className="stars">
                {str}
            </div>
        )
    }
}
Stars.propsType = {
    count: PropTYpes.number.isRequired
}
export default Stars;
