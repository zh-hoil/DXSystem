import * as roster from "./action-type";

// 清空
export const clearData = () => {
  return {
    type: roster.CLEARDATA
  };
};
// 更新标题
export const updateData = data => {
  return {
    type: roster.UPDATE,
    data
  };
};
