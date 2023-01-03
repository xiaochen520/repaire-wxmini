<template>
  <view class="progress">
    <view v-for="(item, index) in list" :key="index" class="item">
      <view class="head">{{item.projectName}}</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">{{item.content}}</view>
          <view class="desc">完成时间：{{item.completeTime}}</view>
        </view>
        <AtButton v-if="item.status === 4" type='primary' circle size="small">验收通过</AtButton>
        <AtButton v-if="item.status === 5" type='primary' circle size="small">服务评价</AtButton>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import { fetchNewsList } from "../../api/news";

import {post} from '../../api/request'
import api from '../../api'
import { goRouter as _goRouter, loading } from "../../utils/index";

const list = ref([]);
const page = 0;
const pageSize = 10;
const goRouter = _goRouter;

useDidShow(() => {
  getList();
});

function getList() {
  loading();
  const par = {
    pageNo: page,
    pageSize: pageSize
  };

  post(api.orderProgressList, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      list.value = {...list.value, ...res.result};
    } else {
      toast(res.message);
    }
  });
}
</script>
