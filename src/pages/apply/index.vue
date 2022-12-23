<template>
  <view class="apply">

    <view>
      <view>所属项目</view>
      <input type="text" />
    </view>
    <view>
      <view>项目经理</view>
      <input type="text" />
    </view>
    <view>
      <view>问题描述</view>
      <textarea type="text" />
    </view>

    <view>
      <view>
        <view>上传照片</view>
        <view>做多上传5张照片</view>
      </view>

      <view>
        <view>
          <view></view>
        </view>
      </view>
    </view>
      
    <view>
      <view>维保地址</view>
      <view></view>
      <input type="text" />
    </view>

    <view>
      <view>上门时间</view>
      <view></view>
    </view>
    <view>
      <view>联系人</view>
      <input type="text" />
    </view>
    <view>
      <view>电话</view>
      <input type="text" />
    </view>

    <AtButton type='primary'>发布工单</AtButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.scss'

const value1 = ref(0);

</script>
