import React from "react";
import SearchBar from "Components/SearchBar";
import ThemeList from "./ThemeList";
import { Drawer, Tabs, Radio, Checkbox, List } from 'antd-mobile';
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";
import { hasItemInArr } from "Src/utils";

const THEMEFIELDURL = "/getNCCloudThemeField";
const THEMEFIELDVERDSIONURL = "/getNCCloudThemeVersion";

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const tabs = [
    { title: "menu" },
    { title: "领域" },
    { title: "版本" },
    { title: "主题类型" },
    { title: "状态" }
]
let filterVersion = [];
let filterType = [];
let filterStatus = [];
class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoolean: false,
            themeFieldId: "",
            filter: "",
            page: 0,
            version: [],
            type: [
                { type: "功能特性" },
                { type: "应用方案" },
                { type: "最佳实践" },
                { type: "竞争分析" },
                { type: "培训课件" },
                { type: "移动app" },
                { type: "微信应用" },
            ],
            status: [
                { status: "正式版" },
                { status: "傅桦斑" },
                { status: "在研" },
                { status: "预研" }
            ]
        }
    }

    componentWillMount() {
        this._getThemeFields()
        this._getThemeVersion()
    }

    _getThemeFields() {
        Get(THEMEFIELDURL, {
            userId: userId
        }, (res) => {
            let themeFields = res.data;
            let themeFieldId = themeFields[0].id;
            this.setState({
                themeFieldId
            })

            if (this.props.updateData) {
                this.props.updateData({ themeFieldId, themeFields })
            }
        }, (err) => {
            console.log(err)
        })
    }

    _getThemeVersion() {
        Get(THEMEFIELDVERDSIONURL, {
            userId: userId
        }, (res) => {
            let version = res.data;
            this.setState({
                version: version
            })
        }, (err) => {
            console.log(err)
        })
    }

    _backState(page) {
        switch (page) {
            case 2:
                filterVersion = [];
                break;
            case 3:
                filterType = [];
                break;
            case 4:
                filterStatus = [];
                break;
        }
    }

    onOpenChange() {
        if (this.props.open) {
            if (this.state.page > 0) {
                //恢复默认数据
                this._backState(this.state.page)
                this.setState({
                    page: 0
                })
            } else {
                //关闭弹窗
                if (this.props.updateData) {
                    this.props.updateData({ open: !this.props.open })
                }
            }
        }

    }

    _getArrString (arr) {
        if (arr.length) {
            let str = "";
            for (let item of arr) {
                str = str + item + ","
            }
            return ("version=" + str.substring(0, str.length - 1));
        }
    }

    _getFilterKeys() {
        let keys = [];
        if(this._getArrString(filterVersion)){
            keys.push(this._getArrString(filterVersion));
        }
        if(this._getArrString(filterType)){
            keys.push(this._getArrString(filterType));
        }
        if(this._getArrString(filterStatus)){
            keys.push(this._getArrString(filterStatus));
        }
        if(keys.length) {
            return keys.join("&")
        }else{
            return ""
        }
        
    }

    handleFilter() {
        if (this.props.open) {
            if (this.state.page > 0) {
                this.setState({
                    page: 0
                    //再设置其他数据
                })
            } else {
                //关闭弹窗
                if (this.props.updateData) {
                    this.props.updateData({ open: !this.props.open, themeFieldId: this.state.themeFieldId })

                }
                let filter = this._getFilterKeys();
                console.log(filter)
                this.setState({
                    filter
                })
            }
        }
    }

    onFieldChange(themeFieldId) {
        this.setState({
            themeFieldId
        })
    }


    onVersionChange(version) {
        if (hasItemInArr(filterVersion, version)) {
            let index = filterVersion.indexOf(version)
            filterVersion.splice(index, 1)
        } else {
            filterVersion.push(version)
        }
    }

    onTypeChange(type) {
        if (hasItemInArr(filterType, type)) {
            let index = filterType.indexOf(type)
            filterType.splice(index, 1)
        } else {
            filterType.push(type)
        }
    }

    onStatusChange(status) {
        if (hasItemInArr(filterStatus, status)) {
            let index = filterStatus.indexOf(status)
            filterStatus.splice(index, 1)
        } else {
            filterStatus.push(status)
        }
    }

    handlePage(page) {
        this.setState({
            page: page
        })
    }

    //点击搜索框执行的操作
    handleSearch() {
        const searchHistory = "/searchHistory";
        if (this.state.searchBoolean) {
            return
        }
        window.location.hash = searchHistory
    }

    //筛选按钮执行的函数
    handleSearchBack() {
        if (this.props.updateData) {
            this.props.updateData({ open: true })
        }
    }

    render() {
        const sidebar = (
            <div className="sidebar-wrapper">
                <div className="drawer-top">
                    <span className="drawer-top-operation" onClick={this.onOpenChange.bind(this)}>返回</span>
                    <span className="drawer-top-title">筛选</span>
                    <span className="drawer-top-operation" onClick={this.handleFilter.bind(this)}>确定</span>
                </div>
                <Tabs tabs={tabs}
                    page={this.state.page}
                    style={{ height: '100%', backgroundColor: '#fff' }}
                >
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {
                                tabs.map((item, i) => {
                                    if (i === 0) return
                                    return (
                                        <List.Item key={i} onClick={this.handlePage.bind(this, i)}>{item.title} <span style={{ float: "right" }}>{">"}</span></List.Item>
                                    )
                                })
                            }
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {this.props.themeFields.map(i => (
                                <RadioItem key={i.id} checked={this.props.themeFieldId === i.id} onClick={() => this.onFieldChange(i.id)}>
                                    {i.field}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {this.state.version.map((i, index) => (
                                <CheckboxItem key={index} onChange={() => this.onVersionChange(i.version, index)}>
                                    {i.version}
                                </CheckboxItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {this.state.type.map((i, index) => (
                                <CheckboxItem key={index} onChange={() => { this.onTypeChange(i.type, index) }}>
                                    {i.type}
                                </CheckboxItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {this.state.status.map((i, index) => (
                                <CheckboxItem key={index} onChange={() => this.onStatusChange(i.status, index)}>
                                    {i.status}
                                </CheckboxItem>
                            ))}
                        </List>
                    </div>
                </Tabs>
            </div>
        );
        return (
            <div className="theme-search">
                <Drawer
                    position="right"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    sidebar={sidebar}
                    open={this.props.open}
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    <SearchBar searchBoolean={this.state.searchBoolean}
                        handleSearch={this.handleSearch.bind(this)}
                        handleSearchBack={this.handleSearchBack.bind(this)}
                    />
                    <ThemeList themeFields={this.props.themeFields} themeFieldId={this.props.themeFieldId} filter={this.state.filter} />
                </Drawer>
            </div>
        )
    }
}
ThemeSearch = connect((state) => ({
    open: state.themeSearchData.open,
    themeFieldId: state.themeSearchData.themeFieldId,
    themeFields: state.themeSearchData.themeFields,
}),
    { updateData }
)(ThemeSearch)
export default ThemeSearch;
