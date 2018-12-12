import * as themeDetails from './action-type';

// 保存图片地址
export const clearData = () => {
	return {
		type: themeDetails.CLEARDATA
	};
};
// 更新首页
export const updateData = (data) => {
	return {
		type: themeDetails.UPDATE,
		data
	};
};