<template>
<!-- 商品 -->
<view class="items">
	<image :src="item.url" mode="aspectFill"></image>
	<view class="description">{{item.description}}</view>
	<view class="price">￥{{item.price}}</view>
	<view class="onsell">月销 {{item.sell}} 件</view>
</view>
</template>

<script setup>
const props = defineProps({
	item:Object
})
</script>

<style lang="scss" scoped>		
.items{
	width: 305rpx;
	height: 430rpx;
	margin-top: 20rpx;
	background-color: $text-font-color-2;
	border-radius: 20rpx;
	position: relative;
	image{
		width: 305rpx;
		height: 234rpx;
		border-radius: 20rpx;
	}
	.description{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* 显示2行 */
		-webkit-box-orient: vertical;
		width: 305rpx;
		padding: 5rpx 20rpx;
		font-size: 28rpx;
		font-weight: 400;
	}
	.price{
		position: absolute;
		bottom: 50rpx;
		padding: 0 20rpx;
		font-size: 32rpx;
		font-weight: 500;
	}
	.onsell{
		position: absolute;
		bottom: 25rpx;
		padding: 0 20rpx;
		font-size: 22rpx;
		color: $text-font-color-3;
	}
}
</style>