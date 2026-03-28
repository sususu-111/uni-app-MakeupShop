<template>
<view class="layout">
	<!-- 返回按钮 -->
	<view class="toback" :style="{marginTop:getStatusBarHeight()+'px'}" @click="toBack" hover-class="active" :hover-stay-time="50">
		<uni-icons type="left" size="40rpx" color="#FFF"></uni-icons>
	</view>
	
	<!-- 商品图片轮播 -->
	<view class="banner">
		<swiper class="swiper" circular @change="onSwiperChange">
			<swiper-item v-for="(img, index) in productInfo.images" :key="index" @click="previewImage(index, 'banner')">
				<image :src="img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 图片总数 -->
		<view class="picnum">
			{{ currentImageIndex + 1 }}/{{ productInfo.images.length }}
		</view>
	</view>
	
	<!-- 商品基础信息 -->
	<view class="baseInfo">
		<view class="priceRow">
			<view class="price">￥<text class="num">{{ productInfo.price }}</text></view>
			<view class="oldPrice">￥{{ productInfo.oldPrice }}</view>
			<view class="tag">新品上市</view>
		</view>
		<view class="description">
			{{ productInfo.description }}
		</view>
		<view class="sellInfo">
			<text>月销 {{ productInfo.sell }} 件</text>
			<text>库存 999+</text>
		</view>
	</view>
	
	<!-- 商品保障、基本信息及发货地 -->
	<view class="goodsInfo section">
		<view class="infoRow" hover-class="row-active" :hover-stay-time="50">
			<text class="label">保障</text>
			<view class="content">官方正品 · 极速退款 · 7天无理由</view>
			<uni-icons type="right" size="24rpx" color="#9E9E9E"></uni-icons>
		</view>
		<view class="infoRow" hover-class="row-active" :hover-stay-time="50">
			<text class="label">参数</text>
			<view class="content">品牌, 产地, 规格...</view>
			<uni-icons type="right" size="24rpx" color="#9E9E9E"></uni-icons>
		</view>
		<view class="infoRow" hover-class="row-active" :hover-stay-time="50">
			<text class="label">发货</text>
			<view class="content">
				<view>由 <text class="highlight">美妆自营店</text> 发货</view>
				<view class="deliverPlace">发货地：上海</view>
			</view>
			<uni-icons type="right" size="24rpx" color="#9E9E9E"></uni-icons>
		</view>
	</view>
	
	<!-- 商品规格及收货地址展示 -->
	<view class="userInfo section">
		<view class="infoRow" hover-class="row-active" :hover-stay-time="50">
			<text class="label">规格</text>
			<view class="content">请选择：颜色, 尺寸</view>
			<uni-icons type="right" size="24rpx" color="#9E9E9E"></uni-icons>
		</view>
		<view class="infoRow" hover-class="row-active" :hover-stay-time="50">
			<text class="label">送至</text>
			<view class="content">北京市朝阳区</view>
			<uni-icons type="right" size="24rpx" color="#9E9E9E"></uni-icons>
		</view>
	</view>
	
	<!-- 商品评论预览 -->
	<view class="comment section">
		<view class="titleRow">
			<text class="title">商品评价(128)</text>
			<view class="more" hover-class="active" :hover-stay-time="50">
				查看全部 <uni-icons type="right" size="20rpx" color="#5756B3"></uni-icons>
			</view>
		</view>
		<view class="commentItem">
			<view class="user">
				<image class="avatar" src="/static/banner/banner1.png" mode="aspectFill"></image>
				<text class="name">小美</text>
				<view class="stars">
					<uni-icons type="star-filled" size="20rpx" color="#FFC70E" v-for="i in 5" :key="i"></uni-icons>
				</view>
			</view>
			<view class="text">面霜很好用，很滋润，不油腻，味道也好闻，强烈推荐！</view>
		</view>
	</view>
	
	<!-- 更多详情图片展示 -->
	<view class="more section">
		<view class="titleRow">
			<text class="title">图文详情</text>
		</view>
		<view class="detailPics">
			<image v-for="(pic, index) in productInfo.detailImages" :key="index" :src="pic" mode="widthFix" @click="previewImage(index, 'detail')"></image>
		</view>
	</view>
	
	<!-- 猜你喜欢/为你推荐 -->
	<guessLike :classifyList="classifyList"></guessLike>
	
	<!-- 底部空白占位 -->
	<view class="bottom-placeholder"></view>
	
	<!-- 底部固定菜单 -->
	<view class="footer">
		<view class="icons">
			<view class="iconItem" hover-class="active" :hover-stay-time="50">
				<uni-icons type="chat" size="44rpx" color="#666"></uni-icons>
				<text>客服</text>
			</view>
			<view class="iconItem" hover-class="active" :hover-stay-time="50">
				<uni-icons type="cart" size="44rpx" color="#666"></uni-icons>
				<text>购物车</text>
			</view>
			<view class="iconItem" hover-class="active" :hover-stay-time="50" @click="toggleFavorite">
				<uni-icons :type="isFavorite ? 'heart-filled' : 'heart'" size="44rpx" :color="isFavorite ? '#f00' : '#666'"></uni-icons>
				<text>{{ isFavorite ? '已收藏' : '收藏' }}</text>
			</view>
		</view>
		<view class="btns">
			<view class="btn addCart" hover-class="active" :hover-stay-time="50">加入购物车</view>
			<view class="btn buyNow" hover-class="active" :hover-stay-time="50">立即购买</view>
		</view>
	</view>

	<!-- 自定义全屏预览遮罩层 (支持 H5 指示器) -->
	<view class="custom-preview" v-if="isPreviewOpen" @click="closePreview" @touchmove.stop.prevent>
		<!-- 仿淘宝固定页码指示器 (在 swiper 外部，不随滑动而移动) -->
		<view class="preview-index-fixed">
			{{ previewCurrent + 1 }} / {{ previewList.length }}
		</view>
		
		<swiper class="preview-swiper" :current="previewCurrent" @change="onPreviewChange" circular :duration="300">
			<swiper-item v-for="(img, index) in previewList" :key="index" class="preview-item">
				<view class="preview-content">
					<image :src="img" mode="aspectFit" class="preview-img" @click.stop="closePreview"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>

