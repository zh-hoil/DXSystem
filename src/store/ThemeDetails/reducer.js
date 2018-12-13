import * as ThemeDetails from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(ThemeDetails, "ThemeDetails");

let defaultState = {
    themeId: "",
    count: "0",
    commentlist:[],
    good:"0"
};
// 数据
export const themeDetailsData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case ThemeDetails.UPDATETHEMEID:
            return { ...state, themeId: action.data };
        case ThemeDetails.UPDATECOMMENTS:
            return { ...state, ...action.data };
        default:
            return state;
    }
};
