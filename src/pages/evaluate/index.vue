<template>
  <view class="evaluate">
    <view class="outer">
      <view class="flex-m row">
        <view class="label">服务满意度：</view>
        <nut-rate v-model="level" />
      </view>
      <view class="title">评价内容</view>
      <textarea
        v-model="content"
        class="textarea"
        cols="30"
        rows="10"
      ></textarea>
    </view>
    <nut-button
      :loading="saveLoad"
      @click="submit"
      class="confirm-btn"
      type="info"
      >提交</nut-button
    >
  </view>
</template>

<script setup>
import { ref } from "vue";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { get, post } from "../../api/request";
import api from "../../api";
import { toast } from "../../utils";
import "./index.scss";

const level = ref(0);
const content = ref("");
const saveLoad = ref(false);
let orderId = "";

useLoad((option) => {
  orderId = option.id;
});

function submit() {
  if (saveLoad.value) return;
  saveLoad.value = true;
  const par = {
    content: content.value,
    level: level.value,
    orderId: orderId,
  };

  post(api.ownerEvaluationOrder, par).then((res) => {
    saveLoad.value = false;
    if (res.success) {
      toast("评价成功");
      setTimeout(() => {
        Taro.navigateBack({ delta: 1 });
      }, 1500);
    } else {
      toast(res.message);
    }
  });
}
</script>
