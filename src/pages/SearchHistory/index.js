import React from "react";
import "./index.less";
import SearchBar from "Components/SearchBar";
class SearchHistory extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div className="search-history">
                <SearchBar searchBoolean={true} />
                这里是搜索历史
            </div>
        )
    }
}
export default SearchHistory;
