import React from "react";
import "./themeList.less";
import Data from "./themeList.json";
import ThemeDoc from "Components/ThemeDoc";
import { getTargetAttr, sortBy } from "Src/utils";
class ThemeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themes: null,
            theme_id: 1,
            sortable: "evaluate"
        }
    }

    componentWillMount () {
        this._initData()
    }

    _initData () {
        this.setState((preState) => {
            let id = Data.data[0].id;
            let themes = Data.data;
            return {
                ...preState,
                themes: themes,
                theme_id: id
            }
        })
    }

    handleSelectTheme (e) {
        let currentId = Number(getTargetAttr(e.target, "id"));
        if(isNaN(currentId)){
            return 
        }
        if(currentId == this.state.theme_id){
            //无变化
            return
        }
        console.log(currentId)
        this.setState({
            ...this.state,
            theme_id: currentId
        })
    }

    handleSort (key) {
        if (!key){
            return 
        }
        if(key === this.state.sortable) {
            return 
        }
        console.log(key)
        this.setState((preState) => {
            return {
                ...preState,
                themes: sortBy(preState.themes, key),
                sortable: key
            }
        })
    }

    handleDetails (e) {
        let theme_doc_id = getTargetAttr(e.target, "id");
        if(!theme_doc_id) {
            return 
        }
        console.log(theme_doc_id)
    }






    render() {
        return (
            <div className="themes-wrapper">
                <div className="catelog">
                    <ul onClick={this.handleSelectTheme.bind(this)}>
                        {
                            this.state.themes.map((theme) => (
                                <li key={theme.id} id={theme.id} className={theme.id==this.state.theme_id?"active":""}>{theme.theme}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-docs">
                    <div className="sortable">
                        <span className={this.state.sortable=="evaluate"?"active":""} onClick={this.handleSort.bind(this, "evaluate")}>好评</span>
                        <span>|</span>
                        <span className={this.state.sortable=="time"?"active":""} onClick={this.handleSort.bind(this, "time")}>时间</span>
                    </div>
                    <div className="list" onClick={this.handleDetails.bind(this)}>
                        {
                            this.state.themes[this.state.theme_id-1].docs.map((doc, i) => (
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
