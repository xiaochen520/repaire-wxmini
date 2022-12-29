<template>
  <view class="my">
    <view @tap="goRouter({ url: '/pages/userInfo/index' })" class="top flex-m">
      <image
        class="head-img"
        src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      ></image>
      <view class="name flex-1">{{userInfo.nickName}}</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>

    <view class="menu flex">
      <view @tap="goRouter({ url: '/pages/order/index' })" class="menu-item">
        <view class="amount">102</view>
        <view class="text">本月工单</view>
      </view>
      <view class="menu-item" @tap="goRouter({ url: '/pages/order/index' })">
        <view class="amount">200</view>
        <view class="text">总工单数</view>
      </view>
    </view>

    <view class="utils">
      <view class="title">常用功能</view>
      <view class="list flex tc">
        <view @tap="goRouter({ url: '/pages/items/index' })" class="item">
          <image
            class="u-icon"
            src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          ></image>
          <view class="u-text">我的项目</view>
        </view>
        <view class="item" @tap="goRouter({ url: '/pages/message/index' })">
          <image
            class="u-icon"
            src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          ></image>
          <view class="u-text">消息中心</view>
        </view>
        <view class="item" @tap="goRouter({ url: '/pages/feedback/index' })">
          <image
            class="u-icon"
            src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          ></image>
          <view class="u-text">意见反馈</view>
        </view>
        <view class="item">
          <image
            class="u-icon"
            src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          ></image>
          <view class="u-text">关于我们</view>
        </view>
      </view>
    </view>

    <view class="exit-btn">
      <AtButton @click="exitLogin" type="primary">退出登录</AtButton>
    </view>
    
  </view>
</template>

<script setup>
import Taro, { useTabItemTap, useDidShow } from "@tarojs/taro"
import { ref, watchEffect } from "vue"
import globalData from '../../utils/globalData';
import api from '../../api'
import { get, post } from "../../api/request"
import { goRouter as _goRouter, toast } from "../../utils"
import { useUserInfo } from "../../hooks/useUserInfo"
import "./index.scss";

const { isLogin } = useUserInfo();
const userInfo = ref({});
const goRouter = _goRouter;

// 生命周期
useDidShow(() => {
  if(isLogin.value) {
    // 获取用户信息
    getUserDetail();
  } else {
    globalData.userInfo = null;
    userInfo.value = {};
  }
});

useTabItemTap((item) => {
  if (!isLogin.value) {
    Taro.redirectTo({ url: `../author/index?from=/pages/my/index` });
  }
});

function getUserDetail() {
  
  get(api.userDetail).then(res => {
    if(res.success) {
      globalData.userInfo = res.result;
      userInfo.value = res.result;
    } else {
      toast(res.message);
    }
  });
}

// 退出登录
function exitLogin() {
  Taro.showModal({
    title: '提示',
    content: '确认要退出登录?'
  }).then(res => {
    
    if(res.confirm) {
      globalData.token = '';
      globalData.roleList = [];
      globalData.role = -1;
      Taro.removeStorageSync('token');
      Taro.removeStorageSync('roleList');
      Taro.removeStorageSync('role');
      Taro.redirectTo({ url: `../author/index?from=/pages/my/index` });
    }
  });
}
</script>
