<template>
	<view class="layout">
		<!-- 背景 -->
		<view class="background">
			<!-- 头部标题 -->
			<top-title :title="'分类'"></top-title>
			<!-- 搜索框及分类筛选框 -->
			<search></search>
		</view>	
		<!-- 分类选项 -->
		<!-- #ifdef H5 -->
		<view class="classItems" :style="{marginTop:-125+'rpx'}">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="classItems" :style="{marginTop:-50+'px'}">
		<!-- #endif -->
			<view class="item" v-for="item in classItems" :key="item.id" :class="{ active: activeId === item.id }" @click="activeId = item.id" hover-class="hover-active" :hover-stay-time="50">
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 美妆分类 -->
		<view class="classify">
		    <view class="items" v-for="item in classifyList" :key="item.id" hover-class="active" :hover-stay-time="50">
				<image :src="item.url" mode="aspectFill"></image>
				<text class="text">{{ item.text }}</text>
		    </view>
		</view>
		<!-- 分类商品列表 -->
		<view class="product">
			<view class="title">
				<view class="top">热卖</view>
				<view class="bottom">10件商品</view>
			</view>
			<view class="product-waterfall">
				<view class="column left-col">
					<items v-for="item in leftList" :item="item" />
				</view>
				<view class="column right-col">
					<items v-for="item in rightList" :item="item" />
				</view>
			</view>
		</view>
		<!-- 空白留白 -->
		<bottom-end></bottom-end>
	</view>
</template>

<script setup>
import {ref,computed} from 'vue'
import {getNavBarHeight} from '@/utils/system.js'
// 分类选项
const classItems = ref([
	{
		id:1,
		name:'热卖'
	},
	{
		id:2,
		name:'新品'
	},{
		id:3,
		name:'全部'
	},
])

// 默认选中第一个分类选项
const activeId = ref(1)

// 美妆分类/分类商品列表数据
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
		url:'/static/banner/banner1.png',
		description:'面霜',
		price:100,
		sell:2313
	}
]

// 使用计算属性将列表数据拆分，实现布局呈现瀑布形状
const leftList = computed(() => classifyList.filter((_, i) => i % 2 === 0));
const rightList = computed(() => classifyList.filter((_, i) => i % 2 !== 0));
</script>

<style lang="scss" scoped>
.layout{
	.background{
		width: 100%;
		height: 300rpx;
		background-color: $brand-theme-color;
	}
	.classItems{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $text-font-color-2;
		border-radius: 60rpx 60rpx 0 0;
		padding: 60rpx 60rpx 0 60rpx;
		.item{
			width: 172rpx;
			height: 92rpx;
			font-size: 32rpx;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 62rpx;
			color: $text-font-color-1;
			background-color: $text-font-color-7;
			transition: all 0.2s ease;
			/* 分类选项选中样式 */
			&.active{
				color: $text-font-color-4;
				background-color: $text-font-color-6;
			}
			&.hover-active{
				transform: scale(0.95);
				opacity: 0.8;
			}
		}
		&:last-child{
			margin-right: 0;
		}
	}
	.classify{
			width: 100%;
			background-color: $text-font-color-2;
			padding: 20rpx 60rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 30rpx;
			.items{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				transition: transform 0.1s ease;
				&.active {
					transform: scale(0.9);
					opacity: 0.8;
				}
				image{
					width: 128rpx;
					height: 128rpx;
					border-radius: 52rpx;
				}
				.text{
					color: $text-font-color-1;
					font-size: 30rpx;
					font-weight: 500;
					margin-top: 20rpx;
				}
			}
		}
		.product{
			width: 100%;
			background-color: $brand-bg-color-item;
			padding: 0 60rpx;
			border-radius: 60rpx 60rpx 0 0;
			.title{
				margin-bottom: 30rpx;
				.top{
					padding: 40rpx 0 10rpx 0;
					font-size: 36rpx;
					font-weight: 600;
					color: $text-font-color-1;
				}
				.bottom{
					font-size: 22rpx;
					color: $text-font-color-3;
				}
			}
			.product-waterfall {
				display: flex;
				justify-content: space-between;
				.column {
					display: flex;
					flex-direction: column;
				}
				.left-col{
					margin-top: -30rpx;
				}
				.right-col {
					margin-top: -140rpx; // 向上拉伸实现错位，或者给 left-col 加 margin-top
				}
			}
		}
}
</style>