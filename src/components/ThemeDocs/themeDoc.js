import React from "react";
import "./themeDoc.less";
import PropTypes from "prop-types";
import Tag from "Components/Tag";
import Evaluate from "Components/Evaluate";
import program from "Assets/images/program.png";
class ThemeDoc extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let theme = this.props
        return (
            <div themeid={theme.themeId} className="theme-doc">
                <div className="theme-title">
                    <div className="icon" >
                        <img src={program}  />
                    </div>
                    <div className="title">
                        <div className="title-text">{theme.title}</div>
                        <div>
                            <Tag type={theme.type} />
                            <Evaluate evaluate={theme.score}/>
                        </div>
                    </div>
                </div>
                <div className="theme-message">{theme.description}</div>
            </div>
        );
    }
}

ThemeDoc.propsType = {
    doc_id: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    themeDocSort: PropTypes.number,
    evaluate: PropTypes.number,
    message: PropTypes.string.isRequired
}
export default ThemeDoc;
