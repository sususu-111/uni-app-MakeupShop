<template>
	<view class="layout">
		<!-- 头部标题 -->
		<top-title :title="'购物车'"></top-title>
		<!-- 用户登陆后 -->
		<view class="login" v-if="true">
			<!-- 购物车商品 -->
			<cart-items :classifyList="classifyList"></cart-items>
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