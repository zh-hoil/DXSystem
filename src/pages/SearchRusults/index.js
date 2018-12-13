import React from "react";
import ThemeDocs from "Components/ThemeDocs";
import SearchBar from "Components/SearchBar";
import "./index.less";
import { userId, Get } from "Public/js/Ajax";
import { getTargetAttr } from "Src/utils";

const NCCSEARCHURL = "/getNCCloudThemeSearch";
class SearchRusults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoolean: true,
            themeList: []
        }
    }

    componentWillMount () {
        let keyword = this.props.match.params.keyword



        Get(NCCSEARCHURL, {
            userId: userId,
            keyword: keyword
        }, (res) => {
            
            console.log("这里是搜索主题的数据")
            console.log(res)

            let themeList = res.data;

            this.setState({
                themeList: themeList
            })

        }, (err) => {
            console.log(err)
        })
    }

    handleSearchBack() {
        const themeSearch = "/themeSearch";
        window.location.hash = themeSearch;
    }

    handleSearchChange(val) {
        if (this.props.changeSearchText) {
            this.props.changeSearchText(val)
        }
    }

    handleDetails = (e) => {
        let themeId = getTargetAttr(e.target, "themeid");

        if (!themeId) {
            return;
        }
        window.location.hash = "/themeDetails/" + themeId;
    }

    render() {
        return (
            <div className="search-results">
                <SearchBar 
                    searchBoolean={this.state.searchBoolean} 
                    handleSearchBack={this.handleSearchBack.bind(this)}
                    handleSearchChange={this.handleSearchChange.bind(this)}
                />
                <div className="theme-docs-wrapper">
                    <ThemeDocs themeList={this.state.themeList} onClick={this.handleDetails}/>
                </div>
                
            </div>
        )
    }
}
export default SearchRusults;
