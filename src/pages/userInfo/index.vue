<template>
  <view class="user-info">
    <view class="head flex-m row">
      <view class="text flex-1">头像</view>
      <image class="head-img" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
    </view>

    <view class="row flex-m">
      <view class="text flex-1">用户名</view>
      <view class="detail">大芒果</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
    <view class="row flex-m">
      <view class="text flex-1">手机号</view>
      <view class="detail">15254525852</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
    <view class="row flex-m">
      <view class="text flex-1">密码</view>
      <view class="detail">1111111111</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
const msg = ref('Hello world')
</script>
