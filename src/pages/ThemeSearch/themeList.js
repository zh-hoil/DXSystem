import React from "react";
import Data from "./themeList.json";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr, sortBy } from "Src/utils";
import { userId, Get, Post } from "Public/js/Ajax";

const THEMEFIELDURL = "/getNCCloudThemeField";
const THEMELISTURL = "/getNCCloudThemeList";

class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themeFields: [],
            themeList: [],
            themeFieldId: "",
            label: 1, //1 按好评排序 0 按时间排序
            themes: null,
            theme_docs: null,
            theme_id: 1,
            sortable: "evaluate"
        }
    }

    componentWillMount() {
        this._initData()
    }

    _initData() {
        this._getThemeFields();
        this.setState((preState) => {
            let id = Data.data[0].id;
            let themes = Data.data;

            //看theme_docs是否可以直接从接口获取 
            let theme_docs = sortBy(themes[id - 1].docs, this.state.sortable, false);
            return {
                ...preState,
                theme_id: id,
                themes: themes,
                theme_docs: theme_docs
            }
        })
    }

    _getThemeFields () {
        Get(THEMEFIELDURL, {
            userId: userId
        }, (res) => {
            let themeFields = res.data;
            let themeFieldId = themeFields[0].id;

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
            // let themeFields = res.data;
            // let themeFieldId = themeFields[0].id;

            // this.setState({
            //     themeFields: themeFields,
            //     themeFieldId: themeFieldId
            // })
            console.log("这里是获取主题域详细文档的数据")
            console.log(res)

            let themeList = res.data;

            if(themeFields) {
                this.setState({
                    themeFields: themeFields,
                    themeFieldId: themeFieldId,
                    themeList: themeList
                })
            }else{
                this.setState({
                    themeFieldId: themeFieldId,
                    themeList: themeList
                })
            }
            
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

        

        //获取新的theme_docs
        //这里看是否直接从接口获取
        this._getThemeList(currentFieldId, this.state.themeFields, this.state.label)
        // let current_theme_docs = this.state.themes[currentId - 1].docs;
        // let sortBoolean = false;

        // if (this.state.sortable == "time") {
        //     sortBoolean = true
        // }
        // let theme_docs = sortBy(current_theme_docs, this.state.sortable, sortBoolean);
        // this.setState({
        //     ...this.state,
        //     theme_id: currentId,
        //     theme_docs: theme_docs
        // })
    }

    handleSort(key) {
        if (key === undefined) {
            return
        }
        if (key === this.state.label) {
            return
        }
        // this._getThemeList(this.state.themeFieldId)
        this.setState({
            label: key
        })
        
        this._getThemeList(this.state.themeFieldId, this.state.themeFields, key)
        
        // this.setState((preState) => {
        //     let sortBoolean = false;
        //     if (key == "time") {
        //         sortBoolean = true
        //     }
        //     let result = sortBy(preState.theme_docs, key, sortBoolean);
        //     console.log(result)
        //     return {
        //         ...preState,
        //         theme_docs: result,
        //         sortable: key
        //     }
        // })
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
                <div className="theme-docs">
                    <div className="sortable">
                        <span className={this.state.label == 1 ? "active" : ""} onClick={this.handleSort.bind(this, 1)}>好评</span>
                        <span>|</span>
                        <span className={this.state.label == 0 ? "active" : ""} onClick={this.handleSort.bind(this, 0)}>时间</span>
                    </div>
                    <ThemeDocs themeList={this.state.themeList} />
                </div>
            </div>
        );
    }
}
export default ThemeList;
