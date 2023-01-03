<template>
  <view class="my">
    <view @tap="goRouter({ url: '/pages/userInfo/index' })" class="top flex-m">
      <image class="head-img" :src="userInfo.headPortrait"></image>
      <view class="name flex-1">{{ userInfo.nickName }}</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>

    <view class="menu flex">
      <view @tap="goOrderByMonth" class="menu-item">
        <view class="amount">{{orderData.monthCount || 0}}</view>
        <view class="text">本月工单</view>
      </view>
      <view class="menu-item" @tap="goRouter({ url: '/pages/order/index' })">
        <view class="amount">{{orderData.allCount || 0}}</view>
        <view class="text">总工单数</view>
      </view>
    </view>

    <view class="utils">
      <view class="title">常用功能</view>
      <view class="list flex tc">
        <view @tap="goRouter({ url: '/pages/items/index' })" class="item">
          <image class="u-icon" src="../../imgs/work.png"></image>
          <view class="u-text">我的项目</view>
        </view>
        <view class="item" @tap="goRouter({ url: '/pages/message/index' })">
          <image class="u-icon" src="../../imgs/my-email.png"></image>
          <view class="u-text">消息中心</view>
        </view>
        <view class="item" @tap="goRouter({ url: '/pages/feedback/index' })">
          <image class="u-icon" src="../../imgs/forward.png"></image>
          <view class="u-text">意见反馈</view>
        </view>
        <view class="item" @tap="goRouter({ url: '/pages/about/index' })">
          <image class="u-icon" src="../../imgs/smile.png"></image>
          <view class="u-text">关于我们</view>
        </view>
      </view>
    </view>

    <view class="exit-btn">
      <picker
        :range="userInfo.roleList"
        header-text="选择角色"
        range-key="roleName"
        :value="rolePickerIndex"
        mode="selector"
        @change="changeRolePicker"
      >
        <AtButton class="exchange" type="primary">切换角色</AtButton>
      </picker>

      <AtButton @click="exitLogin" type="primary">退出登录</AtButton>
    </view>
  </view>
</template>

<script setup>
import Taro, { useTabItemTap, useDidShow } from "@tarojs/taro";
import { ref, watchEffect } from "vue";
import globalData from "../../utils/globalData";
import api from "../../api";
import { get, post } from "../../api/request";
import { goRouter as _goRouter, toast, setStorageData } from "../../utils";
import { useUserInfo } from "../../hooks/useUserInfo";
import "./index.scss";

const { isLogin, role } = useUserInfo();
const userInfo = ref({});
const rolePickerIndex = ref(0);
const orderData = ref({});
const goRouter = _goRouter;
const roleMap = {
  102: "项目经理",
  103: "维修员",
  104: "业主"
}

// 生命周期
useDidShow(() => {
  if (isLogin.value) {
    // 获取用户信息
    getUserDetail();
    //获取我的工单
    getMyOrder();
  } else {
    globalData.userInfo = null;
    userInfo.value = {};
  }
});

useTabItemTap((item) => {
  if (!isLogin.value) {
    Taro.redirectTo({ url: `../author/index?from=/pages/my/index` });
  }
});

function getUserDetail() {
  get(api.userDetail).then((res) => {
    if (res.success) {
          const roleIndex = res.result.roleList.findIndex(e => e.roleId === role.value.roleId);
          globalData.userInfo = res.result;
          userInfo.value = res.result;
          
      
          globalData.roleList = res.result?.roleList || [];
          globalData.projectList = res.result?.projectList || [];

          if(roleIndex < 0) {
            globalData.role = globalData.roleList[0] || null;
            globalData.role = globalData.roleList[0] || null;
            setStorageData({
              role: JSON.stringify(globalData.role)
            })
          }
          
          const storageObj = {
            roleList: JSON.stringify(globalData.roleList),
            projectList: JSON.stringify(globalData.projectList)
          }
          
          setStorageData(storageObj);
      
    } else {
      toast(res.message);
    }
  });
}

// 退出登录
function exitLogin() {
  Taro.showModal({
    title: "提示",
    content: "确认要退出登录?",
  }).then((res) => {
    if (res.confirm) {
      globalData.token = "";
      globalData.roleList = [];
      globalData.role = -1;
      Taro.removeStorageSync("token");
      Taro.removeStorageSync("roleList");
      Taro.removeStorageSync("role");
      Taro.redirectTo({ url: `../author/index?from=/pages/my/index` });
    }
  });
}

function changeRolePicker(e) {
  rolePickerIndex.value = e.detail.value;
  const selectRole = userInfo.value.roleList[rolePickerIndex.value];
  globalData.role = selectRole;
  Taro.setStorage({
    key: "role",
    data: JSON.stringify(selectRole)
  });
  //获取我的工单
  getMyOrder(selectRole.roleId);
  toast('已切换' + roleMap[selectRole.roleId]);
}

function getMyOrder(roleId) {
  get(api.myOrderCount, {roleId: roleId || role.value.roleId || ''}).then(res => {
    if(res.success) {
      orderData.value = res.result;
    } else {
      toast(res.message);
    }
  });
}

function goOrderByMonth() {
  goRouter({
    url: `/pages/order/index?status=10`
  })
}
</script>
