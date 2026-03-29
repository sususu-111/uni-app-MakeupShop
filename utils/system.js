const SYSTEM_INFO = uni.getSystemInfoSync();
// 手机状态栏的高度(安全区)
export const getStatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 10;

// 使小程序胶囊按钮与标题文字的高度一致
export const getTitleBarHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight())*2		
	}else{
		return 40;
	}
}

// 将搜索框固定所需要的高度
export const  getNavBarHeight = ()=> getStatusBarHeight()+getTitleBarHeight();

// 获取微信小程序胶囊按钮右侧间距
export const getCapsulePadding = () => {
	// #ifdef MP-WEIXIN
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	return menuButtonInfo.width + 10;
	// #endif
	// #ifndef MP-WEIXIN
	return 15;
	// #endif
}

// 是否是微信小程序环境
export const isMPWeixin = () => {
	// #ifdef MP-WEIXIN
	return true;
	// #endif
	// #ifndef MP-WEIXIN
	return false;
	// #endif
}

// 计算搜索栏高度（rpx），常用于筛选栏的 top 值
export const getSearchBarHeightRpx = (paddingBottomRpx = 20) => {
	const statusBarHeight = getStatusBarHeight()
	const titleBarHeight = getTitleBarHeight()
	const pxToRpx = 750 / SYSTEM_INFO.windowWidth
	// (statusBarHeight + titleBarHeight) 是 px，转成 rpx，再加上 padding-bottom 的 rpx
	return ((statusBarHeight + titleBarHeight) * pxToRpx + paddingBottomRpx)
}
