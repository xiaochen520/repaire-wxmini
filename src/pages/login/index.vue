<template>
  <view class="login">
    <view class="flex-m row">
      <view class="label">账号：</view>
      <input v-model="account" class="flex-1 input" type="text" />
    </view>
    <view class="flex-m row">
      <view class="label">密码：</view>
      <input :password="true" v-model="password" class="flex-1 input" />
    </view>

    <view class="confirm-btn">
      <nut-button class="button" @click="confirm" :disabled="buttonDisabled" :loading="saveLoad" type="info">登录</nut-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import Taro, { useLoad } from "@tarojs/taro";
import { post } from "../../api/request";
import api from "../../api";
import { toast } from "../../utils/index";
import globalData from "../../utils/globalData";
import { goTab, goRouter, setStorageData } from "../../utils";
import "./index.scss";

const saveLoad = ref(false);
const account = ref("");
const password = ref("");
const buttonDisabled = computed(() => {
  if (!account.value || !password.value) return true;
  return false;
});

let pageFrom = "";

useLoad((query) => {
  pageFrom = query.from;
});

function confirm() {
  if (saveLoad.value) return;
  saveLoad.value = true;

  const pars = {
    account: account.value,
    password: password.value,
  };

  post(api.loginByPassword, pars).then((res) => {
    saveLoad.value = false;
    if (res.success) {
      globalData.token = res.result.token;
      globalData.roleList = res.result?.roleList || [];
      globalData.projectList = res.result?.projectList || [];
      globalData.role = globalData.roleList[0] || null;
      const storageObj = {
        role: JSON.stringify(globalData.role),
        token: globalData.token,
        roleList: JSON.stringify(globalData.roleList),
        projectList: JSON.stringify(globalData.projectList)
      };

      setStorageData(storageObj);
      if (pageFrom.includes("pages/my") || pageFrom.includes("pages/index")) {
        goTab({ url: pageFrom });
      } else {
        goRouter({ url: pageFrom });
      }
    } else {
      toast(res.message);
    }
  });
}
</script>
