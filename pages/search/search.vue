<template>
	<view class="search-layout">
		<!-- 顶部搜索栏 -->
		<view class="search-bar" :style="{ paddingTop: getStatusBarHeight() + 'px' }">
			<view class="bar-content">
				<view class="back-icon" @click="goBack">
					<uni-icons type="left" size="24" color="#333"></uni-icons>
				</view>
				<view class="input-box">
					<uni-icons class="search-icon" type="search" size="18" color="#999"></uni-icons>
					<input 
						type="text" 
						v-model="searchText" 
						placeholder="搜索美妆好物" 
						confirm-type="search"
						@confirm="onSearch"
						focus
					/>
					<uni-icons 
						v-if="searchText" 
						class="clear-icon" 
						type="clear" 
						size="18" 
						color="#999" 
						@click="clearSearch"
					></uni-icons>
				</view>
				<view class="search-btn" @click="onSearch">搜索</view>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="search-history" v-if="historyList.length > 0">
			<view class="section-header">
				<text class="title">搜索历史</text>
				<uni-icons type="trash" size="20" color="#999" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-tags">
				<view 
					class="tag" 
					v-for="(item, index) in historyList" 
					:key="index"
					@click="clickTag(item)"
				>{{ item }}</view>
			</view>
		</view>

		<!-- 热门搜索 -->
		<view class="hot-search">
			<view class="section-header">
				<text class="title">热门搜索</text>
			</view>
			<view class="hot-tags">
				<view 
					class="tag" 
					v-for="(item, index) in hotList" 
					:key="index"
					@click="clickTag(item)"
				>
					<text class="rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</text>
					<text class="text">{{ item }}</text>
				</view>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		<view class="guess-section">
			<guessLike :classifyList="guessList"></guessLike>
		</view>
		
		<!-- 底部留白 -->
		<bottom-end></bottom-end>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStatusBarHeight } from '@/utils/system.js'

const searchText = ref('')
const historyList = ref([])
const hotList = ref(['防晒霜', '精华液', '粉底液', '面膜', '香水', '眼影'])

// 模拟猜你喜欢数据
const guessList = [
	{
		id:1,
		text:'面霜',
		url:'/static/banner/banner1.png',
		description:'深层滋润补水面霜',
		price:199,
		sell:500
	},{
		id:2,
		text:'口红',
		url:'/static/banner/banner2.png',
		description:'哑光持久显色口红',
		price:128,
		sell:1200
	},{
		id:3,
		text:'水乳',
		url:'/static/banner/banner3.png',
		description:'舒缓修护水乳套装',
		price:299,
		sell:800
	},{
		id:4,
		text:'美甲',
		url:'/static/banner/banner4.png',
		description:'清新持久指甲油',
		price:58,
		sell:300
	}
]

const goBack = () => {
	uni.navigateBack()
}

const clearSearch = () => {
	searchText.value = ''
}

const onSearch = () => {
	const text = searchText.value.trim()
	if (!text) return
	
	// 添加到历史记录
	let list = [...historyList.value]
	const index = list.indexOf(text)
	if (index > -1) {
		list.splice(index, 1)
	}
	list.unshift(text)
	
	// 限制历史记录数量
	if (list.length > 10) {
		list.pop()
	}
	
	historyList.value = list
	uni.setStorageSync('searchHistory', list)
	
	uni.showToast({
		title: '搜索: ' + text,
		icon: 'none'
	})
}

const clickTag = (tag) => {
	searchText.value = tag
	onSearch()
}

const clearHistory = () => {
	uni.showModal({
		title: '提示',
		content: '确定要清空搜索历史吗？',
		success: (res) => {
			if (res.confirm) {
				historyList.value = []
				uni.removeStorageSync('searchHistory')
			}
		}
	})
}

onMounted(() => {
	// 从 storage 读取历史记录
	const history = uni.getStorageSync('searchHistory')
	if (history) {
		historyList.value = history
	} else {
		// 初始默认数据
		historyList.value = ['面霜', '口红', '水乳', '洁面']
	}
})
</script>

<style lang="scss" scoped>
.search-layout {
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
			padding: 0 30rpx;
			height: 88rpx;

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

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 30rpx 20rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.search-history {
		background-color: #fff;
		margin-bottom: 20rpx;

		.history-tags {
			display: flex;
			flex-wrap: wrap;
			padding: 0 30rpx 20rpx;

			.tag {
				padding: 10rpx 30rpx;
				background-color: #f1f1f1;
				border-radius: 30rpx;
				font-size: 26rpx;
				color: #666;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.hot-search {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;

		.hot-tags {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			padding: 0 30rpx;

			.tag {
				display: flex;
				align-items: center;
				padding: 20rpx 0;

				.rank {
					width: 36rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					font-size: 24rpx;
					color: #999;
					margin-right: 15rpx;
					border-radius: 4rpx;

					&.rank-1 { background-color: #ff4d4f; color: #fff; }
					&.rank-2 { background-color: #ff7a45; color: #fff; }
					&.rank-3 { background-color: #ffa940; color: #fff; }
				}

				.text {
					font-size: 28rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}

	.guess-section {
		background-color: $brand-bg-color-item;
		margin-top: 20rpx;
	}
}
</style>