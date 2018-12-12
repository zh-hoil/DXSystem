import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as Home from "./Home/reducer";
import * as Page1 from "./Page1/reducer";
import * as SearchHistory from "./SearchHistory/reducer";
import * as ThemeSearch from "./ThemeSearch/reducer";
import * as ThemeDetails from "./ThemeDetails/reducer";

import thunk from "redux-thunk";
let store = createStore(
    combineReducers({
        ...Home,
        ...Page1,
        ...SearchHistory,
        ...ThemeSearch,
        ...ThemeDetails
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;
