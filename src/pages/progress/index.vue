<template>
  <view class="progress">
    <view
      @tap="goRouter({ url: '/pages/orderDetail/index?id=' + item.id })"
      v-for="(item, index) in list"
      :key="index"
      class="item"
    >
      <view class="head">{{ item.projectName }}</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">{{ item.content }}</view>
          <view class="desc">完成时间：{{ item.completeTime }}</view>
        </view>
        <nut-button
          @click.stop="accessOrder(item)"
          size="small"
          v-if="ower && item.status === 999"
          type="info"
          >验收通过</nut-button
        >
        <nut-button
          size="small"
          @click.stop="goRouter({ url: '/pages/evaluate/index?id=' + item.id })"
          v-if="ower && item.status === 5"
          type="info"
          >服务评价</nut-button
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import "./index.scss";
import Taro, { useDidShow, useReachBottom } from "@tarojs/taro";
import { useUserInfo } from "../../hooks/useUserInfo";
import { fetchNewsList } from "../../api/news";
import { post } from "../../api/request";
import api from "../../api";
import { goRouter, loading, toast } from "../../utils/index";

const { isLogin, role, project } = useUserInfo();
const list = ref([]);
const hasMore = ref(true);
let page = 0;
const pageSize = 10;
const ower = computed(() => {
  return role.value && role.value.roleId === 104;
});

useDidShow(() => {
  page = 0;
  list.value = [];
  getList();
});

useReachBottom(() => {
  if (hasMore.value) {
    page += 1;
    getList();
  }
});

function getList() {
  loading();
  const par = {
    pageNo: page,
    pageSize: pageSize,
  };

  post(api.orderProgressList, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      list.value = { ...list.value, ...res.result };
      if (res.result.length) {
        hasMore.value = true;
      } else {
        hasMore.value = false;
      }
    } else {
      toast(res.message);
    }
  });
}

function accessOrder(item) {
  const par = {
    content: "",
    orderId: item.id,
    status: 1
  };

  post(api.ownerCompleteOrder, par).then(res => {
    if(res.success) {
      toast('验收成功');
      item.status = 5;
    } else {
      toast(res.message);
    }
  });
}
</script>
