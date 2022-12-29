<template>
  <view class="login">
    <view class="flex-m row">
      <view class="label">账号：</view>
      <input v-model="account" class="flex-1 input" type="text">
    </view>
    <view class="flex-m row">
      <view class="label">密码：</view>
      <input type="safe-password" v-model="password" class="flex-1 input">
    </view>

    <view class="confirm-btn">
      <AtButton
      :disabled="buttonDisabled"
      :loading="saveLoad"
      @click="confirm"
      type="primary"
      >登录</AtButton>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import {post} from '../../api/request'
import api from '../../api'
import {toast} from '../../utils/index'
import './index.scss'

const saveLoad = ref(false);
const account = ref('');
const password = ref('');
const buttonDisabled = computed(() => {
  if(!account.value || !password.value) return true;
  return false;
});


function confirm() {
  if(saveLoad.value) return;
  saveLoad.value = true;

  const pars = {
    account: account.value,
    password: password.value
  }

  post(api.loginByPassword, pars).then(res => {
    if(res.success) {

    } else {
      toast(res.message);
    }
  });
}
</script>
