<template>
<view class="safe" :style="{height:getTabbarHeight()+'px'}"></view>
</template>

<script setup>
import {getTabbarHeight} from '@/utils/system.js'
</script>

<style lang="scss" scoped>
.safe{
	width: 100%;
}
</style>