<template>
  <view class="allot">
    <view class="header">
      <view class="flex-m outer">
        <view class="at-icon at-icon-search"></view>
        <input placeholder="请输入维保人员姓名" class="flex-1 search-input" type="text" />
        <AtButton type="primary" size="small">搜索</AtButton>
      </view>
    </view>

    <view class="list">
      <view v-for="(item, index) in repairerList" :key="index" class="item flex-m">
        <checkbox class="head-form" value="选中" :checked="true"></checkbox>
        <image class="head-img" :src="item.headPortrait"></image>
        <view class="name">{{item.nickName}}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import api from "../../api";
import { get } from "../../api/request";
import {toast, loading} from '../../utils'

const repairerList = ref([]);
let projectId = '';

useLoad(option => {
  projectId = option.projectId;
  //获取维修员列表
  getRepairer();
});

function getRepairer() {
  loading();

  get(api.repairList, {projectId: projectId}).then(res => {
    if(res.success) {
      Taro.hideLoading();
      repairerList.value = res.result;
    } else {
      toast(res.message);
    }
  });
}
</script>
