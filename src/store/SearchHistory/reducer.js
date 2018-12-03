import * as searchHistory from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(searchHistory, "searchHistory");

let defaultState = {
    searchText: ""
};

// 数据
export const historyData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case searchHistory.CLEARDATA:
            return { ...state, ...defaultState };
        case searchHistory.CHANGE:
            return { ...state, ...{ searchText: action.data } };
        default:
            return state;
    }
};
