import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as Home from "./Home/reducer";
import * as SearchHistory from "./SearchHistory/reducer";
import * as ThemeSearch from "./ThemeSearch/reducer";
import thunk from "redux-thunk";
let store = createStore(
    combineReducers({
        ...Home,
        ...SearchHistory,
        ...ThemeSearch
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;
