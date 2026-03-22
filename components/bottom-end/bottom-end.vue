<template>
<!-- 空白留白 -->
<view class="loading" v-if="true">
	正在加载中~~
</view>
<view class="end" v-else>
	没有更多啦~
</view>
</template>

<script setup>
const props = defineProps({
	isLoading:{
		type:Boolean
	}
})
</script>
<style lang="scss" scoped>
.end,.loading{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		padding: 25rpx 0;
		border-radius: 0 0 20rpx 20rpx;
		background-color: $brand-bg-color-item;
		color: $text-font-color-3;
	}
</style>