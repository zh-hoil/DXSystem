import React from "react";
import SearchBar from "Components/SearchBar";
import ThemeList from "./ThemeList";
import "./index.less";
class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="theme-search">
                <SearchBar searchBoolean={false} />
                <ThemeList />
            </div>
        );
    }
}
export default ThemeSearch;
