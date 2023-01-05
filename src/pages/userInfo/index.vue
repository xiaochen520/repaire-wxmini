<template>
  <view class="user-info">
    <view class="head flex-m row">
      <view class="text flex-1">头像</view>
      <image class="head-img" :src="userInfo.headPortrait"></image>
    </view>

    <view @tap="goRouter({url: '/pages/editUser/index?key=nickName'})" class="row flex-m">
      <view class="text flex-1">用户名</view>
      <view class="detail">{{userInfo.nickName || ''}}</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
    <view @tap="goRouter({url: '/pages/editUser/index?key=phone'})" class="row flex-m">
      <view class="text flex-1">手机号</view>
      <view class="detail">{{userInfo.phone || ''}}</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
    <view class="row flex-m" @tap="goRouter({url: '/pages/editPsd/index'})">
      <view class="text flex-1">密码</view>
      <view class="detail">{{userInfo.psd || ''}}</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {goRouter as _goRouter} from '../../utils'
import Taro, { useDidShow } from "@tarojs/taro"
import './index.scss'
import globalData from '../../utils/globalData'

const userInfo = ref(globalData.userInfo);
const goRouter = _goRouter;

useDidShow(() => {
  userInfo.value = {...globalData.userInfo};
});

</script>
