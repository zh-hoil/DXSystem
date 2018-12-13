import * as ThemeDetails from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(ThemeDetails, "ThemeDetails");

let defaultState = {
    themeId: ""
};
// 数据
export const themeDetailsData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case ThemeDetails.UPDATETHEMEID:
            return { ...state, themeId: action.data };
        default:
            return state;
    }
};
