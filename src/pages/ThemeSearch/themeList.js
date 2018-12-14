import React from "react";
// import Data from "./themeList.json";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr } from "Src/utils";
import { userId, Get, Post } from "Public/js/Ajax";
import { connect } from "react-redux";
import { Drawer, Tabs, Radio, Checkbox, List } from "antd-mobile";
import { updateData } from "Store/ThemeSearch/action";

const THEMELISTURL = "/getNCCloudThemeList";
const THEMEFIELDURL = "/getNCCloudThemeField";

class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themeList: [],
            label: 1 //1 按好评排序 0 按时间排序
        };
    }

    componentWillMount() {
        this._getThemeFields();
    }

    //获取主题域数据
    _getThemeFields() {
        Get(
            THEMEFIELDURL,
            {
                userId: userId
            },
            res => {
                let themeFields = res.data;
                let themeFieldId = themeFields[0].id;
                if (this.props.updateData) {
                    this.props.updateData({ themeFieldId, themeFields });
                }
                this._getThemeList(this.props.themeFieldId, this.props.themeFields, this.state.label, this.props.filter)
            },
            err => {
                console.log(err);
            }
        );
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     let themeFields = nextProps.themeFields;
    //     let themeFieldId = nextProps.themeFieldId;
    //     let filter = nextProps.filter;
    //     this._getThemeList(themeFieldId, themeFields, this.state.label, filter);
    // }

    //获取主题域详细文档数据
    _getThemeList(themeFieldId, themeFields, label, filter) {
        let data = {
            userId: userId,
            fieldId: themeFieldId,
            label: label
        }
        if(filter){
            let filterArr = filter.split("&");
            let version = filterArr[0];
            let type = filterArr[1];
            let status = filterArr[2];
            data = {
                ...data,
                version: version,
                type: type,
                status: status

            }
        }
        Get(
            THEMELISTURL,
            data,
            res => {
                let themeList = res.data;   
                this.setState({
                    themeList: themeList,
                });
                
            }
        );
    }

    handleSelectField(e) {
        let currentFieldId = getTargetAttr(e.target, "fieldid");
        if (!currentFieldId) {
            return;
        }
        if (currentFieldId == this.state.themeFieldId) {
            //无变化
            return;
        }
        this._getThemeList(
            this.props.themeFieldId,
            this.props.themeFields,
            this.state.label,
            this.props.filter
        );
    }

    handleSort(label) {
        if (label == undefined) {
            return;
        }
        if (label == this.state.label) {
            return;
        }
        this.setState({
            label: label
        });

        this._getThemeList(
            this.props.themeFieldId,
            this.props.themeFields,
            label,
            this.props.filter
        );
    }

    handleDetails = e => {
        let themeId = getTargetAttr(e.target, "themeid");
        if (!themeId) {
            return;
        }
        window.location.hash = "/themeDetails/" + themeId;
    };
    render() {
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul onClick={this.handleSelectField.bind(this)}>
                        {this.props.themeFields.map((field, index) => (
                            <li
                                key={index}
                                fieldid={field.id}
                                className={
                                    field.id == this.props.themeFieldId
                                        ? "active"
                                        : ""
                                }
                            >
                                {field.field}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="theme-docs-wrapper">
                    <div className="sortable">
                        <span
                            className={`tab ${
                                this.state.label == 1 ? "active" : ""
                            }`}
                            onClick={this.handleSort.bind(this, 1)}
                        >
                            好评
                        </span>
                        <span
                            className={`tab ${
                                this.state.label == 0 ? "active" : ""
                            }`}
                            onClick={this.handleSort.bind(this, 0)}
                        >
                            时间
                        </span>
                    </div>
                    <ThemeDocs
                        themeList={this.state.themeList}
                        onClick={this.handleDetails}
                    />
                </div>
            </div>
        );
    }
}

ThemeList = connect(
    state => ({
        open: state.themeSearchData.open,
        themeFieldId: state.themeSearchData.themeFieldId,
        themeFields: state.themeSearchData.themeFields
    }),
    { updateData }
)(ThemeList);
export default ThemeList;
