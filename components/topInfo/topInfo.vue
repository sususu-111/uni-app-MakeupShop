<template>
<!-- 头部标题 -->
<view class="top">
	{{props.title}}
</view>
<view class="search">
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
const props = defineProps({
	title:{
		type:String
	}
})
</script>

<style lang="scss" scoped>
.top{
	width: 100%;
	height: 88rpx;
	padding:20rpx 60rpx;
	margin-bottom: 8rpx;
	font-size: 48rpx;
	line-height: 48rpx;
	color: $text-font-color-2;
}
.search{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	line-height: 56rpx;
	padding:20rpx 60rpx;
	margin-bottom: 42rpx;
	.left{
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