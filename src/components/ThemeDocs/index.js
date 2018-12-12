import React from "react";
import ThemeDoc from "./themeDoc";
import { getTargetAttr } from "Src/utils";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import "./index.less";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeDetails/action";
class ThemeDocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themeId: ""
        }
    }


    handleDetails (e) {
        let themeId = getTargetAttr(e.target, "themeid");
        
        if(!themeId) {
            return 
        }

        this.setState({
            themeId: themeId
        })
        if(this.props.updateData) {
            this.props.updateData({themeId: themeId})
        }
        
       window.location.hash =  "/themeDetails/" + themeId
    }

    render() {
        return (
            <div className="list">
                <List onClick={this.handleDetails.bind(this)}>
                    {
                        this.props.themeList.map((theme, i) => (
                            <List.Item  key={i}>
                                <ThemeDoc {...theme} />
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        )
    }
}
ThemeDocs.propsType = {
    themeList: PropTypes.array
}

ThemeDocs = connect((state) => ({
    themeId: state.themeDetailsData.themeId
}),
    { updateData }
)(ThemeDocs)
export default ThemeDocs;
