import React from "react";
import ThemeDocs from "Components/ThemeDocs";
import SearchBar from "Components/SearchBar";
import "./index.less";
import { userId, Get, Post } from "Public/js/Ajax";

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

    render() {
        return (
            <div className="search-results">
                <SearchBar 
                    searchBoolean={this.state.searchBoolean} 
                    handleSearchBack={this.handleSearchBack.bind(this)}
                    handleSearchChange={this.handleSearchChange.bind(this)}
                />
                <ThemeDocs themeList={this.state.themeList} />
            </div>
        )
    }
}
export default SearchRusults;
