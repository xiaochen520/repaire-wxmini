<template>
  <view class="edit-psd">
    <view class="flex-m row">
      <view class="label">旧密码：</view>
      <input :password="true" v-model="psd" class="flex-1 input" type="text" />
    </view>
    <view class="flex-m row">
      <view class="label">新密码：</view>
      <input :password="true" v-model="newPsd" class="flex-1 input" />
    </view>
    <view class="flex-m row">
      <view class="label">确认密码：</view>
      <input :password="true" v-model="oncePsd" class="flex-1 input" />
    </view>

    <view class="confirm-btn">
      <AtButton
        :disabled="buttonDisabled"
        :loading="saveLoad"
        @click="confirm"
        type="primary"
        >确认</AtButton
      >
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import "./index.scss";
import { post } from "../../api/request";
import api from '../../api'
import Taro from "@tarojs/taro";
import {toast} from '../../utils'

const saveLoad = ref(false);
const psd = ref("");
const newPsd = ref("");
const oncePsd = ref("");
const buttonDisabled = computed(() => {
  if (!psd.value || !newPsd.value || !oncePsd.value) return true;
  if (newPsd.value !== oncePsd.value) return true;
  return false;
});

function confirm() {
  if (saveLoad.value) return;
  saveLoad.value = true;
  const pars = {
    newPassword: newPsd.value,
    oldPassword: psd.value
  };
  post(api.editPassword, pars).then(res => {
    saveLoad.value = false;
    if(res.success) {
      toast('修改成功');
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500);
    } else {
      toast(res.message);
    }
  });
}
</script>
