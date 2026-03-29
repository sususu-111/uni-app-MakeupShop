<template>
	<!-- 底部留白与提示 -->
	<view class="bottom-end-container" :style="{ backgroundColor: bgColor }">
		<view class="loading" v-if="isLoading">
			<uni-icons type="spinner-cycle" size="28rpx" color="#999" class="loading-icon"></uni-icons>
			<text class="text">正在加载中~~</text>
		</view>
		<view class="end" v-else-if="isEnd">
			<view class="line"></view>
			<text class="text">已经到底啦~</text>
			<view class="line"></view>
		</view>
		<!-- 仅作为留白时 -->
		<view class="spacer" v-else></view>
	</view>
</template>

<script setup>
const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false
	},
	isEnd: {
		type: Boolean,
		default: false
	},
	bgColor: {
		type: String,
		default: 'transparent'
	}
})
</script>

<style lang="scss" scoped>
.bottom-end-container {
	width: 100%;
	padding: 30rpx 0 50rpx;
	box-sizing: border-box;

	.loading, .end {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: $text-font-color-3;
	}

	.loading {
		.loading-icon {
			margin-right: 12rpx;
			animation: rotate 1s linear infinite;
		}
	}

	.end {
		.line {
			width: 80rpx;
			height: 1rpx;
			background-color: #e0e0e0;
			margin: 0 30rpx;
		}
		.text {
			font-weight: 300;
			letter-spacing: 2rpx;
		}
	}
	
	.spacer {
		height: 40rpx;
	}
}

@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
</style>