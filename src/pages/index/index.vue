<template>
  <view class="index">
    <view class="nav flex tc">
      <view class="nav-item" @tap="goRouter({url: '/pages/order/index'})">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">待处理</view>
      </view>
      <view class="nav-item" @tap="goRouter({url: '/pages/message/index'})">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">消息通知</view>
      </view>
      <view class="nav-item" @tap="goRouter({url: '/pages/progress/index'})">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">进度查询</view>
      </view>
    </view>

    <view class="info">
      <view class="info-title tc">浩源运维平台</view>
      <view class="info-sub-title">你好杨经理</view>

      <view class="info-desc">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
    </view>

    <view class="menu flex">
      <view @tap="goRouter({url: '/pages/order/index'})" class="menu-item">
        <view class="data">255</view>
        <view class="text">待接单</view>
      </view>
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text">待处理</view>
      </view>
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text">待验收</view>
      </view>
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text">全部工单</view>
      </view>
    </view>

    <view class="banner">
      <image class="banner-img" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
    </view>

    <view class="news">
      <view @tap="goRouter({url: '/pages/news/index'})" class="news-title flex-m">
        <view class="at-icon at-icon-credit-card nt-icon"></view>
        <view class="flex-1">新闻公告</view>
        <view>更多</view>
      </view>

      <view class="news-list">
        <view class="news-item">
          <view class="news-item-title">啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
          <view class="news-item-desc">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
          <view class="news-item-foot flex-m">
            <view class="news-item-time flex-1">2022-11-11</view>
            <view class="news-item-label">啊啊啊</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {useUserInfo} from '../../hooks/useUserInfo'
import Taro, { useLoad } from "@tarojs/taro"
import { use } from '../../hooks/useUserInfo'
import { goRouter as _goRouter } from "../../utils/index"
import './index.scss'

const { isLogin, role } = useUserInfo();
console.log(111, isLogin, role);

const goRouter = _goRouter;

</script>
