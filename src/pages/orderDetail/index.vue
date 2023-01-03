<template>
  <view class="order-detail" v-if="orderInfo">
    <view class="head">
      <image
        class="head-icon"
        src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      ></image>
      <view class="status-text">{{ orderStatus[orderInfo.status] }}</view>
    </view>

    <view class="info">
      <view class="flex-m i-row">
        <view class="i-text flex-1">工单编号</view>
        <view class="i-desc">{{ orderInfo.orderNumber }}</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">维保位置</view>
        <view class="i-desc">{{ orderInfo.address }}</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">工单提报时间</view>
        <view class="i-desc">{{ orderInfo.createTime }}</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">期望维保时间</view>
        <view class="i-desc">{{ orderInfo.makeAppointmentTime }}</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">联系人</view>
        <view class="i-desc">{{ orderInfo.contactPerson }}</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">联系电话</view>
        <view class="i-desc">{{ orderInfo.contactNumber }}</view>
      </view>
    </view>

    <view class="divider">
      <AtDivider content="内容"></AtDivider>
    </view>

    <view class="detail">
      <view class="">{{ orderInfo.content }}</view>
    </view>

    <view class="divider">
      <AtDivider content="处理进度"></AtDivider>
    </view>

    <view class="progress">
      <AtTimeline :items="progressList"> </AtTimeline>
    </view>

    <view v-if="service" class="footer flex-m">
      <AtButton class="button flex-1" type="primary">按钮文案</AtButton>
      <AtButton class="button flex-1" type="primary">按钮文案</AtButton>
    </view>

    <view v-if="manager && orderInfo.status === 1" class="footer flex-m">
      <AtButton @click="goAllotPage" class="button flex-1" type="primary">分配维保人员</AtButton>
      <AtButton @click="rejectOrder" class="button flex-1" type="primary">结束工单</AtButton>
    </view>

    <view v-if="ower && orderInfo.status === 4" class="footer flex-m">
      <AtButton class="button flex-1" type="primary">确认</AtButton>
      <AtButton class="button flex-1" type="primary">拒绝</AtButton>
    </view>

    <!-- 拒绝弹框 -->
    <nut-popup v-model:visible="showCloseModal">正文</nut-popup>
  </view>
</template>

<script setup>
import { AtDivider, AtTimeline } from "taro-ui-vue3";
import "taro-ui-vue3/dist/style/components/timeline.scss";
import { ORDER_STATUS } from "../../constant";
import "taro-ui-vue3/dist/style/components/divider.scss";
import { ref, computed } from "vue";
import { useUserInfo } from "../../hooks/useUserInfo";
import "./index.scss";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { get } from "../../api/request";
import { goRouter, loading, toast } from "../../utils/index";
import globalData from '../../utils/globalData'
import api from "../../api";

const { isLogin, role, project } = useUserInfo();
const orderInfo = ref(null);
const progressList = ref([]);
const orderStatus = ref(ORDER_STATUS);
const showCloseModal = ref(false);
let orderId = "";

const service = computed(() => {
  return role.value && role.value.roleId === 103;
});
const manager = computed(() => {
  return role.value && role.value.roleId === 102;
});
const ower = computed(() => {
  return role.value && role.value.roleId === 104;
});

useLoad((option) => {
  orderId = option.id;
  getDetail();
});

function getDetail() {
  loading();
  const par = {
    orderId: orderId,
  };

  get(api.orderDetail, par).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      progressList.value = res.result.processList.map((e) => ({
        ...e,
        content: [e.content],
        title: `${e.title} (${e.time})`,
      }));
      orderInfo.value = res.result;
    } else {
      toast(res.message);
    }
  });
}

function goAllotPage() {
  if(!orderInfo.value) {
    toast('没有获取到订单信息');
    return;
  }

  globalData.orderInfo = orderInfo.value;
  goRouter({url: '/pages/allot/index'});
}

function rejectOrder() {
  showCloseModal.value = true;
}
</script>
