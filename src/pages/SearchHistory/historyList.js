import React from "react";
import { List } from "antd-mobile";
/*
搜索历史区域
*/
let HistoryList = props => (
    (
        <div className="history-list">
            <List>
                <List.Item onClick={props.handleTextSearch}>
                    {`搜索：${props.searchText}`}
                </List.Item>
            </List>
            <div className="list">
                <div className="list-title">搜索历史</div>
                <List onClick={props.handleHistorySearch}>
                    {
                        props.historyList.map((item, index) => (
                            <List.Item key={index}>
                                {item}
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        </div>
    )
)

export default HistoryList;
