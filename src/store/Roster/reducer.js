import * as roster from "./action-type";
import renameActionType from "Store/renameActionType";
renameActionType(roster, "Roster");

let defaultState = {
  branchValue: undefined,
  gradeValue: undefined,
  path: ""
};
// 首页数据
export const rosterData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case roster.CLEARDATA:
      return { ...state, ...defaultState };
    case roster.UPDATE:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
