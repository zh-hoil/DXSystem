import React from "react";
import { connect } from "react-redux";
class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    handleSearch() {
        //执行搜索操作
        

    }


    render() {
        return (
            <div className="history-list">
                <div onClick={this.handleSearch.bind(this)}>{`搜索：${this.props.searchText}`}</div>

            </div>
        )
    }
}

let mapStateToProps = (state) => ({ searchText: state.historyData.searchText })


HistoryList = connect(mapStateToProps, {})(HistoryList)
export default HistoryList;
