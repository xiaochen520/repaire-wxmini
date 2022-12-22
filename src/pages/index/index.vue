<template>
  <view class="index">
    <view class="title tc">浩源运维中心管理平台</view>
    <view class="nav flex tc">
      <view class="nav-item">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">待处理</view>
      </view>
      <view class="nav-item">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">消息通知</view>
      </view>
      <view class="nav-item">
        <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
        <view class="text">进度查询</view>
      </view>
    </view>

    <view class="info">
      <view class="info-title tc">浩源运维平台</view>
      <view class="info-sub-title">你好杨经理</view>
      <view class="desc">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
    </view>

    <view class="menu">
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text"></view>
      </view>
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text"></view>
      </view>
      <view class="menu-item">
        <view class="data">255</view>
        <view class="text"></view>
      </view>
    </view>

    <view class="banner">
      <image class="icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
    </view>

    <view class="news">
      <view class="news-title">
        <view class="at-icon at-icon-credit-card"></view>
        <view>新闻公告</view>
        <view>更多</view>
      </view>

      <view class="news-list">
        <view class="news-item">
          <view class="news-item-title">啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
          <view class="news-item-desc">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
          <view class="news-item-foot">
            <view class="news-item-time">2022-11-11</view>
            <view class="news-item-label">啊啊啊</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginState } from '../../hooks/useUserInfo';
import './index.scss'

const { isLogin } = useLoginState();

console.log(1111, isLogin.value)
</script>
