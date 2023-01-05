<template>
  <view class="message">
    <view @tap="goRouter({url: '/pages/orderDetail/index?id=' + item.orderId})" v-for="(item, index) in msgList" :key="index" class="item flex-m">
      <view class="flex-1 left">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.conetent}}</view>
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
import {post} from '../../api/request'
import api from '../../api'
import { goRouter as _goRouter, loading, toast } from "../../utils/index";

const msgList = ref([]);
const hasMore = ref(true);
let page = 0;
const pageSize = 10;
const goRouter = _goRouter;

useDidShow(() => {
  page = 0;
  msgList.value = [];
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
    pageSize: pageSize
  };

  post(api.msgList, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      msgList.value = {...msgList.value, ...res.result};
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
