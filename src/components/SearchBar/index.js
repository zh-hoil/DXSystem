import React from "react";
import "./index.less";
import PropTypes from "prop-types";
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToSearch (hash) {
        window.location.hash = hash
    }

    render() {
        return (
            <div className="search-wrapper">
                <div className="input-wrapper">
                    {
                        this.props.searchBoolean ?
                            (
                                <input className="input-text" type="text" placeholder="输入关键字找主题" />
                            )
                            :
                            (
                                <div className="search-text" onClick={this.handleToSearch.bind(this, "searchHistory")}>
                                    <span className="input-icon"></span>
                                    <span>输入关键字找主题</span>
                                </div>
                            )
                    }
                </div>
                <div className="button">
                    {this.props.searchBoolean 
                        ? 
                        (<span onClick={this.handleToSearch.bind(this, "themeSearch")}>返回</span>) 
                        : 
                        (<span>筛选</span>)}
                </div>
            </div>
        );
    }
}
SearchBar.defaultProps = {
    searchBoolean: false
}
SearchBar.propsType = {
    searchBoolean: PropTypes.bool.isRequired
}

export default SearchBar;
