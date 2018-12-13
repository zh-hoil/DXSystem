import * as ThemeDetails from "./action-type";

// 更新主题ID
export const updateThemeID = data => {
    return {
        type: ThemeDetails.UPDATETHEMEID,
        data
    };
};

// 更新评论总数数据
export const updateComments = data => {
    return {
        type: ThemeDetails.UPDATECOMMENTS,
        data
    };
};
