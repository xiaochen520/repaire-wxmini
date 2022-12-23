<template>
  <view class="progress">
    <view class="item">
      <view class="head">变压器设备故障</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">变压器坏了就是坏了</view>
          <view class="desc">完成时间： 2022-0-0</view>
        </view>
        <AtButton type='primary'>验收通过</AtButton>
      </view>
    </view>
    <view class="item">
      <view class="head">变压器设备故障</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">变压器坏了就是坏了</view>
          <view class="desc">完成时间： 2022-0-0</view>
        </view>
        <AtButton type='primary'>验收通过</AtButton>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
const msg = ref('Hello world')
</script>
