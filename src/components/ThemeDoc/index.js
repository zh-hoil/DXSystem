import React from "react";
import "./index.less";
import Tag from "Components/Tag";
import Evaluate from "Components/Evaluate";
import PropTypes from "prop-types";
class ThemeDoc extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.doc_id} className="theme-doc">
                <div className="theme-title">
                    <div  className="icon" >
                        <img src={this.props.imgSrc}  />
                    </div>
                    <div className="title">
                        <div className="title-text">{this.props.title}</div>
                        <div>
                            <Tag themeDocSort={this.props.themeDocSort} />
                            <Evaluate evaluate={this.props.evaluate}/>
                        </div>
                    </div>
                </div>
                <div className="theme-message">{this.props.message}</div>
            </div>
        );
    }
}

ThemeDoc.propsType = {
    doc_id: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    themeDocSort: PropTypes.number.isRequired,
    evaluate: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
}
export default ThemeDoc;
