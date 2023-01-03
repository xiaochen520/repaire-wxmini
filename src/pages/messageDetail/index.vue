<template>
  <view class="msg-detail" v-if="msgData">
    <view class="title tc">{{msgData.title}}</view>
    <view class="content">{{msgData.conetent}}</view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import { get } from "../../api/request";
import api from "../../api";
import {toast, loading} from '../../utils'

const msgData = ref(null);

useLoad((option) => {
  getDetail(option.id);
});

function getDetail(id) {
  loading();
  get(api.msgDetail, { id }).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      msgData.value = res.result;
    } else {
      toast(res.message);
    }
  });
}
</script>
