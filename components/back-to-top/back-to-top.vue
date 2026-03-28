<template>
	<view 
		class="back-to-top" 
		:class="{ 'show': show }" 
		:style="{ bottom: bottom + 'rpx' }"
		@click="scrollToTop"
		hover-class="hover-active"
		:hover-stay-time="50"
	>
		<uni-icons type="arrow-up" size="24" color="#5756B3"></uni-icons>
		<text class="text">顶部</text>
	</view>
</template>

<script setup>
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		bottom: {
			type: [Number, String],
			default: 160
		}
	})

	const scrollToTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		})
	}
</script>

<style lang="scss" scoped>
	.back-to-top {
		position: fixed;
		right: 30rpx;
		width: 90rpx;
		height: 90rpx;
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.12);
		z-index: 99;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		transform: translateY(20rpx);

		&.show {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		&.hover-active {
			transform: scale(0.9);
			background-color: #f8f8f8;
		}

		.text {
			font-size: 18rpx;
			color: $brand-theme-color;
			margin-top: -4rpx;
			font-weight: 500;
		}
	}
</style>
