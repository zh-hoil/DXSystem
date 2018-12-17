import React from "react";
import "./index.less";
import SearchBar from "Components/SearchBar";
import HistoryList from "./HistoryList";
import SearchRusults from "./Results";
import { getLocalStorage, addLocalStorage } from "Src/utils";
import { userId, Get } from "Public/js/Ajax";
import { getTargetAttr } from "Src/utils";
import { Toast } from "antd-mobile";


const NCCSEARCHURL = "/getNCCloudThemeSearch";
class SearchHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            searchBoolean: true,
            historyBoolean: true,
            historyList: [],
            themeList: []
        }
    }

    componentWillMount() {
        this._initHisroty()
    }

    componentWillUnmount() {
        //卸载页面前 清空数据
        if (this.props.clearData) {
            this.props.clearData();
        }
    }

    _initHisroty() {
        let historyList = getLocalStorage("history");
        if(!historyList) {
            historyList = ["暂无历史纪录..."]
        }
        this.setState({
            historyList
        })
    }

    handleSearchBack() {
        // if(!this.state.historyBoolean) {
        //     this.handleTab()
        //     return
        // }

        const themeSearch = "/themeSearch";
        window.location.hash = themeSearch;
    }

    handleSearchChange(val) {

        this.setState({
            searchText: val
        })
        // if (this.props.changeSearchText) {
        //     this.props.changeSearchText(val)
        // }
    }

    //获取焦点时执行的函数
    handleFocus() {
        if(this.state.historyBoolean){
            return
        }
        this.setState({
            historyBoolean: true
        })
    }

    handleTextSearch() {
        let keyword = this.state.searchText;
        if (!keyword) {
            return
        }
        // 保存该记录
        addLocalStorage("history", keyword);
        this.handleSearch(keyword);
    }

    handleHistorySearch(e) {
        let keyword = e.target.innerText;
        this.handleSearch(keyword);
    }

    handleSearch(keyword) {
        if (!keyword || !(getLocalStorage("history"))) {
            return
        }
        //执行搜索操作
        Get(NCCSEARCHURL, {
            userId: userId,
            keyword: keyword
        }, (res) => {
            let themeList = res.data;

            if(!themeList || themeList.length === 0) {
                Toast.info("无相关内容", 1)
                return
            }
            this.setState({
                themeList
            })
            this.handleTab()

        }, (err) => {
            Toast.info("网络错误", 100)
        })
    }

    handleTab () {
        this.setState({
            historyBoolean: !this.state.historyBoolean
        })
    }

    handleDetails (e) {
        let themeId = getTargetAttr(e.target, "themeid");
        if (!themeId) {
            return;
        }
        window.location.hash = "/themeDetails/" + themeId;
    }

    render() {
        return (
            <div className="search-history">
                <SearchBar 
                    searchBoolean={this.state.searchBoolean} 
                    handleSearchBack={this.handleSearchBack.bind(this)}
                    handleSearchChange={this.handleSearchChange.bind(this)}
                    handleFocus={this.handleFocus.bind(this)}
                    handleTextSearch={this.handleTextSearch.bind(this)}
                />
                {
                    this.state.historyBoolean?
                    (
                        <HistoryList 
                                searchText={this.state.searchText}
                                historyList={this.state.historyList}
                                handleTab={this.handleTab.bind(this)} 
                                handleTextSearch={this.handleTextSearch.bind(this)} 
                                handleHistorySearch={this.handleHistorySearch.bind(this)}
                                handleSearch={this.handleSearch.bind(this)}
                        />
                    )
                    :
                    (<SearchRusults themeList={this.state.themeList} handleDetails={this.handleDetails} />)
                }
            </div>
        )
    }
}

export default SearchHistory;
