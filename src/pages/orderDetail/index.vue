<template>
  <view class="order-detail">
    <view class="head">
      <image class="head-icon" src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></image>
      <view class="status-text">待接单</view>
    </view>

    <view class="info">
      <view class="flex-m i-row">
        <view class="i-text flex-1">工单编号</view>
        <view class="i-desc">adf125625862</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">维保位置</view>
        <view class="i-desc">负一楼电力</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">工单提报时间</view>
        <view class="i-desc">负一楼电力</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">期望维保时间</view>
        <view class="i-desc">负一楼电力</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">联系人</view>
        <view class="i-desc">负一楼电力</view>
      </view>
      <view class="flex-m i-row">
        <view class="i-text flex-1">联系电话</view>
        <view class="i-desc">负一楼电力</view>
      </view>
    </view>

    <view class="divider">
      <AtDivider content='内容'></AtDivider>
    </view>
    

    <view class="detail">
      <view class="">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
      <view>
        <image></image>
      </view>
    </view>

    <view class="progress">

    </view>


    <view class="foot">
      <AtButton type='primary'>按钮文案</AtButton>
      <AtButton type='primary'>按钮文案</AtButton>
    </view>
  </view>
</template>

<script setup>
import { AtDivider } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/divider.scss"
import { ref } from 'vue'
import './index.scss'

</script>
