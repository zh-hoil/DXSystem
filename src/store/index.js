import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as Home from "./Home/reducer";

import thunk from "redux-thunk";
let store = createStore(
    combineReducers({
        ...Home
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;
