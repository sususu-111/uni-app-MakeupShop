<template>
<view class="guessLike">
	<view class="title">
		<uni-icons type="hand-up" size="50rpx" color="#5756B3"></uni-icons>
		<view class="text">猜你喜欢</view>
	</view>
	<view class="goods">
		<items v-for="item in classifyList" :key="item.id" :item="item"></items>
	</view>
</view>
</template>

<script setup>
const props = defineProps({
	classifyList:Array
})
</script>

<style lang="scss" scoped>
.guessLike{
	padding: 50rpx 60rpx 30rpx 60rpx;
	.title{
		display: flex;
		align-items: center;
		.text{
			font-size: 36rpx;
			margin-left: 20rpx;
		}
	}
	.goods{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}
}
</style>