<template>
  <view class="index">
    <AtButton type="primary" @click="getUserInfo">按钮文案</AtButton>
  </view>
</template>

<script setup>
import Taro, { useLoad } from "@tarojs/taro";
import { ref } from "vue";
import { get, post } from "../../api/request";
import api from "../../api";
import "./index.scss";

function getUserInfo() {
  let sessionKey = "";
  Taro.login()
    .then((res) => {
      if (res.code) {
        return get(api.wxAuthCode, { code: res.code });
      }
    })
    .then((res) => {
      if (res.result) {
        sessionKey = res.result;
        return Taro.getUserInfo();
      }
    })
    .then((res) => {
      
      const pars = {
        ...res,
        openid: sessionKey,
        userInfo: JSON.stringify(res.userInfo)
      };
      return post(api.getUserInfo, pars);
    }).then(res => {
        console.log(222, res);
    });
}
</script>
