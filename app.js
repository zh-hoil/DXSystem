import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import "./src/public/js/InitBridge.js";
import store from "./src/store";
import Routes from "./src/routes";
import { GetQuery } from "./src/utils";
// import "Assets/js/mobile-util.js";
import "Assets/css/normalize.css";
import "Assets/iconfont/iconfont.css";
import "Public/css/public.less";
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        let token = "";
        if(GetQuery(window.location.hash).token){
            token = JSON.stringify(GetQuery(window.location.hash).token)
            
        }
        localStorage.setItem("YY_userInfo", token)
    }
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}
// 后台服务地址
// 开发环境
window.RootURL = "http://10.11.115.74:5050/fiwechat";
// 生产环境
// window.RootURL = "http://172.20.6.119:8901/fiwechat";

ReactDOM.render(<App />, document.querySelector("#app"));
