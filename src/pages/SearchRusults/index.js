import React from "react";
import ThemeDocs from "Components/ThemeDocs";
import SearchBar from "Components/SearchBar";
import "./index.less";
class SearchRusults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme_docs: [
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                },
                {
                    doc_id: 1,
                    title: "这里是第一页 2 days ago",
                    message: "国旅共享服务中心信息化解决方案、解决方案应用价值",
                    themeDocSort: 1,
                    imgSrc: "#",
                    evaluate: 99,
                    time: "2 days ago"
                }
            ]
        }
    }
    render() {
        return (
            <div className="search-results">
                <SearchBar searchBoolean={true} />
                <ThemeDocs theme_docs={this.state.theme_docs} />
            </div>
        )
    }
}
export default SearchRusults;
