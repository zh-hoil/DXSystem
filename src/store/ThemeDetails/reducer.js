import * as ThemeDetails from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(ThemeDetails, "ThemeDetails");

let defaultState = {
    themeId: "",
    commentsCount: "0"
};
// 数据
export const themeDetailsData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case ThemeDetails.UPDATETHEMEID:
            return { ...state, themeId: action.data };
        case ThemeDetails.UPDATECOMMENTSCOUNT:
            return { ...state, commentsCount: action.data };
        default:
            return state;
    }
};
