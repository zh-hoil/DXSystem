import React from "react";
import SearchBar from "Components/SearchBar";
import ThemeList from "Components/ThemeList";
import { withRouter } from "react-router-dom";
class ThemeSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <SearchBar searchBoolean={false} />
                <ThemeList />
            </div>
        );
    }
}
withRouter(ThemeSearch)
export default ThemeSearch;
