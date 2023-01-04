<template>
  <view class="order">
    <view v-for="(item, index) in orderList" :key="index" class="item">
      <view class="head">工单编号：{{item.orderNumber}}</view>
      <view class="flex-m">
        <view class="flex-1 left">
          <view class="desc">问题描述：{{item.content}}</view>
          <view class="desc">项目名称：{{item.projectName}}</view>
          <view class="desc">下单时间：{{item.createTime}}</view>
        </view>
        <nut-button @click="goRouter({url: '/pages/orderDetail/index?id=' + item.id})" size="small" type="info">详情</nut-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { fetchNewsList } from "../../api/news";
import {post} from '../../api/request'
import api from '../../api'
import {useUserInfo} from '../../hooks/useUserInfo'
import { goRouter, loading } from "../../utils/index";
import {ORDER_STATUS} from '../../constant'

const { role } = useUserInfo();
const orderList = ref([]);
const page = 0;
const pageSize = 10;
let statusQuery = '';

useLoad(option => {
  statusQuery = option.status;
  console.log(111, statusQuery)
  Taro.setNavigationBarTitle({title: ORDER_STATUS[statusQuery] || '全部工单'});
});

useDidShow(() => {
  getList();
});

function getList() {
  loading();
  const par = {
    pageNo: page,
    pageSize: pageSize,
    roleId: role.value?.roleId || '',
    status: statusQuery
  };

  if(par.status == 10) {
    par.status = '';
    par.month = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  }

  post(api.selectOrderList, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      orderList.value = {...orderList.value, ...res.result};
    } else {
      toast(res.message);
    }
  });
}
</script>
