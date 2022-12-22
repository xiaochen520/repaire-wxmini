<template>
  <view class="evaluate">
    <at-rate :value="10" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
import { AtRate } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/rate.scss"
</script>
