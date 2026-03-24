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
