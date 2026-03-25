<template>
	<view class="layout">
		<!-- 背景 -->
		<view class="background">
			<!-- 填充区 -->
			<view class="fill" :style="{paddingTop:getNavBarHeight()+'px'}"></view>
			<view class="user" hover-class="user-active" :hover-stay-time="50">
				<view class="userphoto">
					<image src="/static/banner/banner1.png" mode="aspectFill"></image>
				</view>
				<view class="userinfo">
					<view class="username">
						小白
					</view>
					<view class="userid">
						ID：123456
					</view>
				</view>
			</view>
			<!-- 修饰圆 -->
			<view class="circle"></view>
		</view>
		
		<!-- 会员等级框 -->
		<view class="membership" hover-class="membership-active" :hover-stay-time="50">
			<view class="left">
				<view class="text">
					<view class="level">Lv 1</view>
					<view class="vip">会员</view>
				</view>
				<!-- 进度条 -->
				<view class="progressbox">
					<view class="progress">
						<view class="bar"style="width:50%"></view>
					</view>
					<view class="text">
						还差 8800 点经验值可升级
					</view>
				</view>
			</view>
			<!-- 会员图标 -->
			<view class="right">
				<view class="image">
					VIP
				</view>
			</view>
		</view>
		
		<!-- 余额/积分/收藏/优惠 -->
		<view class="others">
			<view class="other" v-for="item in list" :key="item.id" hover-class="other-active" :hover-stay-time="50">
				<view class="num">
					{{item.num}}
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<!-- 我的订单 -->
		<view class="order">
			<view class="title">
				我的订单
			</view>
			<view class="items">
				<view class="item" v-for="item in order" :key="item.id" hover-class="order-item-active" :hover-stay-time="50">
					<uni-badge size="small" :text="item.id" absolute="rightTop" type="error">
						<view class="icons">
							<image :src="item.icons" mode="aspectFill"></image>
						</view>
					</uni-badge>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 图片广告 -->
		<view class="pic" hover-class="pic-active" :hover-stay-time="50">
			<image src="../../static/banner/banner1.png" mode="aspectFill"></image>
		</view>
		
		<!-- 用户相关的信息 -->
		<view class="info">
			<view class="item" v-for="item in info" :key="item.id" hover-class="info-item-active" :hover-stay-time="50">
				<view class="left">
					<view class="icons">
						<image :src="item.icons" mode="aspectFill"></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="36rpx" color="#9E9E9E"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getNavBarHeight } from '@/utils/system.js'

// 余额/积分/收藏/优惠 数据列表
const list = ref([
	{
		id:1,
		num:100,
		name:'余额',
	},
	{
		id:2,
		num:0,
		name:'积分',
	},
	{
		id:3,
		num:10,
		name:'收藏',
	},
	{
		id:4,
		num:1000,
		name:'优惠',
	}
])

// 我的订单数据
const order = ref([
	{
		id:1,
		name:'待付款',
		icons:'/static/user/PendingPayment.png'
	},
	{
		id:2,
		name:'待发货',
		icons:'/static/user/ToBeShipped.png'
	},
	{
		id:3,
		name:'待收货',
		icons:'/static/user/ToBeReceived.png'
	},
	{
		id:4,
		name:'待评价',
		icons:'/static/user/ToBeEvaluated.png'
	},{
		id:5,
		name:'退款/售后',
		icons:'/static/user/Refund.png'
	}
])

// 用户相关数据
const info = ref([
	{
		id:1,
		name:'收货地址',
		icons:'/static/user/ShippingAddress.png'
	},
	{
		id:2,
		name:'优惠券',
		icons:'/static/user/Coupon.png'
	},
	{
		id:3,
		name:'历史订单',
		icons:'/static/user/HistoricalOrders.png'
	},
	{
		id:4,
		name:'设置',
		icons:'/static/user/Setting.png'
	},
])
</script>

