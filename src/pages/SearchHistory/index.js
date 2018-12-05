import React from "react";
import "./index.less";
import SearchBarComponent from "Components/SearchBar";
import HistoryList from "./historyList";
import { connect } from "react-redux";
import { clearData } from "Store/SearchHistory/action";
class SearchHistory extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     searchText: "piu"
        // }
    }

    componentWillUnmount () {
        //卸载页面前 清空数据
        if(this.props.clearData) {
            this.props.clearData();
        }
    }
    render() {
        return (
            <div className="search-history">
                <SearchBarComponent searchBoolean={true} />
                <HistoryList />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchText: state.searchText
    }
}
SearchHistory = connect(mapStateToProps, { clearData })(SearchHistory)
export default SearchHistory;
