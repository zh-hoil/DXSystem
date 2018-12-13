import React from "react";
import "./index.less";
import PropTypes from "prop-types";
import { SearchBar } from 'antd-mobile';
import "./index.less";

class SearchBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.searchBoolean){
            this.autoFocusInst.focus();
        }
    }
    
    render() {
        return (
            <div className="search-wrapper">
                <SearchBar
                    style={{height: "100px"}}
                    ref={ref => this.autoFocusInst = ref}
                    onFocus={() => { if(!this.props.handleSearch) return; this.props.handleSearch() }}
                    showCancelButton
                    placeholder="Search"
                    onClear={value => console.log(value, "clear")}
                    cancelText={this.props.searchBoolean?"返回":"筛选"}
                    onCancel={() => {if(!this.props.handleSearchBack) return; this.props.handleSearchBack() }}
                    onChange={(val) => {if(!this.props.handleSearchChange) return; this.props.handleSearchChange(val)}}
                />
            </div>
        );
    }
}

export default SearchBarComponent;