</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getStatusBarHeight } from '@/utils/system.js'

// 商品信息
const productInfo = ref({
	id: 1,
	description: '欧舒丹甜蜜樱花沐浴啫喱 250ml 滋润补水 樱花香氛 留香持久',
	price: 180,
	oldPrice: 220,
	sell: 568,
	images: [
		'/static/banner/banner3.png',
		'/static/banner/banner1.png',
		'/static/banner/banner2.png',
		'/static/banner/banner4.png',
		'/static/banner/banner1.png'
	],
	detailImages: [
		'/static/banner/banner2.png',
		'/static/banner/banner3.png',
		'/static/banner/banner4.png'
	]
})

const currentImageIndex = ref(0)
const isFavorite = ref(false)

// 预览相关状态
const isPreviewOpen = ref(false)
const previewCurrent = ref(0)
const previewList = ref([])

// 轮播图改变
const onSwiperChange = (e) => {
	currentImageIndex.value = e.detail.current
}

// 返回上一页
const toBack = () => {
	const pages = getCurrentPages()
	// 如果页面栈大于1，说明有上一页，直接返回
	if (pages.length > 1) {
		uni.navigateBack()
	} else {
		// 如果页面栈只有1（例如用户直接通过分享链接进入商品详情页），则返回首页
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
}

// 切换收藏
const toggleFavorite = () => {
	isFavorite.value = !isFavorite.value
}

// 预览图片逻辑 (自定义实现)
const previewImage = (index, type) => {
	previewList.value = type === 'banner' ? productInfo.value.images : productInfo.value.detailImages
	previewCurrent.value = index
	isPreviewOpen.value = true
}

// 预览滑动切换
const onPreviewChange = (e) => {
	previewCurrent.value = e.detail.current
}

// 关闭预览
const closePreview = () => {
	isPreviewOpen.value = false
}

// 获取跳转页面信息
onLoad((e)=>{
	console.log('商品ID:', e.id)
})

// 猜你喜欢数据列表
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
.layout {
	background-color: $brand-bg-color-item;
	min-height: 100vh;
	position: relative;

	.toback {
		position: fixed;
		left: 30rpx;
		z-index: 100;
		width: 70rpx;
		height: 70rpx;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s;
		&.active {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.banner {
		width: 100%;
		height: 750rpx;
		position: relative;
		background-color: #fff;

		.swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}

		.picnum {
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
			background-color: rgba(0, 0, 0, 0.4);
			color: #fff;
			font-size: 24rpx;
			padding: 4rpx 16rpx;
			border-radius: 20rpx;
		}
	}

	.baseInfo {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.priceRow {
			display: flex;
			align-items: baseline;
			margin-bottom: 20rpx;
			.price {
				color: $brand-theme-color;
				font-size: 32rpx;
				font-weight: bold;
				.num {
					font-size: 48rpx;
				}
			}
			.oldPrice {
				color: #999;
				font-size: 24rpx;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
			.tag {
				background-color: rgba($brand-theme-color, 0.1);
				color: $brand-theme-color;
				font-size: 20rpx;
				padding: 2rpx 10rpx;
				border-radius: 4rpx;
				margin-left: 20rpx;
			}
		}

		.description {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			line-height: 1.4;
			margin-bottom: 20rpx;
		}

		.sellInfo {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #999;
		}
	}

	.section {
		background-color: #fff;
		padding: 10rpx 30rpx;
		margin-bottom: 20rpx;

		.titleRow {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
			}
			.more {
				font-size: 24rpx;
				color: $brand-theme-color;
				display: flex;
				align-items: center;
				&.active {
					opacity: 0.7;
				}
			}
		}
	}

	.infoRow {
		display: flex;
		padding: 24rpx 0;
		font-size: 28rpx;
		align-items: flex-start;
		&.row-active {
			background-color: #f9f9f9;
		}
		.label {
			color: #999;
			width: 80rpx;
			flex-shrink: 0;
		}
		.content {
			flex: 1;
			color: #333;
			padding: 0 20rpx;
			.highlight {
				color: $brand-theme-color;
				font-weight: 500;
			}
			.deliverPlace {
				font-size: 24rpx;
				color: #999;
				margin-top: 8rpx;
			}
		}
	}

	.comment {
		.commentItem {
			padding: 20rpx 0;
			.user {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;
				.avatar {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.name {
					font-size: 26rpx;
					color: #666;
					margin-right: 20rpx;
				}
			}
			.text {
				font-size: 28rpx;
				color: #333;
				line-height: 1.5;
			}
		}
	}

	.more {
		.detailPics {
			width: 100%;
			image {
				width: 100%;
				display: block;
			}
		}
	}


	.bottom-placeholder {
		height: 120rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 100;

		.icons {
			display: flex;
			.iconItem {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 80rpx; // 设置固定宽度，防止文字改变导致布局抖动
				margin-right: 15rpx;
				&.active {
					opacity: 0.6;
				}
				text {
					font-size: 20rpx;
					color: #666;
					margin-top: 4rpx;
					white-space: nowrap; // 防止换行
				}
			}
		}

		.btns {
			flex: 1;
			display: flex;
			gap: 20rpx;
			.btn {
				flex: 1;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				font-weight: bold;
				border-radius: 40rpx;
				&.active {
					opacity: 0.8;
					transform: scale(0.98);
				}
			}
			.addCart {
				background-color: #f0f0f0;
				color: #333;
			}
			.buyNow {
				background-color: $brand-theme-color;
				color: #fff;
			}
		}
	}

	.custom-preview {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #000; // 纯黑背景
		z-index: 9999; // 确保在最顶层

		.preview-index-fixed {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			// 图片高度为 75vh，居中放置。
			// 图片顶部位置 = 50vh - (75vh / 2) = 12.5vh
			// 指示器位置 = 图片顶部 - 50rpx
			top: calc(12.5vh - 50rpx);
			color: #fff;
			font-size: 34rpx;
			text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
			z-index: 10000;
		}

		.preview-swiper {
			width: 100%;
			height: 100%;
			
			.preview-item {
				display: flex;
				align-items: center;
				justify-content: center;
				
				.preview-content {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;

					.preview-img {
						width: 100%;
						height: 75vh; // 图片高度设为 75vh 且居中
					}
				}
			}
		}
	}
}
</style>