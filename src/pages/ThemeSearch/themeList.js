import React from "react";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";
import { Toast } from "antd-mobile";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr } from "Src/utils";
import { userId, Get } from "Public/js/Ajax";

const THEMELISTURL = "/getNCCloudThemeList";
const THEMEFIELDURL = "/getNCCloudThemeField";

class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            themeList: [], //存放每次获取到的主题列表
            label: 1       //1 按好评排序 0 按时间排序
        };
    }

    componentWillMount() {
        this._getThemeFields();
    }

    componentWillReceiveProps(newProps) {
        let oldProps = this.props;
        console.log(oldProps)
        console.log(newProps)
        if ((JSON.stringify(newProps.filter) !== JSON.stringify(oldProps.filter) && !newProps.filter) 
            || newProps.themeFieldId !== oldProps.themeFieldId) {
            this._getThemeList(newProps.themeFieldId, newProps.themeFields, this.state.label, newProps.filter)
        }
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
            },
            err => {
                Toast.info("网络错误", 1)
            }
        );
    }


    //获取主题域详细文档数据
    _getThemeList(themeFieldId, themeFields, label, filter) {
        let data = {
            userId: userId,
            fieldId: themeFieldId,
            label: label
        }
        console.log(filter)
        if (filter) {
            console.log(filter)
            // let version = filterArr[0];
            // let type = filterArr[1];
            // let status = filterArr[2];
            // console.log(filter, filterArr)
            return
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
            },
            err => {
                Toast.info("网络错误", 1)
            }
        );
    }

    //点击左侧领域加载列表数据
    handleSelectField(e) {
        let currentFieldId = getTargetAttr(e.target, "fieldid");
        if (!currentFieldId) {
            return;
        }
        if (currentFieldId == this.state.themeFieldId) {
            //无变化
            return;
        }
        //更新themeFieldId
        if (this.props.updateData) {
            this.props.updateData({ themeFieldId: currentFieldId })
        }
    }

    //切换排序方式
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
        filter: state.themeSearchData.filter,
        themeFieldId: state.themeSearchData.themeFieldId,
        themeFields: state.themeSearchData.themeFields
    }),
    { updateData }
)(ThemeList);
export default ThemeList;
