import * as themeSearch from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(page1, "Page1");

let defaultState = {
    open: false
};
// 数据
export const themeSearchData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case themeSearch.CLEARDATA:
            return { ...state, ...defaultState };
        case themeSearch.UPDATE:
            return { ...state, ...{ title: action.data } };
        default:
            return state;
    }
};
