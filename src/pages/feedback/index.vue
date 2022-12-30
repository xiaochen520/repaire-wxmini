<template>
  <view class="feedback">
    <textarea placeholder="请填写您的宝贵意见" :maxlength="200" class="textarea"></textarea>
    <view class="upload-title flex-b">
      <view class="w">上传照片</view>
      <view>最多上传9张照片</view>
    </view>
    <view class="img-list">
      <view @tap="chooseImgs" class="img-item camera flex-m flex-c">
        <view className='at-icon at-icon-camera'></view>
      </view>
    </view>

    <AtButton class="confirm-btn" type='primary'>提交</AtButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro, {useLoad} from "@tarojs/taro"
import {toast} from '../../utils/index'
import './index.scss'

const imgList = ref([]);
const maxImgAmount = 9;

// 选择图片
function chooseImgs() {
  Taro.chooseImage().then(res => {
    console.log(111, res);
    if(res.errMsg === "chooseImage:ok") {
      if(imgList.length + res.tempFilePaths.length > maxImgAmount) {
        toast(`只能上传${maxImgAmount}张图片`);
      } else {
        uploadImg(res.tempFilePaths);
      }
    } else {
      toast(res.errMsg);
    }
  }).catch(err => {
    toast('选择图片失败');
  });
}

// 上传图片
function uploadImg(imgs, index=0) {
  
}

</script>
