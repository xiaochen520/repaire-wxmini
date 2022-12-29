<template>
  <view class="edit-user">
    <view v-if="editKey === 'nickName'">
      <input
        class="input"
        v-model="nickName"
        type="text"
        placeholder="请输入用户名"
      />
    </view>

    <view v-if="editKey === 'phone'">
      <input
        class="input"
        v-model="phone"
        type="number"
        placeholder="请输入手机号"
      />
    </view>

    <AtButton
      :disabled="buttonDisabled"
      :loading="saveLoad"
      @click="confirm"
      class="confirm-btn"
      type="primary"
      >确认</AtButton
    >
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { editUser } from "../../api/userInfo";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import globalData from "../../utils/globalData";
import {toast} from '../../utils/index'

const editKey = ref(""); //nickName:昵称
const saveLoad = ref(false);
const nickName = ref(globalData.userInfo?.nickName || "");
const phone = ref(globalData.userInfo?.phone || "");
const buttonDisabled = computed(() => {
  if (editKey.value === "nickName" && !nickName.value) {
    return true;
  }

  if (editKey.value === "phone" && !phone.value) {
    return true;
  }

  return false;
});

// 声明周期
useLoad((option) => {
  editKey.value = option.key;
});

function confirm() {
  if(buttonDisabled.value) return;
  saveLoad.value = true;
  let params = {};

  if (editKey.value === "nickName") {
    params = {
      headPortrait: globalData.userInfo?.headPortrait || '',
      nickName: nickName.value,
      phone: globalData.userInfo?.phone || '',
    };
  } else {
    params = {
      headPortrait: globalData.userInfo?.headPortrait || '',
      nickName: globalData.userInfo?.nickName || '',
      phone: phone.value,
    };
  }
  editUser(params).then(res => {
    saveLoad.value = false;
    if(res.success) {
      toast('保存成功');
      if(editKey.value === "nickName") {
        globalData.userInfo.nickName = nickName.value;
      } else {
        globalData.userInfo.phone = phone.value;
      }

      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1500);
      
    } else {
      toast(res.message);
    }
  })
}
</script>
