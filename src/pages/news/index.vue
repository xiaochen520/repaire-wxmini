<template>
  <view class="news">
    <view @tap="goRouter({ url: '/pages/newDetail/index?id=' + item.id })" v-for="(item, index) in newsList" :key="index" class="flex-m item">
      <view class="left flex-1">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.announcementAbstract}}</view>
      </view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useDidShow, useReachBottom } from "@tarojs/taro";
import { fetchNewsList } from "../../api/news";
import { goRouter as _goRouter, loading } from "../../utils/index";

const newsList = ref([]);
const hasMore = ref(true);
let page = 1;
const pageSize = 10;
const goRouter = _goRouter;

useDidShow(() => {
  getList();
});

useReachBottom(() => {
  if(hasMore.value) {
    page += 1;
    getList();
  }
});

function getList() {
  loading();
  const par = {
    pageNo: page,
    pageSize: pageSize,
    type: 1,
  };

  fetchNewsList(par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      newsList.value = {...newsList.value, ...res.result};
      if(res.result.length) {
        hasMore.value = true;
      } else {
        hasMore.value = false;
      }
    } else {
      toast(res.message);
    }
  });
}
</script>
