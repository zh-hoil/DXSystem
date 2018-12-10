import React from "react";
import { List } from "antd-mobile";
import { connect } from "react-redux";
import { getLocalStorage, addLocalStorage } from "Src/utils";
import "./historyList.less";
class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyList: []
        }
    }

    componentWillMount() {
        this._initHisroty()
    }

    _initHisroty() {
        let historyList = getLocalStorage("history");
        if(!historyList) {
            historyList = ["暂无历史纪录..."]
        }
        console.log(historyList)
        this.setState({
            historyList: historyList
        })
    }

    handleTextSearch(e) {
        let searchText = this.props.searchText;
        if (!searchText) {
            return
        }

        

        

        // 保存该记录
        // ...
        addLocalStorage("history", searchText);

        this.handleSearch(this.props.searchText);
        
    }

    handleHistorySearch(e) {
        let searchText = e.target.innerText;
        this.handleSearch(searchText);
    }

    handleSearch(searchText) {
        console.log(searchText)
        //执行搜索操作

        if (!searchText) {
            return
        }

        //访问搜索接口 并跳转到详情页
        window.location.hash = "/searchRusults/" + searchText
         



    }


    render() {
        return (
            <div className="history-list">
                <List>
                    <List.Item onClick={this.handleTextSearch.bind(this)}>
                        {`搜索：${this.props.searchText}`}
                    </List.Item>
                </List>
                <div className="list">
                    <div className="list-title">搜索历史</div>
                    <List onClick={this.handleHistorySearch.bind(this)}>
                        {
                            this.state.historyList.map((item, index) => (
                                <List.Item key={index}>
                                    {item}
                                </List.Item>
                            ))
                        }
                    </List>
                </div>

            </div>
        )
    }
}



HistoryList = connect(
    (state) => ({ searchText: state.historyData.searchText }),
    {}
)(HistoryList)
export default HistoryList;
