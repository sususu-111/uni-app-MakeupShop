<template>
<view class="search" :style="{marginTop:getNavBarHeight()+'px'}">
		<navigator url="">
			<view class="left">
				<uni-icons class="icon" type="search" size="25" color="#5756B3"></uni-icons>
				<text>搜索</text>
			</view>
		</navigator>
		<view class="right" hover-class="active" :hover-stay-time="50" @click="openPopup">
			<uni-icons type="settings-filled" size="25" color="#5756B3" ></uni-icons>
		</view>
</view>

<!-- 菜单栏弹出层 -->
<uni-popup @change="onPopupChange" class="pop" ref="popup" type="bottom" background-color="#fff" borderRadius="60rpx 60rpx 0 0">
	<!-- 标题 + 关闭 -->
	<view class="header" @click="closePopup">
		<text>X</text>
	</view>
	
	<!-- 分类 -->
	<view class="sectionTitle">
		<text>分类</text>
	</view>
	<view class="section">
		<view class="items" v-for="item in sectionList" :key="item.id" :class="{active:menuList.sectionID === item.id}" @click="menuList.sectionID = item.id">
			<view class="item">
				<image :src="item.icons" mode="aspectFill"></image>
				{{item.label}}
			</view>
		</view>
	</view>
	
	<!-- 评分 -->
	<view class="ratingTitle">
		<text>评分</text>
	</view>
	<view class="rating">
		<view class="items" v-for="item in ratingList" :key="item.id" :class="{active:menuList.ratingID === item.id}" @click="menuList.ratingID = item.id">
			<text>{{item.rating}}</text>
			<uni-icons type="star-filled" size="35rpx" color="#FFC70E"></uni-icons>
		</view>
	</view>
	
	<!-- 价格区间 -->
	<view class="priceTitle">
		价格区间
	</view>
	<view class="price">
		<view class="line">
			<!-- 价格双向滑动条 -->
			<llt-slider-range 
			    v-model="priceRange"
			    :min="0"
			    :max="2000"
				:activeColor="'#5756B3'"
				:blockSize="40"
				:format="()=> {return}"
				@changing="changePrice"
			/>
		</view>
		<view class="num">
			<view class="price-input">
				<text>￥</text>
				<input type="number" v-model.number="priceRange[0]" />
			</view>
			<text class="divider">-</text>
			<view class="price-input">
				<text>￥</text>
				<input type="number" v-model.number="priceRange[1]" />
			</view>
		</view>
	</view>
	
	<!-- 重置/确认 -->
	<view class="bottom">	
		<view class="reset" hover-class="active" :hover-stay-time="50" @click="reset">
			重置
		</view>
		<view class="confirm" hover-class="active" :hover-stay-time="50" @click="confirm">
			确认
		</view>
	</view>
</uni-popup>
</template>

<script setup>
import { ref } from 'vue'
import { getNavBarHeight } from '@/utils/system.js'

// 菜单栏数据（分类/评分/价格区间）
const sectionList = ref([
	{
		id:1,
		label:'头发',
		icons:'/static/user/ShippingAddress.svg'
	},
	{
		id:2,
		label:'指甲',
		icons:'/static/user/ShippingAddress.svg'
	},
	{
		id:3,
		label:'身体',
		icons:'/static/user/Coupon.svg'
	},
	{
		id:4,
		label:'脸部',
		icons:'/static/user/Coupon.svg'
	},
	{
		id:5,
		label:'眼睛',
		icons:'/static/user/HistoricalOrders.svg'
	},
	{
		id:6,
		label:'手部',
		icons:'/static/user/HistoricalOrders.svg'
	},
	{
		id:7,
		label:'脚部',
		icons:'/static/user/ShippingAddress.svg'
	},
	{
		id:8,
		label:'化妆',
		icons:'/static/user/Coupon.svg'
	},
])
const ratingList = ref([
	{
		id:1,
		rating:5
	},
	{
		id:2,
		rating:4
	},
	{
		id:3,
		rating:3
	},
	{
		id:4,
		rating:2
	},
	{
		id:5,
		rating:1
	},
])

// 控制菜单栏显示/隐藏
const popup = ref(null)
const openPopup = () => popup.value.open()
const closePopup = () => popup.value.close()
// 不管是 点按钮/点遮罩/代码关闭 都会走这里
const onPopupChange = (e)=> {
	// e.show === false 代表弹窗完全关闭了
	if (e.show === false) {
		// 关闭后立刻恢复原生底部导航栏
		uni.showTabBar({ 
			animation: true
		})
	}else {
		// 隐藏原生底部导航栏
		uni.hideTabBar({
		    animation: true
		})
	}
}

