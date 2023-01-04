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
      <nut-divider>内容</nut-divider>
    </view>

    <view class="detail">
      <view class="">{{ orderInfo.content }}</view>
      <view class="img-list flex-w" v-if="imgList.length">
        <view @tap="previewImg(item)" v-for="(item, index) in imgList" :key="index" class="img-item">
          <image :src="item"></image>
        </view>
      </view>
    </view>

    <view class="divider">
      <nut-divider>处理进度</nut-divider>
    </view>

    <view class="progress">
      <TimeLine :items="progressList"></TimeLine>
    </view>

    <view v-if="service" class="footer flex-m">
      <nut-button
        v-if="orderInfo.status === 2"
        @click="confirmOrder"
        class="button flex-1"
        type="info"
        :loading="confirmLoad"
        >确认接单</nut-button
      >
      <nut-button
        v-if="orderInfo.status === 2"
        @click="refuseOrder"
        class="button flex-1"
        type="info"
        >拒绝接单</nut-button
      >
      <nut-button
        v-if="orderInfo.status === 3"
        @click="overOrder"
        class="button flex-1"
        type="info"
        >维修完成</nut-button
      >
    </view>

    <view v-if="manager && orderInfo.status === 1" class="footer flex-m">
      <nut-button @click="goAllotPage" class="button flex-1" type="info"
        >分配维保人员</nut-button
      >
      <nut-button @click="closeOrder" class="button flex-1" type="info"
        >结束工单</nut-button
      >
    </view>

    <view v-if="ower && orderInfo.status === 4" class="footer flex-m">
      <AtButton class="button flex-1" type="primary">确认</AtButton>
      <AtButton class="button flex-1" type="primary">拒绝</AtButton>
    </view>

    <!-- 拒绝弹框 -->
    <nut-popup closeable position="bottom" v-model:visible="showRefuseModal">
      <view class="refuse-modal">
        <view class="title">拒绝接单</view>
        <view class="sub-title">拒绝原因</view>
        <textarea v-model="refuseContent" class="textarea" cols="30" rows="10"></textarea>
        <view class="r-button-box">
          <nut-button @click="_refuseOrder" :loading="refuseLoad" class="r-button" type="info">拒绝接单</nut-button>
        </view>
      </view>
    </nut-popup>

    <!-- 维修完成 -->
    <nut-popup closeable position="bottom" v-model:visible="showOverModal">
      <view class="refuse-modal">
        <view class="title">维修完成</view>
        <view class="sub-title">维修内容</view>
        <textarea v-model="overContent" class="textarea" cols="30" rows="10"></textarea>
        <view class="r-button-box">
          <nut-button @click="_overOrder" :loading="overLoad" class="r-button" type="info">确认完成</nut-button>
        </view>
      </view>
    </nut-popup>

    <!-- 借宿工单 -->
    <nut-popup closeable position="bottom" v-model:visible="showCloseModal">
      <view class="refuse-modal">
        <view class="title">结束工单</view>
        <view class="sub-title">结束原因</view>
        <textarea v-model="closeContent" class="textarea" cols="30" rows="10"></textarea>
        <view class="r-button-box">
          <nut-button @click="_closeOrder" :loading="closeLoad" class="r-button" type="info">确认结束</nut-button>
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script setup>
//工单状态1.待派单2.待接单3.待处理4.待验收5.已完结6.已拒绝7.已评价
import { AtTimeline } from "taro-ui-vue3";
import "taro-ui-vue3/dist/style/components/timeline.scss";
import { ORDER_STATUS } from "../../constant";
import { ref, computed } from "vue";
import { useUserInfo } from "../../hooks/useUserInfo";
import "./index.scss";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { get, post } from "../../api/request";
import { goRouter, loading, toast } from "../../utils/index";
import globalData from "../../utils/globalData";
import api from "../../api";
import { managerDispatchOrder } from "../../api/order";
import TimeLine from '../../components/timeLine/index.vue'

const { isLogin, role, project } = useUserInfo();
const orderInfo = ref(null);
const progressList = ref([]);
const orderStatus = ref(ORDER_STATUS);
const showCloseModal = ref(false);
const overLoad = ref(false);
const showOverModal = ref(false);
const refuseContent = ref('');
const overContent = ref('');
const closeContent = ref('');
const showRefuseModal = ref(false);
const refuseLoad = ref(false);
const closeLoad = ref(false);
const imgList = ref([]);
const confirmLoad = ref(false);
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
      progressList.value = res.result.processList;
      orderInfo.value = res.result;
      if(res.result.img) {
        imgList.value = res.result.img.split(',');
      }
    } else {
      toast(res.message);
    }
  });
}

function goAllotPage() {
  if (!orderInfo.value) {
    toast("没有获取到订单信息");
    return;
  }

  globalData.orderInfo = orderInfo.value;
  goRouter({ url: "/pages/allot/index" });
}

// 项目经理
function closeOrder() {
  showCloseModal.value = true;
}

function _closeOrder() {
  if(closeLoad.value) return;
  closeLoad.value = true;
  const par = {
    content: closeContent.value,
    orderId: orderInfo.value.id,
    repairId: '',
    status: 2
  };

  managerDispatchOrder(par).then(res => {
    closeLoad.value = false;
    showCloseModal.value = false;
    if(res.success) {
      toast('已结束');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500)
    } else {
      toast(res.message);
    }
  });
}

// 维修员确认接单
function confirmOrder() {
  if(confirmLoad.value) return;
  confirmLoad.value = true;
  const par = {
    content: "",
    orderId: orderInfo.value.id,
    status: 1
  };

  post(api.repairReceiveOrder, par).then(res => {
    confirmLoad.value = false;
    if(res.success) {
      toast('已接单');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500)
    } else {
      toast(res.message);
    }
  });
}

function refuseOrder() {
  showRefuseModal.value = true;
}

function _refuseOrder() {
  if(refuseLoad.value) return;
  refuseLoad.value = true;
  const par = {
    content: refuseContent.value,
    orderId: orderInfo.value.id,
    status: 2
  };

  post(api.repairReceiveOrder, par).then(res => {
    refuseLoad.value = false;
    showRefuseModal.value = false;
    if(res.success) {
      toast('已拒绝');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500)
    } else {
      toast(res.message);
    }
  });
}

function overOrder() {
  showOverModal.value = true;
}

function _overOrder() {
  if(overLoad.value) return;
  overLoad.value = true;
  const par = {
    content: overContent.value,
    orderId: orderInfo.value.id
  };

  post(api.repairCompleteOrder, par).then(res => {
    overLoad.value = false;
    showOverModal.value = false;
    if(res.success) {
      toast('已确认');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500)
    } else {
      toast(res.message);
    }
  });
}

function previewImg(item) {
  Taro.previewImage({
    urls: [item],
  });
}
</script>
