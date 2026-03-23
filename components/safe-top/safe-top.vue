<template>
<view class="safe" :style="{height:getStatusBarHeight()+'px'}"></view>
</template>

<script setup>
import {getStatusBarHeight} from '@/utils/system.js'
</script>

<style lang="scss" scoped>
.safe{
	width: 100%;
	background-color: $brand-theme-color;
}
</style>