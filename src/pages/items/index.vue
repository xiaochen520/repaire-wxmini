<template>
  <view class="items">
    <view @tap="goRouter({ url: '/pages/itemDetail/index?id=' + item.projectId })" v-for="(item, index) in itemList" :key="index" class="item flex-m">
      <view class="flex-1 left">
        <view class="title">{{item.projectName}}</view>
        <view class="desc" v-if="item.projectDescribe">{{item.projectDescribe}}</view>
      </view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
import {post} from '../../api/request'
import api from '../../api'
import Taro, { useDidShow } from "@tarojs/taro"
import {toast, loading} from '../../utils'
import { goRouter as _goRouter } from "../../utils/index";

const itemList = ref([]);
const goRouter = _goRouter;

useDidShow(() => {
  getList();
});


function getList() {
  loading();
  const par = {
    pageNo: 0,
    pageSize: 20
  }

  post(api.itemList, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      itemList.value = {...itemList.value, ...res.result};
    } else {
      toast(res.message);
    }
  });
}

</script>
