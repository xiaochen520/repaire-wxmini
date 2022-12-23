<template>
  <view class="feedback">
    <textarea class="textarea"></textarea>
    <view class="upload-title flex-b">
      <view class="w">上传照片</view>
      <view>最多上传9张照片</view>
    </view>
    <view></view>

    <AtButton class="confirm-btn" type='primary'>按钮文案</AtButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
const msg = ref('Hello world')
</script>
