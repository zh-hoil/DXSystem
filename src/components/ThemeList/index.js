import React from "react";
import "./index.less";
import Data from "./test.json";
import ThemeDoc from "Components/ThemeDoc";
class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data.data,
            index: 0
        }
    }

    handleSort (sortable) {
        if(sortable === "evaluate"){
            //按好评排序

        }else if(sortable === "time"){
            //按时间排序

        }

    }


    render() {
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul>
                        {
                            this.state.data.map((themes, i) => (
                                <li key={i}>{themes.theme}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-docs">
                    <div className="sortable">
                        <span onClick={this.handleSort.bind(this, "evaluate")}>好评</span>
                        <span>|</span>
                        <span onClick={this.handleSort.bind(this, "time")}>时间</span>
                    </div>
                    <div className="list">
                        {
                            this.state.data[this.state.index].docs.map((doc, i) => (
                                <ThemeDoc key={i} {...doc} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default ThemeList;
