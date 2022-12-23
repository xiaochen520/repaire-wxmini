<template>
  <view class="index">
    <button openType="getPhoneNumber" type="primary" @getPhoneNumber="getPhoneNumber">按钮文案</button>
  </view>
</template>

<script setup>
import Taro, { useLoad } from "@tarojs/taro";
import globalData from "../../utils/globalData";
import { usePageQuery } from "../../hooks";
import { ref } from "vue";
import { get, post } from "../../api/request";
import api from "../../api";
import "./index.scss";

const query = usePageQuery();
const { from } = query.value;

function getPhoneNumber(res) {
  if(res.detail.errMsg === "getPhoneNumber:ok") {
    Taro.showLoading({mask: true});
    get(api.getPhone, {code: res.detail.code}).then(res => {
      
    }).catch(() => {
      Taro.hideLoading();
    });
  }
  
  // Promise.all([Taro.login(), Taro.getUserProfile({ desc: "用户登录" })])
  //   .then((values) => {
  //     const res = values[0];
  //     const res1 = values[1];
  //     globalData.wxLoginCode = res.code;
  //     globalData.wxUserInfo = res1;
  //     Taro.navigateTo({
  //       url: "/pages/login/index",
  //     });
  //   })
  //   .catch((err) => {
  //     Taro.showToast({
  //       title: err.message,
  //       icon: none,
  //     });
  //   });

  
}
</script>
