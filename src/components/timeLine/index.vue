<template>
  <view class="time-line">
    <view class="item" v-for="(item, index) in items" :key="index">
        <view class="dot"></view>
        <view class="line" v-if="index < (items.length - 1)"></view>
        <view class="title">{{item.title}}</view>
        <view v-if="item.content" class="desc">{{item.content}}</view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { ref } from 'vue'
defineProps({
    items: Array
})
</script>
