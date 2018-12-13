import React from "react";
// import Data from "./themeList.json";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr } from "Src/utils";
import { userId, Get, Post } from "Public/js/Ajax";

const THEMELISTURL = "/getNCCloudThemeList";

class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            themeList: [],
            label: 1, //1 按好评排序 0 按时间排序
        }
    }

    componentWillMount() {
        this.setState({
            ...this.props
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let themeFields = nextProps.themeFields;
        let themeFieldId = nextProps.themeFieldId;
        let filter = nextProps.filter;
        this._getThemeList(themeFieldId, themeFields, this.state.label, filter)
    }

    //获取主题域详细文档数据
    _getThemeList(themeFieldId, themeFields, label, filter) {
        // let version = "";
        // let type = "";
        // let status = "";
        let filterArr = filter.split("&");
        let version = filterArr[0];
        let type = filterArr[1];
        let status = filterArr[2]

        console.log(version)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

        Get(THEMELISTURL, {
            userId: userId,
            fieldId: themeFieldId,
            label: label,
            version: version,
            type: type, 
            status: status
        }, (res) => {
            console.log("这里是获取主题域详细文档的数据")
            console.log(res)

            let themeList = res.data;

            if (themeFields) {
                this.setState({
                    themeFields: themeFields,
                    themeFieldId: themeFieldId,
                    themeList: themeList,
                    filter: filter
                })
            } else {
                this.setState({
                    themeFieldId: themeFieldId,
                    themeList: themeList,
                    filter: filter
                })
            }

            console.log(this.state)

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
        if (currentFieldId == this.state.themeFieldId) {
            //无变化
            return
        }

        this._getThemeList(currentFieldId, this.state.themeFields, this.state.label, this.state.filter)
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

        this._getThemeList(this.state.themeFieldId, this.state.themeFields, label, this.state.filter);
    }

    handleDetails = (e) => {
        let themeId = getTargetAttr(e.target, "themeid");

        if (!themeId) {
            return;
        }
        window.location.hash = "/themeDetails/" + themeId;
    }



    render() {
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul onClick={this.handleSelectField.bind(this)}>
                        {
                            this.state.themeFields.map((field, index) => (
                                <li key={index} fieldid={field.id} className={field.id == this.state.themeFieldId ? "active" : ""}>{field.field}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-docs-wrapper">
                    <div className="sortable">
                        <span className={this.state.label == 1 ? "active" : ""} onClick={this.handleSort.bind(this, 1)}>好评</span>
                        <span>|</span>
                        <span className={this.state.label == 0 ? "active" : ""} onClick={this.handleSort.bind(this, 0)}>时间</span>
                    </div>
                    <ThemeDocs themeList={this.state.themeList} onClick={this.handleDetails} />
                </div>
            </div>
        );
    }
}
export default ThemeList;
