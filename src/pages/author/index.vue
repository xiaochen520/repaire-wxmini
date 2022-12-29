<template>
  <view class="author flex-m">
    <button
      class="author-btn flex-1 author-btn-left"
      openType="getPhoneNumber"
      type="primary"
      @getPhoneNumber="getPhoneNumber"
    >
      微信授权登录
    </button>
    <button
      class="author-btn flex-1"
      @tap="goLogin"
    >
      账号密码登录
    </button>
  </view>
</template>

<script setup>
import Taro, {useLoad} from "@tarojs/taro"
import globalData from "../../utils/globalData"
import { post } from "../../api/request";
import api from "../../api"
import {goTab, goRouter} from '../../utils/index'
import "./index.scss";


let pageFrom = '';

useLoad(query => {
  pageFrom = query.from;
});

// 获取手机号登陆
function getPhoneNumber(res) {
  if (res.detail.errMsg === "getPhoneNumber:ok") {
    Taro.showLoading({ mask: true });

    Taro.login()
      .then((loginRes) => {
        if (loginRes.errMsg === "login:ok") {
          return post(api.wxLogin, {
            loginCode: loginRes.code,
            phoneCode: res.detail.code,
          });
        } else {
          Taro.showToast({
            title: "登录失败",
            icon: "none",
          });
        }
      })
      .then((res) => {
        if (res.success) {
          globalData.token = res.result.token;
          globalData.roleList = res.result?.roleList || [];
          globalData.role = globalData.roleList?.[0] || '';
          Taro.setStorage({
            key: 'token',
            data: res.result.token
          });

          Taro.setStorage({
            key: 'roleList',
            data: JSON.stringify(globalData.roleList)
          });

          Taro.setStorage({
            key: 'role',
            data: JSON.stringify(globalData.roleList)
          });

          if(pageFrom.includes('pages/my') || pageFrom.includes('pages/index')) {
            goTab({url: pageFrom});
          } else {
            goRouter({url: pageFrom});
          }

        } else {
          Taro.showToast({
            title: res.message,
            icon: "none",
          });
        }
      })
      .catch((err) => {
        Taro.hideLoading();
      });
  }
}

// 去账号密码登录
function goLogin() {
  goRouter({url: '/pages/login/index?from=' + encodeURI(pageFrom)});
}
</script>
