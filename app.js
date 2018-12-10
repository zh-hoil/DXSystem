import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./src/store";
import Routes from "./src/routes";
import "Assets/css/normalize.css";
import "Public/css/public.less";
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        
        
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
