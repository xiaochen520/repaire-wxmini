<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup>
import Taro, { useTabItemTap, useLoad } from '@tarojs/taro'
import { ref } from 'vue'
import './index.scss'

const msg = ref('Hello world')

useLoad(() => {
  console.log(1111111)
});

useTabItemTap(item => {
  console.log(22222222)
});
</script>
