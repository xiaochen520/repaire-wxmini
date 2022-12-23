<template>
  <view class="my">
    <view @tap="goRouter({url: '/pages/userInfo/index'})" class="top flex-m">
      <image class="head-img" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
      <view class="name flex-1">大芒果</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>

    <view class="menu flex">
      <view @tap="goRouter({url: '/pages/order/index'})" class="menu-item">
        <view class="amount">102</view>
        <view class="text">本月工单</view>
      </view>
      <view class="menu-item" @tap="goRouter({url: '/pages/order/index'})">
        <view class="amount">200</view>
        <view class="text">总工单数</view>
      </view>
    </view>

    <view class="utils">
      <view class="title">常用功能</view>
      <view class="list flex tc">
        <view @tap="goRouter({url: '/pages/items/index'})" class="item">
          <image class="u-icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
          <view class="u-text">我的项目</view>
        </view>
        <view class="item" @tap="goRouter({url: '/pages/message/index'})">
          <image class="u-icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
          <view class="u-text">消息中心</view>
        </view>
        <view class="item" @tap="goRouter({url: '/pages/feedback/index'})">
          <image class="u-icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
          <view class="u-text">意见反馈</view>
        </view>
        <view class="item">
          <image class="u-icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
          <view class="u-text">关于我们</view>
        </view>
      </view>
    </view>

    <AtButton type='primary' class="exit-btn">退出登录</AtButton>
  </view>
</template>

<script setup>
import Taro, { useTabItemTap, useLoad } from '@tarojs/taro'
import { ref } from 'vue'
import {goRouter as _goRouter} from '../../utils'
import { useLoginState } from '../../hooks/useUserInfo';
import './index.scss'

const { isLogin } = useLoginState();

const goRouter = _goRouter;
// useTabItemTap(item => {
//   if(!isLogin.value) {
//     Taro.navigateTo({url: `../author/index?from=/pages/my/index`})
//   }
// });
</script>
