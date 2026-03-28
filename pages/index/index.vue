<template>
	<view class="layout">
		<!-- 背景 -->
		<view class="background">
			<!-- 头部标题 -->
			<top-title :title="'美妆购物平台'"></top-title> 
			<!-- 搜索框及分类筛选框 -->
			<search></search>
		</view>
		
		<!-- 轮播图 -->
		<!-- #ifdef H5 -->
		<view class="banner" :style="{marginTop:-225+'rpx'}">
		<!-- #endif -->	
		<!-- #ifndef H5 -->
		<view class="banner" :style="{marginTop:-getNavBarHeight()+10+'px'}">
		<!-- #endif -->
			<swiper indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fff" circular autoplay :interval="4000" :duration="1500" @change="changeDots">
				<swiper-item  v-for="item in bannerList" :key="item.id" @click="toGoodsDetail">
					<image :src="item.url" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 美妆分类 -->
		<view class="classify">
			<view class="list">
			  <view class="items" v-for="item in classifyList" :key="item.id" hover-class="active" :hover-stay-time="50">
				<view class="img">
				  <image :src="item.url" mode="aspectFill"></image>
				</view>
				<text class="text">{{ item.text }}</text>
			  </view>
			</view>
		</view>
		
		<!-- 图片广告 -->
		<view class="pic" hover-class="active" :hover-stay-time="50" @click="toGoodsDetail">
			<image src="../../static/banner/banner1.png" mode="aspectFill"></image>
		</view>
		
		<!-- 热卖爆品 -->
		<view class="hot">
			<view class="left">
				<uni-icons type="fire" size="50rpx" color="#5756B3"></uni-icons>
				<text class="title">热卖爆品</text>
			</view>
			<view class="right" hover-class="active" :hover-stay-time="50">
				<text class="more">更多</text>
				<uni-icons type="right" size="20rpx" color="#B3B3B3"></uni-icons>
			</view>
		</view>
		
		<!-- 商品 -->
		<view class="product">
			<items v-for="item in classifyList" :key="item.id" :item="item"></items>
		</view>
		
		<!-- 空白留白 -->
		<bottom-end></bottom-end>
		
		<!-- 返回顶部 -->
		<back-to-top :show="showBackToTop"></back-to-top>
		
	</view>
</template>

<script setup>
import {ref} from 'vue'
import {onPageScroll} from '@dcloudio/uni-app'
import {getNavBarHeight} from '@/utils/system.js'

// 返回顶部显示状态
const showBackToTop = ref(false)

// 监听页面滚动
onPageScroll((e) => {
	showBackToTop.value = e.scrollTop > 400
})

// 轮播图相关数据
const currentIndex = ref(0)
let currentId = 0
const bannerList = [
	{
		id:1,
		url:'/static/banner/banner1.png'
	},
	{
		id:2,
		url:'/static/banner/banner2.png'
	},
	{
		id:3,
		url:'/static/banner/banner3.png'
	},
	{
		id:4,
		url:'/static/banner/banner4.png'
	}
]
// 轮播图指示点改变事件
const changeDots = (e) => {
	currentIndex.value = e.detail.current
	currentId = bannerList[currentIndex.value].id
}

// 点击商品并携带商品id跳转到商品详情页
const toGoodsDetail = ()=>{
	uni.navigateTo({
		url:'/pages/goods-detail/goods-detail?id=1'
	})
}

// 首页各类商品数据
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
	.background{
		width: 100vw;
		height: 400rpx;
		border-radius: 0 0 100rpx 100rpx;
		background-color: $brand-theme-color;
	}
	.banner{
		width: 100%;
		swiper{
			width: 100%;
			height: 274rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding:0 60rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 40rpx;
				}
			}
		}
	}
	.classify{
		width: 100%;
		background-color: $text-font-color-2;
		padding: 50rpx 60rpx 0 60rpx;
		.list{
			display: flex;
			flex-wrap: wrap;
			.items{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 50rpx;
				margin-bottom: 30rpx;
				transition: transform 0.1s ease;
				&.active {
					transform: scale(0.9);
					opacity: 0.8;
				}
				&:nth-child(5n){
					margin-right: 0;
				}
				.img {
					width: 86rpx;
					height: 86rpx;
					background-color: $brand-bg-color-item;
					border-radius: 32rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
					image {
						width: 60%;
						height: 60%;
						border-radius:32rpx;
					}
				}
				.text {
				  font-size: 24rpx;
				  color: $text-font-color-1;
				  font-weight: 500;
				}
			}
		}
	}
	.pic{
		width: 100%;
		height: 204rpx;
		padding: 0 60rpx;
		margin: 40rpx 0 60rpx 0;
		border-radius: 40rpx;
		transition: opacity 0.2s;
		&.active {
			opacity: 0.85;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 40rpx;
		}
	}
	.hot{
		width: 100%;
		height: 50rpx;
		padding: 0 60rpx;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			.title{
				margin-left: 20rpx;
			}
		}
		.right{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			color: $text-font-color-3;
			transition: opacity 0.2s;
			&.active {
				opacity: 0.6; // “更多”按钮点击反馈
			}
			.more{
				margin-right: 5rpx;
			}
		}
	}
	.product{
		width: 100%;
		background-color: $brand-bg-color-item;
		padding: 0 60rpx;
		border-radius: 60rpx 60rpx 0 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}
}
</style>
