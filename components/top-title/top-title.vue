<template>
<view class="layout">	
	<!-- 顶部安全区 -->
	<safe-top></safe-top>
	<!-- 头部标题 -->
	<view class="top" :style="{height:getTitleBarHeight()+'px'}">
		{{props.title}}
	</view>
</view>
</template>

<script setup>
import {getTitleBarHeight} from '@/utils/system.js'
const props = defineProps({
	title:{
		type:String,
		default:''
	}
})
</script>

<style lang="scss" scoped>
.layout{
	position: fixed;
	z-index: 100;
	width: 100vw;
	.top{
		width: 100%;
		display: flex;
		align-items: center;
		height: 88rpx;
		padding:0 60rpx;
		font-size: 48rpx;
		line-height: 48rpx;
		color: $text-font-color-2;
		background-color: $brand-theme-color;
	}
}
</style>