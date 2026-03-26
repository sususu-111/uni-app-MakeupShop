<template>
<!-- 购物车商品 -->
<view class="goods-list" :style="{paddingTop:getNavBarHeight()+20+'px'}" v-if="true">
	<view class="goods" v-for="item in classifyList" :key="item.id" hover-class="active" :hover-stay-time="50">
		<view class="left">
			<image :src="item.url" mode="aspectFill"></image>
		</view>
		<view class="middle">
			<view class="description">欧舒丹甜蜜樱花沐浴啫喱</view>
			<!-- 评分 -->
			<view class="star">
				<uni-icons type="star-filled" size="30rpx" color="#FFC70E"></uni-icons>
				<text class="{padding-left: 5rpx;}">(4.5)</text>
			</view>
			<!-- 计数器 -->
			<view class="count">
				<uni-number-box :min="0" :max="999" background="#FFF"></uni-number-box>
			</view>
		</view>
		<view class="right">
			<view class="icons" hover-class="active" :hover-stay-time="50">
				<uni-icons type="trash-filled" size="40rpx" color="#AAA"></uni-icons>
			</view>
			<view class="price">
				￥100
			</view>
		</view>
	</view>
</view>
<!-- 购物车无商品时 -->
<view class="nogoods-list" v-else>
	<view class="text" :style="{paddingTop:getNavBarHeight()+50+'px'}">
		购物车中没有商品，去逛逛吧~~
	</view>
	<view class="toback" hover-class="active" :hover-stay-time="50">
		去首页
	</view>
</view>
</template>

<script setup>
import {getNavBarHeight} from '@/utils/system.js'

const props = defineProps({
	classifyList:Array
})
</script>

<style lang="scss">
.goods-list{
		.goods{
			width: 630rpx;
			height: 180rpx;
			display: flex;
			margin-left: 60rpx;
			margin-bottom: 64rpx;
			border-radius: 32rpx 0 0 32rpx;
			background-color: $text-font-color-2;
			transition: all 0.2s ease; // 平滑过渡
			&.active {
				transform: scale(0.98); // 轻微缩小
				background-color: #fafafa; // 变色反馈
			}
			.left{
				width: 180rpx;
				height: 180rpx;
				border-radius: 32rpx;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 32rpx;
				}
			}
			.middle{
				width: 300rpx;
				padding: 25rpx 40rpx 0 20rpx;
				position: relative;
				.description{
					width: 260rpx;
					margin-bottom: 10rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26rpx;
					font-weight: 500;
				}
				.star{
					display: flex;
					align-items: center;
					color: $score-font-color;
					text{
						font-size: 20rpx;
					}
				}
				.count {
					position: absolute;
					bottom: 15rpx;
					:deep(.uni-numbox) {
						background-color: transparent !important;
						display: flex;
						align-items: center;
					}
					:deep(.uni-numbox__minus),
					:deep(.uni-numbox__plus) {
						width: 40rpx !important;
						height: 40rpx !important;
						border: 4rpx solid $number-border !important;
						border-radius: 8rpx !important;
						background-color: #FFFFFF !important;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 !important;
					}
					:deep(.uni-numbox--text) {
						display: flex;
						justify-content: center;
						align-items: center;
						color: $number-button !important;
						font-size: 30rpx !important;
						font-weight: 600 !important;
					}
					:deep(.uni-numbox__value) {
						width: 50rpx !important;
						height: 40rpx !important;
						background-color: transparent !important;
						font-size: 25rpx !important;
						font-weight: 500 !important;
						color: $text-font-color-1 !important;
						border: none !important;
					}
				}
			}
			.right{
				flex: 1;
				position: relative;
				.icons{
					position: absolute;
					top: 25rpx;
					right: 23rpx;
					transition: transform 0.1s;
					&.active {
						transform: scale(1.2); // 删除图标点击轻微放大提示
						opacity: 0.7;
					}
				}
				.price{
					position: absolute;
					bottom: 15rpx;
					right: 23rpx;
					font-size: 26rpx;
					font-weight: 600;
					color: $text-font-color-1;
				}
			}
		}
	}
.nogoods-list,.noLogin{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.text{
		padding-top: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 500;
	}
	.toback{
		width: 150rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
		margin-bottom: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: $text-font-color-2;
		border-radius: 50rpx;
		background-color: $brand-theme-color;
		transition: all 0.2s ease;
		&.active {
			transform: scale(0.9);
			opacity: 0.8;
		}
	}
}
</style>