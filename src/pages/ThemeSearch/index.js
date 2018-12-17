import React from "react";
import { connect } from "react-redux";
import { updateData } from "Store/ThemeSearch/action";
import { Drawer } from "antd-mobile";
import SearchBar from "Components/SearchBar";
import ThemeList from "./ThemeList";
import Sidebar from "./Sidebar";
import "./index.less";


class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoolean: false,   //SsearchBar状态
        };
    }

    //切换页面
    handlePage(page) {
        this.setState({
            page: page
        });
    }

    //点击搜索框执行的操作
    handleSearch() {
        const searchHistory = "/searchHistory";
        if (this.state.searchBoolean) {
            return;
        }
        window.location.hash = searchHistory;
    }

    //筛选按钮执行的函数
    handleSearchBack() {
        if (this.props.updateData) {
            this.props.updateData({ open: true });
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

    render() {
        return (
            <div className="theme-search">
                <Drawer
                    position="right"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    sidebar={<Sidebar />}
                    open={this.props.open}
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    <SearchBar
                        searchBoolean={this.state.searchBoolean}
                        handleSearch={this.handleSearch.bind(this)}
                        handleSearchBack={this.handleSearchBack.bind(this)}
                    />
                    <ThemeList />
                </Drawer>
            </div>
        );
    }
}
ThemeSearch = connect(
    state => ({
        open: state.themeSearchData.open,
        themeFieldId: state.themeSearchData.themeFieldId,
        themeFields: state.themeSearchData.themeFields
    }),
    { updateData }
)(ThemeSearch);
export default ThemeSearch;
