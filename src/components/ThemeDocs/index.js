import React from "react";
import ThemeDoc from "./themeDoc";
import { getTargetAttr } from "Src/utils";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import "./index.less";
class ThemeDocs extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDetails (e) {
        let theme_doc_id = getTargetAttr(e.target, "id");
        if(!theme_doc_id) {
            return 
        }
        if(isNaN(parseInt(theme_doc_id))){
            return
        }
        window.location.hash =  "/themeDetails/" + theme_doc_id
    }

    render() {
        return (
            <div className="list">
                <List onClick={this.handleDetails.bind(this)}>
                    {
                        this.props.theme_docs.map((doc, i) => (
                            <List.Item  key={i}>
                                <ThemeDoc {...doc} />
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        )
    }
}
ThemeDocs.propsType = {
    theme_docs: PropTypes.object
}
export default ThemeDocs;
