<template>
  <view class="item-detail" v-if="itemData">
    <view class="title tc">{{itemData.projectName}}</view>
    <view class="content">{{itemData.projectDescribe}}</view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import { get } from "../../api/request";
import api from "../../api";
import {toast, loading} from '../../utils'

const itemData = ref(null);

useLoad((option) => {
  getDetail(option.id);
});

function getDetail(id) {
  loading();
  get(api.itemDetail, { id }).then((res) => {
    Taro.hideLoading();
    if (res.success) {
      itemData.value = res.result;
    } else {
      toast(res.message);
    }
  });
}
</script>