// 收集菜单选项(默认数据)
const menuList = ref({
	sectionID:1, // 分类选项
	ratingID:1, // 评分选项
})

// 价格区间
const priceRange = ref([0, 2000])
const changePrice = (e) => {
	// 直接替换数组引用，确保 Vue 3 能够最快响应
	priceRange.value = [...e]
}

// 重置按钮
const reset = ()=>{
	menuList.value = {
		sectionID:1, // 分类选项
		ratingID:1 // 评分选项
	}
	priceRange.value = [0,2000]
}

// 确认按钮
const confirm = ()=>{
	console.log(menuList.value,priceRange.value)
	closePopup()
}
</script>

<style lang="scss" scoped>
.search{
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background-color: $brand-theme-color;
		line-height: 40rpx;
		padding:0 60rpx 5rpx 60rpx;
		z-index: 10;
		uni-icons{
			color: $brand-theme-color;
		}
		.left{
			display: flex;
			align-items: center;
			width: 526rpx;
			height: 100%;
			font-size: 25rpx;
			color: #CCC;
			background-color: $brand-bg-color-item;
			border-radius: 20rpx;
			.icon{
				margin: 10rpx;
			}
		}
		.right{
			width: 56rpx;
			height: 56rpx;
			background-color:$brand-bg-color-item;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			transition: transform 0.1s ease;
			&.active {
				transform: scale(0.9);
				opacity: 0.8;
			}
		}
}
.pop{
	z-index: 100;
	position: relative;
	.header{
		position: absolute;
		width: 46rpx;
		height: 46rpx;
		background-color: #CCC;
		border-radius: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 45rpx 0 25rpx 0;
		right: 60rpx;
		text{
			font-size: 30rpx;
			color: $text-font-color-2;
		}
	}
	.sectionTitle{
		padding: 120rpx 60rpx 0 60rpx;
		font-size: 28rpx;
		font-weight: 500;
	}
	.section{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 20rpx;
		padding: 30rpx 60rpx 0 60rpx;
		.items{
			width: 196rpx;
			height: 68rpx;
			background-color: $brand-bg-color-item;
			border-radius: 20rpx;
			.item{
				font-size: 28rpx;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 100%;
				image{
					width: 35rpx;
					height: 35rpx;
				}
			}
			&.active{
				border: 2rpx solid $brand-theme-color;
				background-color: #FFF;
			}
		}
	}
	.ratingTitle{
		padding: 65rpx 60rpx 0 60rpx;
		font-size: 28rpx;
		font-weight: 500;
	}
	.rating{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 60rpx 0 60rpx;
		.items{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 112rpx;
			height: 68rpx;
			background-color: $brand-bg-color-item;
			border-radius: 20rpx;
			text{
				font-size: 28rpx;
			}
			&.active{
				border: 2rpx solid $brand-theme-color;
				background-color: #FFF;
			}
		}
	}
	.priceTitle{
		padding: 65rpx 60rpx 20rpx 60rpx;
		font-size: 28rpx;
		font-weight: 500;
	}
	.price{
		padding: 0 80rpx;
		.num{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
			.price-input {
				display: flex;
				align-items: center;
				background-color: $brand-bg-color-item;
				padding: 10rpx 20rpx;
				border-radius: 12rpx;
				width: 180rpx;
				text {
					font-size: 24rpx;
					color: $text-font-color-3;
				}
				input {
					flex: 1;
					font-size: 28rpx;
					color: $text-font-color-1;
					font-weight: 500;
					margin-left: 5rpx;
				}
			}
			.divider {
				margin: 0 20rpx;
				color: $text-font-color-3;
			}
		}
	}
	.bottom{
		padding: 86rpx 60rpx 60rpx 60rpx;
		display: flex;
		justify-content: space-between;
		.reset,.confirm{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 296rpx;
			height: 100rpx;
			font-size: 36rpx;
			font-weight: 500;
			border-radius: 32rpx;
			transition: transform 0.1s ease;
			&.active {
				transform: scale(0.95);
				opacity: 0.8;
			}
		}
		.reset{
			color: $text-font-color-1;
			background-color: $brand-bg-color-item;
		}
		.confirm{
			color: $text-font-color-2;
			background-color: $brand-theme-color;
		}
	}
}
</style>