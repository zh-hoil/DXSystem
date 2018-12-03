import * as searchHistory from './action-type';

// 清空数据
export const clearData = () => {
	return {
		type: searchHistory.CLEARDATA
	};
};
// 更改搜索内容
export const changeSearchText = (data) => {
	return {
		type: searchHistory.CHANGE,
		data
	};
};
