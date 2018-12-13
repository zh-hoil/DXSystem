import * as ThemeDetails from './action-type';

// 更新数据
export const updateThemeID = (data) => {
	return {
		type: ThemeDetails.UPDATETHEMEID,
		data
	};
};