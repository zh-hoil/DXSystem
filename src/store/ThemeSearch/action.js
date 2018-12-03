import * as themeSearch from './action-type';


export const clearData = () => {
	return {
		type: themeSearch.CLEARDATA
	};
};

// 更新数据
export const updateData = (data) => {
	return {
		type: themeSearch.UPDATE,
		data
	};
};