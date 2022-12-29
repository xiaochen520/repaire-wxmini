<template>
  <view class="new-detail" v-if="newData">
    <view class="title tc">{{newData.title}}</view>
    <view class="content" v-html="newData.content"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import { get } from "../../api/request";
import api from "../../api";
import {toast, loading} from '../../utils'

const newData = ref(null);

useLoad((option) => {
  getDetail(option.id);
});

function getDetail(id) {
  loading();
  get(api.newDetail, { id }).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      newData.value = res.result;
    } else {
      toast(res.message);
    }
  });
}
</script>
