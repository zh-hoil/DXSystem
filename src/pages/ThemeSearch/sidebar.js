import React from "react";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";
import { userId, Get } from "Public/js/Ajax";
import { Tabs, Radio, List } from "antd-mobile";

const RadioItem = Radio.RadioItem;
const THEMEFIELDVERDSIONURL = "/getNCCloudThemeVersion";    //获取版本数据接口
const tabs = [          //用于渲染切换页
    { title: "menu" },
    { title: "领域" },
    { title: "版本" },
    { title: "主题类型" },
    { title: "状态" }
];
let filterVersion = []; //存放筛选版本
let filterType = [];    //存放筛选版本
let filterStatus = [];  //存放筛选版本


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themeFieldId: "",       //当前筛选主题域id
            filter: "",             //筛选字符串   
            page: 0,                //当前页
            version: [],            //可选版本数据
            type: [                 //可选类型数据
                { type: "功能特性", checked: true },
                { type: "应用方案", checked: true },
                { type: "最佳实践", checked: true },
                { type: "竞争分析", checked: true },
                { type: "培训课件", checked: true },
                { type: "移动app", checked: true },
                { type: "微信应用", checked: true }
            ],
            status: [               //可选状态数据
                { status: "正式版", checked: true },
                { status: "孵化版", checked: true },
                { status: "在研", checked: true },
                { status: "预研", checked: true }
            ]
        };
    }

    componentWillMount() {
        this._getThemeVersion();
    }

    //获取版本数据
    _getThemeVersion() {
        Get(
            THEMEFIELDVERDSIONURL,
            {
                userId: userId
            },
            res => {
                let version = res.data;
                version.map((item) => item.checked = true);
                this.setState({
                    version: version
                });
            }
        );
    }

    //重置数据
    _backState(page) {
        switch (page) {
            case 1:
                this.setState({
                    themeFieldId: this.props.themeFieldId
                });
                break;
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

    //取消按钮事件
    onOpenChange() {
        if (this.props.open) {
            if (this.state.page > 0) {
                //恢复默认数据
                this._backState(this.state.page);
                this.setState({
                    page: 0
                });
            } else {
                //关闭弹窗
                if (this.props.updateData) {
                    this.props.updateData({ open: !this.props.open });
                }
            }
        }
    }

    //获取某数组字符串
    _getArrString(arr) {
        if (arr.length) {
            let str = "";
            for (let item of arr) {
                str = str + item + ",";
            }
            return str.substring(0, str.length - 1);
        }
    }

    //获取筛选字符串
    _getFilterKeys() {
        let keys = [];

        filterVersion = this.state.version.filter((item) => item.checked).map((item) => item.version);
        filterType = this.state.type.filter((item) => item.checked).map((item) => item.type);
        filterStatus = this.state.status.filter((item) => item.checked).map((item) => item.status);

        if (this._getArrString(filterVersion)) {
            keys.push(this._getArrString(filterVersion));
        }
        if (this._getArrString(filterType)) {
            keys.push(this._getArrString(filterType));
        }
        if (this._getArrString(filterStatus)) {
            keys.push(this._getArrString(filterStatus));
        }
        if (keys.length) {
            return keys.join("&");
        }
        return "";
    }

    //确定按钮
    handleFilter() {
        if (this.props.open) {
            if (this.state.page > 0) {
                this.setState({
                    page: 0
                    //再设置其他数据
                });
            } else {
                //关闭弹窗
                if (this.props.updateData) {
                    this.props.updateData({
                        open: !this.props.open,
                        themeFieldId: this.state.themeFieldId
                    });
                }
                let filter = this._getFilterKeys();
                if (this.props.updateData) {
                    this.props.updateData({ filter })
                }
            }
        }
    }

    //主题域选择
    onFieldChange(themeFieldId) {
        this.setState({
            themeFieldId
        });
    }

    //切换页面
    handlePage(page) {
        this.setState({
            page: page
        });
    }


    //筛选按钮执行的函数
    handleSearchBack() {
        if (this.props.updateData) {
            this.props.updateData({ open: true });
        }
    }

    /**
     *
     * @param {*} type 数据源
     * @param {*} index 下标
     */
    multipleControl(key, index) {
        let arrList = this.state[key];
        let item = JSON.parse(JSON.stringify(arrList[index]));
        item.checked = !item.checked;
        arrList[index] = item;
        let obj = {};
        obj[key] = arrList;
        this.setState({
            ...obj
        });
    }

    render() {
        return (
            <div className="sidebar-wrapper">
                <div className="drawer-top">
                    <span
                        className="drawer-top-operation"
                        onClick={this.onOpenChange.bind(this)}
                    >
                        返回
                    </span>
                    <span className="drawer-top-title">筛选</span>
                    <span
                        className="drawer-top-operation"
                        onClick={this.handleFilter.bind(this)}
                    >
                        确定
                    </span>
                </div>
                <Tabs
                    tabs={tabs}
                    page={this.state.page}
                    style={{ height: "100%", backgroundColor: "#fff" }}
                >
                    <div style={{ height: "100%", backgroundColor: "#fff" }}>
                        <List >
                            {tabs.map((item, i) => {
                                if (i === 0) return;
                                return (
                                    <List.Item
                                        key={i}
                                        className='tabs_list_item'
                                        onClick={this.handlePage.bind(this, i)}
                                    >
                                        <span>{item.title}</span>
                                        <i className='iconfont icon-enter' />
                                    </List.Item>
                                );
                            })}
                        </List>
                    </div>
                    <div style={{ height: "100%", backgroundColor: "#fff" }}>
                        <List className='filtrate_list'>
                            {this.props.themeFields.map(i => (
                                <RadioItem
                                    key={i.id}
                                    className="filtrate_list_item"
                                    checked={this.state.themeFieldId === i.id}
                                    onClick={() => this.onFieldChange(i.id)}
                                >
                                    {i.field}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: "100%", backgroundColor: "#fff" }}>
                        <List className='filtrate_list'>
                            {this.state.version.map((i, index) => (
                                <RadioItem
                                    key={index}
                                    checked={i.checked}
                                    className="filtrate_list_item"
                                    onClick={() => {
                                        this.multipleControl("version", index);
                                    }}
                                >
                                    {i.version}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: "100%", backgroundColor: "#fff" }}>
                        <List className='filtrate_list'>
                            {this.state.type.map((i, index) => (
                                <RadioItem
                                    key={index}
                                    checked={i.checked}
                                    className="filtrate_list_item"
                                    onClick={() => {
                                        this.multipleControl("type", index);
                                    }}
                                >
                                    {i.type}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: "100%", backgroundColor: "#fff" }}>
                        <List className='filtrate_list'>
                            {this.state.status.map((i, index) => (
                                <RadioItem
                                    key={index}
                                    checked={i.checked}
                                    className="filtrate_list_item"
                                    onClick={() => {
                                        this.multipleControl("status", index);
                                    }}
                                >
                                    {i.status}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                </Tabs>
            </div>
        );
    }
}
Sidebar = connect(
    state => ({
        open: state.themeSearchData.open,
        filter: state.themeSearchData.filter,
        themeFieldId: state.themeSearchData.themeFieldId,
        themeFields: state.themeSearchData.themeFields
    }),
    { updateData }
)(Sidebar);

export default Sidebar
