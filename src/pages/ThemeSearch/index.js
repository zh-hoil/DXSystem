import React from "react";
import SearchBar from "Components/SearchBar";
import ThemeList from "./ThemeList";
import { Drawer, Tabs, Radio, Checkbox, List } from 'antd-mobile';
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";

// const THEMEFIELDURL = "/getNCCloudThemeField";

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoolean: false,
            themeFieldId: "",
            page: 0
        }
    }

    componentWillMount() {
        // this._getThemeFields()

    }

    // _getThemeFields () {
    //     Get(THEMEFIELDURL, {
    //         userId: userId
    //     }, (res) => {
    //         let themeFields = res.data;
    //         let themeFieldId = themeFields[0].id;


    //         if(this.props.updateData) {
    //             this.props.updateData({ themeFieldId, themeFields })
    //         }

    //         // this._getThemeList(themeFieldId, themeFields, this.state.label)

    //         console.log("这里是获取主题域的数据")
    //         console.log(res)
    //     }, (err) => {
    //         console.log(err)
    //     })
    // }

    onOpenChange() {
        if(this.props.open) {
            if(this.state.page > 0) {
                this.setState({
                    page: 0
                    //再设置其他数据
                })
                
            }else{
                //关闭弹窗
                if (this.props.updateData) {
                    this.props.updateData({ open: !this.props.open })
                }
            }
        }
        
    }

    onFieldChange(themeFieldId) {
        // if(this.props.updateData) {
        //     this.props.updateData({ themeFieldId: themeFieldId})
        // }
        this.setState({
            themeFieldId
        })
    }


    onVersionChange() {

    }

    onTypeChange() {

    }

    onStatusChange() {

    }

    handleFilter() {

    }

    handlePage(page) {
        this.setState({
            page: page
        })
    }

    render() {
        // const fields = [
        //     { value: 0, label: 'doctor' },
        //     { value: 1, label: 'bachelor' },
        // ]
        const versions = [
            { value: 0, label: 'Ph.D.', checked: true },
            { value: 1, label: 'Bachelor', checked: true },
            { value: 2, label: 'College diploma', checked: true },
        ];
        const types = [
            { value: 0, label: 'Ph.D.', checked: true },
            { value: 1, label: 'Bachelor', checked: true },
            { value: 2, label: 'College diploma', checked: true },
        ];
        const status = [
            { value: 0, label: 'Ph.D.', checked: true },
            { value: 1, label: 'Bachelor', checked: true },
            { value: 2, label: 'College diploma', checked: true },
        ];
        const tabs = [
            { title: "menu" },
            { title: "领域" },
            { title: "版本" },
            { title: "主题类型" },
            { title: "状态" }
        ]
        const sidebar = (
            <div style={{ width: "100%", height: "100%" }}>
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
                                        <List.Item key={i} onClick={this.handlePage.bind(this, i)}>{item.title}</List.Item>
                                    )
                                })
                            }
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            {this.props.themeFields.map(i => (
                                <RadioItem key={i.id} checked={this.state.themeFieldId === i.id} onChange={() => this.onFieldChange(i.id)}>
                                    {i.field}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {versions.map(i => (
                            <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onVersionChange(i.value)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {types.map(i => (
                            <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onTypeChange(i.value)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {status.map(i => (
                            <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onStatusChange(i.value)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </div>
                </Tabs>
                {/* <Accordion className="theme-accordion" >
                        <Accordion.Panel header="主题领域" className="field">
                            <List>
                                {this.props.themeFields.map(i => (
                                    <RadioItem key={i.id} checked={this.state.themeFieldId === i.id} onChange={() => this.onFieldChange(i.id)}>
                                        {i.field}
                                    </RadioItem>
                                ))}
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="版本" className="version">
                            {versions.map(i => (
                                <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onVersionChange(i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </Accordion.Panel>
                        <Accordion.Panel header="主题类型" className="type">
                            {types.map(i => (
                                <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onTypeChange(i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </Accordion.Panel>
                        <Accordion.Panel header="状态" className="status">
                            {status.map(i => (
                                <CheckboxItem key={i.value} checked={i.checked} onChange={() => this.onStatusChange(i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </Accordion.Panel>
                    </Accordion> */}
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
                    <div>
                        <SearchBar searchBoolean={this.state.searchBoolean} />
                        <ThemeList themeFields={this.state.themeFields} />
                    </div>
                </Drawer>
            </div>
        )
    }
}

ThemeSearch = connect((state) => ({
    open: state.themeSearchData.open,
    themeFieldId: state.themeSearchData.themeFieldId,
    themeFields: state.themeSearchData.themeFields
}),
    { updateData }
)(ThemeSearch)
export default ThemeSearch;
