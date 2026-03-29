<template>
	<view class="search-result-layout">
		<!-- 顶部搜索栏 -->
		<view class="search-bar" :style="{ paddingTop: getStatusBarHeight() + 'px' }">
			<view class="bar-content" :style="{ height: getTitleBarHeight() + 'px', paddingRight: getCapsulePadding() + 'px' }">
				<view class="back-icon" @click="goBack">
					<uni-icons type="left" size="24" color="#333"></uni-icons>
				</view>
				<view class="input-box">
					<uni-icons class="search-icon" type="search" size="18" color="#999"></uni-icons>
					<input 
						type="text" 
						v-model="keyword" 
						placeholder="搜索美妆好物" 
						confirm-type="search"
						@confirm="handleSearch"
					/>
					<uni-icons 
						v-if="keyword" 
						class="clear-icon" 
						type="clear" 
						size="18" 
						color="#999" 
						@click="clearSearch"
					></uni-icons>
				</view>
				<view class="search-btn" @click="handleSearch" v-if="!isMPWeixin()">搜索</view>
			</view>
		</view>

		<!-- 筛选栏 -->
		<view class="filter-bar" :style="{ top: filterBarTop + 'rpx' }">
			<view 
				class="filter-item" 
				:class="{ active: currentSort === 'all' }" 
				@click="changeSort('all')"
			>综合</view>
			<view 
				class="filter-item" 
				:class="{ active: currentSort === 'sales' }" 
				@click="changeSort('sales')"
			>销量</view>
			<view 
				class="filter-item price-filter" 
				:class="{ active: currentSort === 'price' }" 
				@click="changeSort('price')"
			>
				价格
				<view class="price-icons">
					<uni-icons type="top" size="10" :color="priceOrder === 'asc' && currentSort === 'price' ? '#5756B3' : '#999'"></uni-icons>
					<uni-icons type="bottom" size="10" :color="priceOrder === 'desc' && currentSort === 'price' ? '#5756B3' : '#999'"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list">
			<view v-if="loading" class="loading-state">
				<uni-load-more status="loading"></uni-load-more>
			</view>
			<block v-else-if="resultList.length > 0">
				<view class="list-container">
					<items v-for="item in resultList" :key="item.id" :item="item"></items>
				</view>
			</block>
			<view v-else class="empty-state">
				<image src="/static/user/PendingPayment.svg" mode="aspectFit"></image>
				<text>没有找到相关商品</text>
			</view>
		</view>
		
		<!-- 底部留白与提示，仅在非加载状态且有商品时显示 -->
		<bottom-end 
			v-if="!loading && resultList.length > 0"
			:isLoading="loadMoreStatus === 'loading'"
			:isEnd="loadMoreStatus === 'noMore' && resultList.length > 4"
		></bottom-end>
		<back-to-top></back-to-top>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getStatusBarHeight, getTitleBarHeight, getCapsulePadding, isMPWeixin, getSearchBarHeightRpx } from '@/utils/system.js'

const keyword = ref('')
const currentSort = ref('all')
const priceOrder = ref('') // 'asc' or 'desc'
const loading = ref(true)
const resultList = ref([])
const loadMoreStatus = ref('noMore')

const filterBarTop = ref(getSearchBarHeightRpx())

// 模拟所有商品数据
const allProducts = [
	{
		id:1,
		text:'面霜',
		url:'/static/banner/banner1.png',
		description:'深层滋润补水面霜，长效保湿锁水，适合干燥肌肤',
		price:199,
		sell:500
	},{
		id:2,
		text:'口红',
		url:'/static/banner/banner2.png',
		description:'哑光持久显色口红，不沾杯不掉色，经典斩男色',
		price:128,
		sell:1200
	},{
		id:3,
		text:'水乳',
		url:'/static/banner/banner3.png',
		description:'舒缓修护水乳套装，敏感肌可用，温和不刺激',
		price:299,
		sell:800
	},{
		id:4,
		text:'美甲',
		url:'/static/banner/banner4.png',
		description:'清新持久指甲油，速干亮泽，环保无味',
		price:58,
		sell:300
	},{
		id:5,
		text:'防晒霜',
		url:'/static/banner/banner1.png',
		description:'清爽不油腻高倍防晒，防水防汗，户外必备',
		price:89,
		sell:2000
	},{
		id:6,
		text:'精华液',
		url:'/static/banner/banner2.png',
		description:'抗皱紧致修护精华，淡化细纹，焕活肌肤',
		price:459,
		sell:650
	},{
		id:7,
		text:'洗面奶',
		url:'/static/banner/banner3.png',
		description:'氨基酸温和洗面奶，深层清洁，水油平衡',
		price:68,
		sell:1500
	},{
		id:8,
		text:'眼霜',
		url:'/static/banner/banner4.png',
		description:'淡化黑眼圈紧致眼霜，提拉紧致，改善细纹',
		price:258,
		sell:450
	}
]

