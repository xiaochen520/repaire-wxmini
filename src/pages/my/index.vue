<template>
  <view class="my">
    <view>
      <image src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
      <view>大芒果</view>
      <view class="at-icon at-icon-chevron-right"></view>
    </view>

    <view>
      <view>
        <view></view>
        <view></view>
      </view>
      <view>
        <view></view>
        <view></view>
      </view>
    </view>

    <view>
      <view></view>
      <view>
        <view>
          <Image></Image>
          <view></view>
        </view>
        <view>
          <Image></Image>
          <view></view>
        </view>
        <view>
          <Image></Image>
          <view></view>
        </view>
        <view>
          <Image></Image>
          <view></view>
        </view>
      </view>
    </view>

    <AtButton loading type='primary'>按钮文案</AtButton>
  </view>
</template>

<script setup>
import Taro, { useTabItemTap, useLoad } from '@tarojs/taro'
import { ref } from 'vue'
import './index.scss'



useLoad(() => {
  console.log(1111111)
  Taro.getStorageSync('isLogin');
});

useTabItemTap(item => {
  console.log(22222222)
});
</script>
