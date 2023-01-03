<template>
  <view class="index">
    <view class="nav flex tc">
      <view class="nav-item" v-if="service" @tap="goRouter({ url: '/pages/order/index?status=3' })">
        <image class="icon" src="../../imgs/pin.png"></image>
        <view class="text">待处理</view>
      </view>
      <view class="nav-item" v-if="manager" @tap="goRouter({ url: '/pages/order/index?status=1,6' })">
        <image class="icon" src="../../imgs/pin.png"></image>
        <view class="text">待派单</view>
      </view>
      <view class="nav-item" v-if="ower" @tap="goRouter({ url: '/pages/apply/index' })">
        <image class="icon" src="../../imgs/pin.png"></image>
        <view class="text">维保申请</view>
      </view>
      <view class="nav-item" @tap="goRouterBylogin({ url: '/pages/message/index' })">
        <image class="icon" src="../../imgs/email.png"></image>
        <view class="text">消息通知</view>
      </view>
      <view class="nav-item" @tap="goRouterBylogin({ url: '/pages/progress/index' })">
        <image class="icon" src="../../imgs/history.png"></image>
        <view class="text">进度查询</view>
      </view>
    </view>

    <view class="info">
      <view class="info-title tc">浩源运维平台</view>
      <view class="info-sub-title" v-if="project"
        >你好{{ project.projectManagerName }}经理</view
      >

      <view class="info-desc"
        >浩源科技有限公司成立于2010年3月，公司注册资本5001.8万元，坐落于浙江省金华市。公司主要从事通信工程施工及系统集成</view
      >
    </view>

    <view class="menu">
      <view class="outer flex">
        <view v-if="service" @tap="goRouter({ url: '/pages/order/index?status=2' })" class="menu-item flex-1">
          <view class="data">{{orderData.receiveCount || 0}}</view>
          <view class="text">待接单</view>
        </view>
        <view @tap="goRouter({ url: '/pages/order/index?status=3' })" class="menu-item flex-1" v-if="service || manager">
          <view class="data">{{orderData.dealWithCount || 0}}</view>
          <view class="text">待处理</view>
        </view>
        <view @tap="goRouter({ url: '/pages/order/index?status=5' })" class="menu-item flex-1" v-if="manager">
          <view class="data">{{orderData.completedCount || 0}}</view>
          <view class="text">已完成</view>
        </view>
        <view @tap="goRouter({ url: '/pages/order/index?status=1,2,3,4' })" v-if="ower" class="menu-item flex-1">
          <view class="data">{{orderData.maintenanceCount || 0}}</view>
          <view class="text">待维保</view>
        </view>
        <view @tap="goRouter({ url: '/pages/order/index?status=4' })" class="menu-item flex-1" v-if="service || ower">
          <view class="data">{{orderData.acceptanceCount || 0}}</view>
          <view class="text">待验收</view>
        </view>
        <view @tap="goRouter({ url: '/pages/order/index?status=5' })" class="menu-item flex-1" v-if="ower">
          <view class="data">{{orderData.evaluationCount || 0}}</view>
          <view class="text">待评价</view>
        </view>
        <view @tap="goRouterBylogin({ url: '/pages/order/index' })" class="menu-item flex-1">
          <view class="data">{{orderData.allCount || 0}}</view>
          <view class="text">全部工单</view>
        </view>
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
        <image class="banner-img" :src="item.imgUrl"></image>
      </swiper-item>
    </swiper>

    <view class="news">
      <view class="news-title flex-m">
        <view class="at-icon at-icon-bell nt-icon"></view>
        <view class="flex-1">新闻公告</view>
        <view class="nt-more" @tap="goRouter({ url: '/pages/news/index' })"
          >更多</view
        >
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
import { ref, computed } from "vue";
import { base } from "../../api";
import { useUserInfo } from "../../hooks/useUserInfo";
import Taro, { useLoad } from "@tarojs/taro";
import { useNewsList } from "./hooks/useNewsList";
import { useOrderData } from "./hooks/useOrderData";
import { goRouter as _goRouter } from "../../utils/index";
import "./index.scss";
//role 102是项目经理，103是维修员，104是业主
const { isLogin, role, project } = useUserInfo();
const { bannerList, newsList } = useNewsList();
const { orderData } = useOrderData();
const newsType = ref({
  1: "紧急通知",
  2: "温馨提示",
  3: "营销活动",
});
const service = computed(() => {
  return (role.value && (role.value.roleId === 103));
});
const manager = computed(() => {
  return (role.value && (role.value.roleId === 102));
})
const ower = computed(() => {
  return (role.value && (role.value.roleId === 104));
})
const goRouter = _goRouter;

function goRouterBylogin(option) {
  if(isLogin.value) {
    goRouter(option);
  }
}
</script>
