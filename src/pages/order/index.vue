<template>
  <view class="order">
    <view @tap="goRouter({url: '/pages/orderDetail/index'})" class="item">
      <view class="head">工单编号</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">问题描述</view>
          <view class="desc">项目名称</view>
          <view class="desc">下单时间</view>
        </view>
        <AtButton type='primary'>详情</AtButton>
      </view>
    </view>
    <view class="item">
      <view class="head">工单编号</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">问题描述</view>
          <view class="desc">项目名称</view>
          <view class="desc">下单时间</view>
        </view>
        <AtButton type='primary'>详情</AtButton>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
import { goRouter as _goRouter } from '../../utils/index'

const goRouter = _goRouter;
</script>
