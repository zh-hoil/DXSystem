import React from "react";
import ThemeDocs from "Components/ThemeDocs";
/*
搜索结果区域
*/
const SearchRusults = props => (
    <div className="search-results">
        <ThemeDocs themeList={props.themeList} onClick={props.handleDetails} />
    </div>
)
export default SearchRusults;
