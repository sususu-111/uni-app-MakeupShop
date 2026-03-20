// 底部导航栏安全区
const SYSTEM_INFO = uni.getSystemInfoSync();
export const getStatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 10;

export const getTitleBarHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight())*2		
	}else{
		return 40;
	}
}

export const  getNavBarHeight = ()=> getStatusBarHeight()+getTitleBarHeight();