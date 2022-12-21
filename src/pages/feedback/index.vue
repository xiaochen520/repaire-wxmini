<template>
  <view class="feedback">
    <Textarea></Textarea>
    <view>
      <view></view>
      <view></view>
    </view>
    <view></view>

    <AtButton loading type='primary'>按钮文案</AtButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'
const msg = ref('Hello world')
</script>
