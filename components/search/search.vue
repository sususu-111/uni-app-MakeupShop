<template>
<view class="search" :style="{marginTop:getNavBarHeight()+'px'}">
		<navigator url="">
			<view class="left">
				<uni-icons class="icon" type="search" size="25" color="#5756B3"></uni-icons>
				<text>搜索</text>
			</view>
		</navigator>
		<view class="right">
			<uni-icons type="settings-filled" size="25" color="#5756B3"></uni-icons>
		</view>
	</view>
</template>

<script setup>
import {getNavBarHeight} from '@/utils/system.js'
</script>

<style lang="scss" scoped>
.search{
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background-color: $brand-theme-color;
		line-height: 40rpx;
		padding:0 60rpx 5rpx 60rpx;
		z-index: 10;
		.left{
			display: flex;
			align-items: center;
			width: 526rpx;
			height: 100%;
			font-size: 25rpx;
			color: #CCC;
			background-color: $brand-bg-color-item;
			border-radius: 20rpx;
			.icon{
				margin: 10rpx;
			}
		}
		.right{
			width: 56rpx;
			height: 56rpx;
			background-color:$brand-bg-color-item;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
		}
	}
</style>