import React from "react";
import "./themeList.less";
import Data from "./themeList.json";
import ThemeDocs from "Components/ThemeDocs";
import { getTargetAttr, sortBy } from "Src/utils";
class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themes: null,
            theme_docs: null,
            theme_id: 1,
            sortable: "evaluate"
        }
    }

    componentWillMount() {
        this._initData()
    }

    _initData() {
        this.setState((preState) => {
            let id = Data.data[0].id;
            let themes = Data.data;

            //看theme_docs是否可以直接从接口获取 
            let theme_docs = sortBy(themes[id - 1].docs, this.state.sortable, false);
            return {
                ...preState,
                theme_id: id,
                themes: themes,
                theme_docs: theme_docs
            }
        })
    }

    handleSelectTheme(e) {
        let currentId = Number(getTargetAttr(e.target, "id"));
        if (isNaN(currentId)) {
            return
        }
        if (currentId == this.state.theme_id) {
            //无变化
            return
        }

        //获取新的theme_docs
        //这里看是否直接从接口获取
        let current_theme_docs = this.state.themes[currentId - 1].docs;
        let sortBoolean = false;

        if (this.state.sortable == "time") {
            sortBoolean = true
        }
        let theme_docs = sortBy(current_theme_docs, this.state.sortable, sortBoolean);
        this.setState({
            ...this.state,
            theme_id: currentId,
            theme_docs: theme_docs
        })
    }

    handleSort(key) {
        if (!key) {
            return
        }
        if (key === this.state.sortable) {
            return
        }
        this.setState((preState) => {
            let sortBoolean = false;
            if (key == "time") {
                sortBoolean = true
            }
            let result = sortBy(preState.theme_docs, key, sortBoolean);
            console.log(result)
            return {
                ...preState,
                theme_docs: result,
                sortable: key
            }
        })
    }

    render() {
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul onClick={this.handleSelectTheme.bind(this)}>
                        {
                            this.state.themes.map((theme) => (
                                <li key={theme.id} id={theme.id} className={theme.id == this.state.theme_id ? "active" : ""}>{theme.theme}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-docs">
                    <div className="sortable">
                        <span className={this.state.sortable == "evaluate" ? "active" : ""} onClick={this.handleSort.bind(this, "evaluate")}>好评</span>
                        <span>|</span>
                        <span className={this.state.sortable == "time" ? "active" : ""} onClick={this.handleSort.bind(this, "time")}>时间</span>
                    </div>
                    <ThemeDocs {...this.state} />
                </div>
            </div>
        );
    }
}
export default ThemeList;
