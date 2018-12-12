import React from "react";
import PropTYpes from "prop-types";

const Stars = props => {
    let str = "";
    for(let i=0; i<props.count; i++) {
        str += "⭐"
    }
    return (
        <div className="stars">
            {str}
        </div>
    )
}
Stars.propsType = {
    count: PropTYpes.number.isRequired
}
export default Stars;
