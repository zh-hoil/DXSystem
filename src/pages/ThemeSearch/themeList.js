import React from "react";
// import Data from "./themeList.json";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr, sortBy } from "Src/utils";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";
import { userId, Get, Post } from "Public/js/Ajax";

const THEMEFIELDURL = "/getNCCloudThemeField";
const THEMELISTURL = "/getNCCloudThemeList";

class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 1, //1 按好评排序 0 按时间排序
        }
    }

    componentDidMount () {
        this._getThemeFields()
    }

    _getThemeFields () {
        Get(THEMEFIELDURL, {
            userId: userId
        }, (res) => {
            let themeFields = res.data;
            let themeFieldId = themeFields[0].id;


            if(this.props.updateData) {
                this.props.updateData({ themeFieldId, themeFields })
            }

            this._getThemeList(themeFieldId, themeFields, this.state.label)
            
            console.log("这里是获取主题域的数据")
            console.log(res)
        }, (err) => {
            console.log(err)
        })
    }
    

    _getThemeList (themeFieldId, themeFields, label) {
        Get(THEMELISTURL, {
            userId: userId,
            fieldId: themeFieldId,
            label: label
        }, (res) => {
            let themeList = res.data;
            if(this.props.updateData) {
                this.props.updateData({
                    themeFieldId: themeFieldId,
                    themeFields: themeFields,
                    themeList: themeList
                })
            }
            console.log("这里是获取主题域详细文档的数据")
            console.log(res)
            
        }, (err) => {
            console.log(err)
        })
    }

    handleSelectField(e) {
        let currentFieldId = getTargetAttr(e.target, "fieldid");
        console.log(currentFieldId)

        if (!currentFieldId) {
            return
        }
        if (currentFieldId == this.props.themeFieldId) {
            //无变化
            return
        }

        this._getThemeList(currentFieldId, this.props.themeFields, this.state.label)
    }

    handleSort(label) {
        if (label === undefined) {
            return
        }
        if (label === this.state.label) {
            return
        }
        // this._getThemeList(this.state.themeFieldId)
        this.setState({
            label: label
        })
        
        this._getThemeList(this.props.themeFieldId, this.props.themeFields, label)
    }

    render() {
        console.log(this.props)
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul onClick={this.handleSelectField.bind(this)}>
                        {
                            this.props.themeFields.map((field, index) => (
                                <li key={index} fieldid={field.id} className={field.id == this.props.themeFieldId ? "active" : ""}>{field.field}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-docs">
                    <div className="sortable">
                        <span className={this.state.label == 1 ? "active" : ""} onClick={this.handleSort.bind(this, 1)}>好评</span>
                        <span>|</span>
                        <span className={this.state.label == 0 ? "active" : ""} onClick={this.handleSort.bind(this, 0)}>时间</span>
                    </div>
                    <ThemeDocs themeList={this.props.themeList} />
                </div>
            </div>
        );
    }
}

ThemeList = connect((state) => ({
    themeFieldId: state.themeSearchData.themeFieldId,
    themeFields: state.themeSearchData.themeFields,
    themeList: state.themeSearchData.themeList
}), 
{updateData})(ThemeList)

export default ThemeList;
