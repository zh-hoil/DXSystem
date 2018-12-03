import React from "react";
import ThemeDoc from "./themeDoc";
import { getTargetAttr } from "Src/utils";
import { List } from "antd-mobile";
class ThemeCocs extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDetails (e) {
        let theme_doc_id = getTargetAttr(e.target, "id");
        if(!theme_doc_id) {
            return 
        }
        window.location.hash =  "/themeDetials/" + theme_doc_id
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
export default ThemeCocs;