<style lang="scss" scoped>
.layout{
	background-color: $brand-bg-color-item;
	.background{
		width: 750rpx;
		height: 557rpx;
		background: linear-gradient(135deg, $brand-theme-color, $linear-gradient-color);
		border-radius: 0 0 30% 30%;
		padding-top: 20rpx;
		position: relative;
		.user{
			display: flex;
			margin: 0 auto;
			width: 630rpx;
			border: 1rpx solid rgb($brand-theme-color,0.2);
			border-radius: 20rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			transition: all 0.2s ease;
			&.user-active {
				transform: scale(0.97);
				opacity: 0.9;
				background-color: rgba(255, 255, 255, 0.1);
			}
			.userphoto{
				width: 122rpx;
				height: 122rpx;
				border-radius: 20rpx;
				margin-right: 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
			.userinfo{
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 20rpx;
				font-size: 28rpx;
				color: $text-font-color-2;
			}
		}
		.circle{
			width: 250rpx;
			height: 250rpx;
			border-radius: 50%;
			background: radial-gradient(circle, $user-circular-color, transparent);
			overflow: hidden;
			position: absolute;
			left: 0;
			top: 0;
			transform: translate(-50%,-50%);
		}
	}
	.membership{
		width: 630rpx;
		height: 304rpx;
		background: rgba($brand-bg-color-item,0.3);
		border-radius: 60rpx;
		margin-left: 60rpx;
		margin-top: -230rpx;
		padding: 0 35rpx;
		position: relative;
		transition: all 0.2s ease;
		&.membership-active {
			transform: scale(0.98);
			background: rgba($brand-bg-color-item, 0.4);
		}
		.left{
			.text{
				display: flex;
				align-items: center;
				padding: 30rpx 0;
				.level{
					font-size: 35rpx;
					font-family: "DIN Alternate", "PingFang SC", "Microsoft YaHei", sans-serif;
					font-style: italic;
					font-weight: 500;
					color: $text-font-color-2;
					margin-right: 30rpx;
				}
				.vip{
					font-size: 28rpx;
					color: $brand-theme-color;
				}
			}
			.progressbox{
				.progress{
					width: 414rpx;
					height: 12rpx;
					background-color: rgba($brand-bg-color-item,0.3);
					border-radius: 390rpx;
					.bar{
						height: 100%;
						background-color: $text-font-color-2;
						border-radius: 6rpx;
						transition: width 0.3s ease;
					}	
				}
				.text{
					font-size: 20rpx;
					color: $text-font-color-2;
				}
			}
		}
		.right{
			position: absolute;
			right: 5%;
			bottom: 80rpx;
			width: 100rpx;
			height: 100rpx;
			background: rgba($brand-bg-color-item,0.3);
			overflow: hidden;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 50rpx;
			font-weight: 500;
			color: rgb($brand-theme-color,0.5);
			text-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.25);
		}
	}
	.others{
		height: 85rpx;
		display: flex;
		margin: 0 100rpx;
		margin-bottom: 50rpx;
		justify-content: space-between;
		align-items: center;
		.other{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			transition: all 0.2s ease;
			&.other-active {
				opacity: 0.7;
				transform: scale(0.95);
			}
			.num,.name{
				color: $user-font-color;
				font-size: 36rpx;
				font-weight: 500;
			}
			.name{
				font-size: 28rpx;
			}
		}
	}
	.order{
		width: 620rpx;
		margin: 0 auto;
		.title{
			padding-bottom: 45rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: $text-font-color-1;
		}
		.items{
			display: flex;
			.item{
				width: 130rpx;
				height: 130rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				margin: 0 auto;
				transition: all 0.2s ease;
				&.order-item-active {
					opacity: 0.8;
					transform: scale(0.92);
				}
				.icons{
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 10rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					font-size: 27rpx;
					font-weight: 500;
					color: $user-font-color;
				}
			}
		}
	}
	.pic{
		width: 100%;
		height: 180rpx;
		padding: 0 60rpx;
		margin: 40rpx 0 60rpx 0;
		border-radius: 40rpx;
		transition: all 0.2s ease;
		&.pic-active {
			transform: scale(0.97);
			opacity: 0.9;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 40rpx;
		}
	}
	.info{
		padding: 0 65rpx 10rpx 60rpx;
		.item{
			display: flex;
			justify-content: space-between;
			padding: 15rpx 0;
			border-bottom: 1rpx solid rgba($text-font-color-1,0.02);
			transition: all 0.2s ease;
			&.info-item-active {
				background-color: rgba(0, 0, 0, 0.03);
			}
			&:last-child{
			border-bottom: none;
			}
			.left{
				display: flex;
				justify-content: center;
				align-items: center;
				.icons{
					width: 44rpx;
					height: 44rpx;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					font-size: 28rpx;
					font-weight: 500;
					color: $user-font-color;
				}
			}
		}
	}
}
</style>
