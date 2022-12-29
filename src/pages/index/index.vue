<template>
  <view class="index">
    <view class="nav flex tc">
      <view class="nav-item" @tap="goRouter({ url: '/pages/order/index' })">
        <image
          class="icon"
          src="../../imgs/pin.png"
        ></image>
        <view class="text">待处理</view>
      </view>
      <view class="nav-item" @tap="goRouter({ url: '/pages/message/index' })">
        <image
          class="icon"
          src="../../imgs/email.png"
        ></image>
        <view class="text">消息通知</view>
      </view>
      <view class="nav-item" @tap="goRouter({ url: '/pages/progress/index' })">
        <image
          class="icon"
          src="../../imgs/history.png"
        ></image>
        <view class="text">进度查询</view>
      </view>
    </view>

    <view class="info">
      <view class="info-title tc">浩源运维平台</view>
      <view class="info-sub-title">你好杨经理</view>

      <view class="info-desc"
        >啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view
      >
    </view>

    <view class="menu flex">
      <view @tap="goRouter({ url: '/pages/order/index' })" class="menu-item">
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

    <swiper
      class="banner"
      :indicator-dots="false"
      :interval="4000"
      :circular="true"
      :autoplay="true"
    >
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image
          class="banner-img"
          :src="item.imgUrl"
        ></image>
      </swiper-item>
    </swiper>

    <view class="news">
      <view class="news-title flex-m">
        <view class="at-icon at-icon-credit-card nt-icon"></view>
        <view class="flex-1">新闻公告</view>
        <view @tap="goRouter({ url: '/pages/news/index' })">更多</view>
      </view>

      <view class="news-list">
        <view v-for="(item, index) in newsList" :key="index" class="news-item">
          <view class="news-item-title">{{ item.title }}</view>
          <view class="news-item-desc">{{ item.announcementAbstract }}</view>
          <view class="news-item-foot flex-m">
            <view class="news-item-time flex-1">2022-11-11</view>
            <view class="news-item-label">{{ newsType[item.species] }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { base } from "../../api";
import { useUserInfo } from "../../hooks/useUserInfo";
import Taro, { useLoad } from "@tarojs/taro";
import { useNewsList } from "./hooks/useNewsList";
import { goRouter as _goRouter } from "../../utils/index";
import "./index.scss";

const { isLogin, role } = useUserInfo();
const { bannerList, newsList } = useNewsList();
const newsType = ref({
  1: "紧急通知",
  2: "温馨提示",
  3: "营销活动",
});
console.log(111, bannerList, newsList);

const goRouter = _goRouter;
</script>
