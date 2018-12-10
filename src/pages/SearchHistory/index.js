import React from "react";
import "./index.less";
import SearchBarComponent from "Components/SearchBar";
import HistoryList from "./historyList";
import { connect } from "react-redux";
import { clearData } from "Store/SearchHistory/action";
class SearchHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoolean: true
        }
    }

    componentWillUnmount() {
        //卸载页面前 清空数据
        if (this.props.clearData) {
            this.props.clearData();
        }
    }
    render() {
        return (
            <div className="search-history">
                <SearchBarComponent searchBoolean={this.state.searchBoolean} />
                <HistoryList />
            </div>
        )
    }
}

SearchHistory = connect((state) => ({
        searchText: state.searchText
    }), 
    { clearData })(SearchHistory)
export default SearchHistory;
