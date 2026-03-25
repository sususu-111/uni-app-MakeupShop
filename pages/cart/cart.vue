<template>
	<view class="layout">
		<!-- 头部标题 -->
		<top-title :title="'购物车'"></top-title>
		<!-- 用户登陆后 -->
		<view class="login" v-if="true">
			<!-- 购物车商品 -->
			<view class="goods-list" :style="{paddingTop:getNavBarHeight()+50+'px'}" v-if="true">
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
			<!-- 底部结算栏 -->
			<view class="bottom">
				<view class="left">
					<view class="top">
						<text class="total">总计</text>
						<text class="price">￥100 (4)件</text>
					</view>
					<view class="end">
						<text>不含运费</text>
					</view>
				</view>
				<view class="right">
					<view class="confirm" hover-class="active" :hover-stay-time="50">
						确认
					</view>
				</view>
			</view>
		</view>
		<!-- 用户未登录 -->
		<view class="noLogin" v-else>
			<view class="text" :style="{paddingTop:getNavBarHeight()+50+'px'}">
				您还未登录哦~
			</view>
			<view class="toback" hover-class="active" :hover-stay-time="50">
				去登录
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="guestLike">
			<view class="title">
				<uni-icons type="hand-up" size="50rpx" color="#5756B3"></uni-icons>
				<view class="text">猜你喜欢</view>
			</view>
			<view class="goods">
				<items v-for="item in classifyList" :key="item.id" :item="item"></items>
			</view>
		</view>
		<!-- 空白留白 -->
		 <view class="isend">
			 <bottom-end ></bottom-end>
		 </view>
	</view>
</template>

<script setup>
import {getNavBarHeight} from '@/utils/system.js'

// 商品数据
const classifyList = [
	{
		id:1,
		text:'面霜',
		url:'/static/banner/banner1.png',
		description:'面霜面霜面霜面霜面霜，面霜面霜面霜面霜面霜',
		price:100,
		sell:2313
	},{
		id:2,
		text:'口红',
		url:'/static/banner/banner2.png',
		description:'口红',
		price:100,
		sell:231
	},{
		id:3,
		text:'水乳',
		url:'/static/banner/banner3.png',
		description:'水乳',
		price:100,
		sell:2313
	},{
		id:4,
		text:'美甲',
		url:'/static/banner/banner4.png',
		description:'美甲',
		price:100,
		sell:2313
	},{
		id:5,
		text:'洁面',
		url:'/static/banner/banner1.png',
		description:'洁面',
		price:100,
		sell:2313
	},{
		id:6,
		text:'面霜',
		url:'/static/banner/banner2.png',
		description:'面霜',
		price:100,
		sell:2313
	},{
		id:7,
		text:'面霜',
		url:'/static/banner/banner3.png',
		description:'面霜',
		price:100,
		sell:2313
	},{
		id:8,
		text:'面霜',
		url:'/static/banner/banner4.png',
		description:'面霜',
		price:100,
		sell:2313
	},{
		id:9,
		text:'面霜',
		url:'/static/banner/banner1.png',
		description:'面霜',
		price:100,
		sell:2313
	},{
		id:10,
		text:'面霜',
		url:'/static/banner/banner2.png',
		description:'面霜',
		price:100,
		sell:2313
	}
]
</script>

<style lang="scss" scoped>
.layout{
	background-color: $brand-bg-color-item;
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
	.bottom {
	    width: 100%;
	    height: 136rpx;
	    position: fixed;
		/* #ifdef H5 */
		bottom: calc(50px + env(safe-area-inset-bottom));
		/* #endif */
		/* #ifndef H5 */
		bottom: 0;
		/* #endif */
	    left: 0;
	    z-index: 10;
	    background-color: $text-font-color-2;
	    border-bottom: 1rpx solid #E3E3E3;
		box-shadow: 0 -5rpx 24rpx rgba(0, 0, 0, 0.1);
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding: 20rpx 60rpx;
	    .left {
	        display: flex;
	        flex-direction: column;
	        .top {
	            display: flex;
	            align-items: baseline; // 让“总计”和价格基线对齐
	            gap: 15rpx;
	            .total {
	                font-size: 26rpx;
	                font-weight: 500;
	                color: $text-font-color-1;
	            }
	            .price {
	                font-size: 32rpx;
	                font-weight: 500;
	                color: $brand-theme-color;
	            }
	        }
	        .end {
				padding-top: 10rpx;
	            font-size: 22rpx;
	            color: $text-font-color-3;
	        }
	    }
	    .right {
	        .confirm {
	            width: 196rpx;
	            height: 92rpx;
	            display: flex;
	            align-items: center;
	            justify-content: center;
	            border-radius: 36rpx;
	            background-color: $brand-theme-color;
	            color: $text-font-color-2;
	            font-size: 32rpx;
	            font-weight: 500;
				transition: all 0.2s ease;
				&.active {
					transform: scale(0.92);
					opacity: 0.9;
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
	.guestLike{
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
	:deep(.isend){
		padding-bottom: 150rpx !important;
	}
}
</style>