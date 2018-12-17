import * as themeSearch from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(themeSearch, "themeSearch");

let defaultState = {
    open: false,
    filter: "",
    themeFieldId: "",
    themeFields: []
};
// 数据
export const themeSearchData = (state = defaultState, action = {}) => {

    switch (action.type) {
        case themeSearch.CLEARDATA:
            return { ...state, ...defaultState };
        case themeSearch.UPDATE:
            return { ...state, ...action.data };
        default:
            return state;
    }
};
