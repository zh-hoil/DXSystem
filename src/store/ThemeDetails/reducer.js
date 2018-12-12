import * as themeDetails from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(themeDetails, "Page1");

let defaultState = {
    themeId: ""
};
// 数据
export const themeDetailsData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case themeDetails.CLEARDATA:
            return { ...state, ...defaultState };
        case themeDetails.UPDATE:
            console.log(action.data)
            return { ...state, ...{ themeId: action.data.themeId} };
        default:
            return state;
    }
};
