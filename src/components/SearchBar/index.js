import React from "react";
import "./index.less";
import PropTypes from "prop-types";
import { SearchBar } from 'antd-mobile';
import { changeSearchText } from 'Store/SearchHistory/action';
import { updateData } from "Store/ThemeSearch/action";
import { connect } from "react-redux";
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

    onChange (val) {
        if(this.props.changeSearchText){
            this.props.changeSearchText(val)
        }
    }

    handleToSearch(hash) {
        if(this.props.searchBoolean) {
            return 
        }
        window.location.hash = hash
    }

    handleBack (hash) {
        if(!this.props.searchBoolean) {
            if(this.props.updateData){
                this.props.updateData({ open: true })
            }
            return
        }
        window.location.hash = hash;
    }

    render() {
        const searchHistory = "/searchHistory";
        const themeSearch = "/themeSearch";
        return (
            <div className="search-wrapper">
                <SearchBar
                    ref={ref => this.autoFocusInst = ref}
                    onFocus={this.handleToSearch.bind(this, searchHistory)}
                    // value={this.state.value}
                    placeholder="Search"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, "clear")}
                    onCancel={this.handleBack.bind(this, themeSearch)}
                    showCancelButton
                    cancelText={this.props.searchBoolean?"返回":"筛选"}
                    onChange={this.onChange.bind(this)}
                />
            </div>
            // <div className="search-wrapper">
            //     <div className="input-wrapper">
            //         {
            //             this.props.searchBoolean ?
            //                 (
            //                     <input className="input-text" type="text" placeholder="输入关键字找主题" />
            //                 )
            //                 :
            //                 (
            //                     <div className="search-text" onClick={this.handleToSearch.bind(this, "searchHistory")}>
            //                         <span className="input-icon"></span>
            //                         <span>输入关键字找主题</span>
            //                     </div>
            //                 )
            //         }
            //     </div>
            //     <div className="button">
            //         {this.props.searchBoolean 
            //             ? 
            //             (<span onClick={this.handleToSearch.bind(this, "themeSearch")}>返回</span>) 
            //             : 
            //             (<span>筛选</span>)}
            //     </div>
            // </div>
        );
    }
}
// SearchBar.defaultProps = {
//     searchBoolean: false
// }
// SearchBar.propsType = {
//     searchBoolean: PropTypes.bool.isRequired
// }

// const mapStateToProps = (state) => {
//     return {
//         searchText: state.searchText
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onChangeText: (searchText) => {
//             dispatch({ type: 'CHANGE', searchText: searchText })
//         }
//     }
// }
// SearchBarComponent = connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent)


SearchBarComponent = connect(
    (state) => ({ 
        searchText: state.historyData.searchText,
        open:  state.themeSearchData.open
    }),
    {changeSearchText, updateData}
)(SearchBarComponent);
export default SearchBarComponent;
