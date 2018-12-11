import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./src/public/js/InitBridge.js";
import store from "./src/store";
import Routes from "./src/routes";
import { GetQuery } from "./src/utils";
import "Assets/css/normalize.css";
import "Public/css/public.less";
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        localStorage.setItem("YY_userInfo",JSON.stringify(GetQuery(window.location.hash).token))
    }
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));
