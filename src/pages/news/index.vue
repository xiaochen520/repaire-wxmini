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
import Taro, { useDidShow } from "@tarojs/taro";
import { fetchNewsList } from "../../api/news";
import { goRouter as _goRouter } from "../../utils/index";


const newsList = ref([]);
const page = 0;
const pageSize = 10;
const goRouter = _goRouter;

useDidShow(() => {
  getList();
});

function getList() {
  const par = {
    pageNo: page,
    pageSize: pageSize,
    type: 1,
  };

  fetchNewsList(par).then((res) => {
    if (res.success) {
      newsList.value = {...newsList.value, ...res.result};
    } else {
      toast(res.message);
    }
  });
}
</script>