onLoad((options) => {
	if (options.keyword) {
		keyword.value = options.keyword
		searchProducts()
	}
})

// 返回上一页
const goBack = () => {
	const pages = getCurrentPages();
	if (pages.length > 1) {
		uni.navigateBack()
	} else {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
}

// 清空搜索关键词
const clearSearch = () => {
	keyword.value = ''
}

// 处理搜索
const handleSearch = () => {
	if (!keyword.value.trim()) return
	searchProducts()
}

// 搜索商品
const searchProducts = () => {
	loading.value = true
	// 模拟异步请求
	setTimeout(() => {
		const filtered = allProducts.filter(item => 
			item.text.includes(keyword.value) || 
			item.description.includes(keyword.value)
		)
		resultList.value = filtered
		applySort()
		loading.value = false
	}, 500)
}

// 切换排序方式
const changeSort = (type) => {
	if (type === 'price') {
		if (currentSort.value === 'price') {
			priceOrder.value = priceOrder.value === 'asc' ? 'desc' : 'asc'
		} else {
			currentSort.value = 'price'
			priceOrder.value = 'asc'
		}
	} else {
		currentSort.value = type
		priceOrder.value = ''
	}
	applySort()
}

// 应用排序
const applySort = () => {
	if (currentSort.value === 'all') {
		// 默认排序：按ID或不排序
	} else if (currentSort.value === 'sales') {
		resultList.value.sort((a, b) => b.sell - a.sell)
	} else if (currentSort.value === 'price') {
		resultList.value.sort((a, b) => {
			return priceOrder.value === 'asc' ? a.price - b.price : b.price - a.price
		})
	}
}
</script>

<style lang="scss" scoped>
.search-result-layout {
	min-height: 100vh;
	background-color: #f8f8f8;

	.search-bar {
		background-color: #fff;
		padding-bottom: 20rpx;
		position: sticky;
		top: 0;
		z-index: 100;

		.bar-content {
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			box-sizing: border-box;

			.back-icon {
				padding-right: 20rpx;
			}

			.input-box {
				flex: 1;
				height: 64rpx;
				background-color: #f1f1f1;
				border-radius: 32rpx;
				display: flex;
				align-items: center;
				padding: 0 20rpx;

				.search-icon {
					margin-right: 10rpx;
				}

				input {
					flex: 1;
					font-size: 28rpx;
				}

				.clear-icon {
					padding: 0 10rpx;
				}
			}

			.search-btn {
				padding-left: 30rpx;
				font-size: 30rpx;
				color: $brand-theme-color;
				font-weight: bold;
			}
		}
	}

	.filter-bar {
		display: flex;
		background-color: #fff;
		height: 80rpx;
		border-bottom: 1rpx solid #eee;
		position: sticky;
		z-index: 99;

		.filter-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #666;

			&.active {
				color: $brand-theme-color;
				font-weight: 500;
			}

			&.price-filter {
				.price-icons {
					display: flex;
					flex-direction: column;
					margin-left: 6rpx;
					line-height: 0.5;
				}
			}
		}
	}

	.goods-list {
		padding: 20rpx 30rpx;

		.list-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
			justify-items: center;
		}

		.loading-state, .empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 200rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 30rpx;
				opacity: 0.5;
			}

			text {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
}
</style>
