<template>
  <view class="allot">
    <view class="header">
      <view class="flex-m outer">
        <view class="at-icon at-icon-search"></view>
        <input
          placeholder="请输入维保人员姓名"
          class="flex-1 search-input"
          type="text"
        />
        <AtButton type="primary" size="small">搜索</AtButton>
      </view>
    </view>

    <view class="list">
      <checkbox-group @change="changeRepaire">
        <view
          v-for="(item, index) in repairerList"
          :key="index"
          class="item flex-m"
        >
          <checkbox
            class="head-form"
            :value="item.id"
          ></checkbox>
          <image
            v-if="item.headPortrait"
            class="head-img"
            :src="item.headPortrait"
          ></image>
          <view class="name">{{ item.nickName }}</view>
        </view>
      </checkbox-group>
    </view>

    <view class="msg">
      <view class="m-title">维保建议</view>
      <textarea
        placeholder="请输入内容"
        cols="30"
        v-model="content"
        rows="10"
        class="msg-input"
      ></textarea>
    </view>

    <view class="footer">
      <AtButton
        :loading="saveLoad"
        @click="confirm"
        class="button"
        type="primary"
        >确定</AtButton
      >
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import api from "../../api";
import { managerDispatchOrder } from "../../api/order";
import { get } from "../../api/request";
import { toast, loading } from "../../utils";
import globalData from "../../utils/globalData";

const repairerList = ref([]);
const checkedRepaireList = ref([]);
const saveLoad = ref(false);
const content = ref("");

useDidShow((option) => {
  //获取维修员列表
  getRepairer();
  console.log(111, globalData);
});

function getRepairer() {
  loading();
  const par = {
    projectId: globalData.orderInfo.projectId,
  };

  get(api.repairList, par).then((res) => {
    if (res.success) {
      Taro.hideLoading();
      res.result.forEach((e) => {
        e.select = false;
      });
      repairerList.value = res.result;
    } else {
      toast(res.message);
    }
  });
}

function confirm() {
  if (saveLoad.value) return;
  saveLoad.value = true;

  
  const par = {
    content: content.value,
    orderId: globalData.orderInfo.id,
    repairId: checkedRepaireList.value.join(),
    status: 1, //1.派单2.结束
  };

  managerDispatchOrder(par).then((res) => {
    saveLoad.value = false;
    if (res.success) {
      toast("派单成功");
      globalData.orderInfo = null;
      setTimeout(() => {
        Taro.navigateBack({ delta: 2 });
      }, 1500);
    } else {
      toast(res.message);
    }
  });
}

function changeRepaire(e) {
  checkedRepaireList.value = e.detail.value;
}
</script>
